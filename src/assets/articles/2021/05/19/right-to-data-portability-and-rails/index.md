---
title: Rails · Right to data portability
date: '2021-05-19T22:34:00Z'
description: 'Providing a data download using rubyzip'
cover: './pexels-nubia-navarro-(nubikini)-385998.jpg'
---

If you're a EU citizen, or if you conduct business in the EU, you've probably heard of the General Data Protection Regulation (GDPR).
Through [delftsolutions.nl](https://delftsolutions.nl), we get a lot of GDPR consultancy related questions.
You can find many posts on the interwebs about GDPR in general and how to implement it, but I'd like to give you (some) of my solutions.


![Minuture minibus with travel cases on top](./pexels-nubia-navarro-(nubikini)-385998.jpg)
## The right to data portability

I have interpreted the right to data portability to mean that if you collect personal data (which means you _store_ it for longer than the user needs it when using your service, which includes having a user account - technically they don't need the user account when they're not using your service), you **must** provide this data in a portable format.
Under GDPR this means the data they (the users) submit, the data you derive, and/or processed results.

> In [Art 4. GDPR: Definitions](https://gdpr-info.eu/art-4-gdpr/) you can find the definition of 'personal data' and 'data subject', among others.
>
> In [Art. 20 GDPR: Right to data portability](https://gdpr-info.eu/art-20-gdpr/), and the suitable [recital 68](https://gdpr-info.eu/recitals/no-68/) you can find more about the right to data portability.

Today I'd like to give you _a_ solution for [Rails](https://rubyonrails.org/) using [the `rubyzip` gem](https://github.com/rubyzip/rubyzip), but these techniques are applicable to most frameworks and most languages.

## Collecting the data

Most services I build or maintain that collect data are subject to GDPR.
In these cases, GDPR requests are usually done manually, which can be time-consuming and frustrating work.
The first thing I add or I recommend adding is one or several queries to retrieve the data collected, given a user.

> Do you need to share *all* data you've collected?
>
> I've interpreted the first paragraph (point 1) of article 20 as no.
> Only that data that falls under [Art. 6(1) GDPR: Lawfullness of processing](https://gdpr-info.eu/art-6-gdpr/) point a: data for which consent was given, point b: necessary for the performance of a contract, or [Art. 9(2) GDPR: Processing of special categories of personal data](https://gdpr-info.eu/art-9-gdpr/) point a: data that falls under _special categories_ for which consent was given.
>
> ...and only that data that was processed by automated means (a computer for example).
>
> However, you're always allowed to share **more**.
> I tend to include as much as possible and only exclude those things that would be bad for security and don't fall under the points listed above.

This may include (in some cases), but not limited to:

- Data **provided by** the user, such as their email address, a profile picture, and/or a display name
- Data **collected about** the user, such as number of failed login attempts, when they last updated their profile, or their stripe customer ID
- Data **attached to** the user, for example blog posts if they are the author, likes if they liked a comment, external accounts linked to theirs
- Data **derived from**, such as segmentation profiles, cohorts, tags, flags, milestones

The great thing about this exercise is that is gives you insight in what you store for a user, but also gives you an easy way to _remove_ all this data if they choose to exercise their [right to erasure](https://gdpr-info.eu/art-17-gdpr/), or if they withdraw consent.

## The format

You must provide all the data subject to the right to data portability **"in a structured, commonly used and machine-readable format"**.

I usually make the following choices:

- binary formats such as images, audio, and video I keep as is, unless it's a weird or not commonly used format
- for everything else JSON or CSV

However, since I usually have more than one "source" of data, I collect everything and create an archive.
You can probably use `.tar.gz`, but I usually opt for `.zip` so that people don't complain when they can't open it.

## Using `rubyzip`

Okay. So you've determined _which_ data you want to port, and now you're ready to create the zip file.

```ruby
require 'zip'

compressed_filestream = Zip::OutputStream.write_buffer do |zos|
  zip_user_data(user, zos)
  zip_content(user, zos)
  zip_derived(user, zos)
  # many more
end
```

There are many ways to create a zip file using the library `rubyzip`, and this is how I do it.
The reason I use the stream with write buffer instead of creating a zip file and appending content is that in some cases, I want to forward this stream as I write.
I also want to be able to manually put entries (files) into the resulting zip.

```ruby
def zip_user_data(user, zos)
  zos.put_next_entry 'user.json'
  zos.puts JSON.pretty_generate(
    user
      .slice(
        :email,
        :stripe_id,
        :created_at,
        :updated_at,
        # ...
      )
    )

  if user.image
    add_file(zos, shrine_filename(user.image), user.image)
  end
end
```

Alright. Let's see what's going on here.

The method `put_next_entry` is not well documented but takes an `entry_name` and optional arguments such as `comment`, metadata (`extra`), `compression_method` and `level`.
It closes any previous entry and opens a new one.

The method `puts` takes data and _puts_ it into the opened entry (which is `user.json`).

Finally conditionally I try to `add_file`. Let's see how that one looks:

```ruby
def add_file(zos, filename, file)
  new_entry = Zip::Entry.new(
    'archive.zip',
    filename
  )

  downloaded_file = file.download

  new_entry.gather_fileinfo_from_srcpath(downloaded_file.path)
  new_entry.dirty = true
  new_entry.write_to_zip_output_stream(zos)

  downloaded_file.close!
rescue StandardError
  # noop
end
```

First I create a new _unattached_ entry with a bogus parent filename (`archive.zip`).
I then use `file.download` to download the file to a tempfile.
Next I use the data from that tempfile to prepare the `new_entry`.
Finally, the unattached entry with the downloaded tempfile is written to the output stream.

> **"Help I use ActiveStorage"**
>
> ActiveStorage has [`ActiveStorage::Blob#download`](https://api.rubyonrails.org/classes/ActiveStorage/Blob.html#method-i-download) and [`#open`](https://api.rubyonrails.org/classes/ActiveStorage/Blob.html#method-i-open) which do similar things.

It's possible to directly stream a download into the zip, but this method has given me much more reliability (and allows me to parallelize the collection/downloading step).

If the download fails, ignore.
In some cases I use `retry` (once) to retry, and in other cases I write an `filename.error.txt` entry instead.

Since I'm using [Shrine](https://shrinerb.com), the method to derive the filename is:

```ruby
def shrine_filename(file)
  file.metadata['filename'].presence || File.basename(file.id)
end
```

Now we have an output stream with:

- `user.json` (with user data)
- `some-image.png`

I continue adding entries to the zip, until I've gotten everything.

## Delivering the archive

In most cases I upload this archive to a _temporary_ storage and then e-mail the user that their export is ready. Here's why:

- They don't need to wait for a potentially long running process to finish
- You can defer this if your servers are at capacity
- No problem with e-mail client limiting or completely blocking attachments
- Temporary means the data will be gone after a certain amount of time, which is GDPR compliant.

```ruby
export = UserExport.new(user: user)

# Long running process
compressed_filestream = Zip::OutputStream.write_buffer do |zos|
  zip_user_data(user, zos)
  zip_content(user, zos)
  zip_derived(user, zos)
  # many more
end

# Rewind so that shrine can upload it
compressed_filestream.rewind

# Upload it
export.update(
  generated_at: Time.now,
  file: compressed_filestream
)

# Add it to the e-mail queue
::User::ExportsMailer
  .with(user: current_user, export: export)
  .export_ready_email
  .deliver_later
```

## Conclusion

Using `rubyzip`, the ruby interface for zip files, you can generate archives with all the data you've collected from your users.
Additional tools such as [Shrine](https://shrinerb.com) can aid you downloading binary files, and uploading the exports.
I recommend you to automate this process so you can focus on other things and direct GDPR related requests to your automated system.

That's all, folks!