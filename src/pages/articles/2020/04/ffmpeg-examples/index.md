---
layout: /src/layouts/Article.astro
title: FFMPEG examples
date: "2020-04-15T22:37:00Z"
description: "Transcoding or probing for the durations with examples and explanations."
cover: "/articles/2020/04/ffmpeg-examples/cover.jpg"
---

For [Sounders Music][web-sounders] I had to write a few new file processors. In their eco-system, audio tracks are uploaded and transcoded to a format that is playable in their front-ends, such as their apps.

[`ffmpeg`][web-ffmpeg] is a free and open-source library which, depending on how it's built, supports (almost) all industry standard encodings. On top of that: it works cross-platform! Their [documentation][web-ffmpeg-documentation] is very extensive and, with a bit of patience and perseverance, you can probably make most of it work. This article holds _some_ of the commands I regularly need when working with media files.

> This is written for FFMPEG 4.2.2+. It will probably work with most versions in the 4.x.x range, but YMMV.

## Transcoding a file

From [WikiPedia][wiki-transcoding]:

> &ldquo;[Transcoding][wiki-transcoding] is the direct digital-to-digital conversion of one [encoding][wiki-encoding] to another, **[[1][wiki-ref1]]** such as for movie data files, audio files (e.g., [MP3][wiki-mp3], [WAV][wiki-wav]), or character encoding (e.g., [UTF-8][wiki-utf8], [ISO/IEC 8859][wiki-iso8859]).&rdquo;

The following command converts _any_ media file to an `.mp4` (with audio encoded using Advanced Audio Coding).

```shell
ffmpeg -y -i input_path -c:a aac -b:a 160k -vn -f mp4 -movflags +faststart output_path
```

1. `-i`: Takes the input at `input_path`;
2. `-y`: Writing at `output_path`, overwriting;
3. `-c:a`: Transcodes all audio streams using the [Advanced Audio Coding (AAC) encoder (`aac`)][web-ffmpeg-aac];
4. `-b:a`: Setting the bitrate of all audio streams to a CBR of `160k` bits per second;
5. `-vn`: Blocking all video streams;
6. `-f`: Forcing the type of the file (instead of guessing it based on the file name);
7. `-movflags +faststart`: And ensuring that the output `mp4` has its metadata moved to the start, so that it can start playing earlier

The Advanced Audio Coding works on all our target devices (such as modern browsers, Android and iOS devices) and the bitrate chosen is generally a good trade-off between size and quality.

I generally have to force the "input type" because the files come in without an extension. However, I do usually determine the type using a mime-type analyzer before calling this function ([Ruby][git-determine-mime-type-ruby], [JavaScript or TypeScript][git-determine-mime-type-js])

Blocking the video streams seems to save some processing time and, if not correctly configured, ensures that the output is really an audio file. It also allows to accept video ánd audio files.

Finally the `movflags` enhance the playback when _streaming_ or _preloading_ the file. Normally, a MOV/MP4 file has all the metadata about all packets stored in one location (written at the end of the file, it can be moved to the start for better playback.

### Example call and output

```text
ffmpeg -y -i ./"-3 Daniel Powter - Bad Day.mp3" -c:a aac -b:a 160k -vn -f mp4 -movflags +faststart ./"Daniel Powter.mp4"

ffmpeg version 4.2.2 Copyright (c) 2000-2019 the FFmpeg developers
  built with gcc 9.2.1 (GCC) 20200122
  configuration: --enable-gpl --enable-version3 --enable-sdl2
   --enable-fontconfig --enable-gnutls --enable-iconv --enable-libass
   --enable-libdav1d --enable-libbluray --enable-libfreetype --enable-libmp3lame
   --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg
   --enable-libopus --enable-libshine --enable-libsnappy --enable-libsoxr
   --enable-libtheora --enable-libtwolame --enable-libvpx --enable-libwavpack
   --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxml2
   --enable-libzimg --enable-lzma --enable-zlib --enable-gmp --enable-libvidstab
   --enable-libvorbis --enable-libvo-amrwbenc --enable-libmysofa
   --enable-libspeex --enable-libxvid --enable-libaom --enable-libmfx
   --enable-amf --enable-ffnvcodec --enable-cuvid --enable-d3d11va
   --enable-nvenc --enable-nvdec --enable-dxva2 --enable-avisynth
   --enable-libopenmpt
  libavutil      56. 31.100 / 56. 31.100
  libavcodec     58. 54.100 / 58. 54.100
  libavformat    58. 29.100 / 58. 29.100
  libavdevice    58.  8.100 / 58.  8.100
  libavfilter     7. 57.100 /  7. 57.100
  libswscale      5.  5.100 /  5.  5.100
  libswresample   3.  5.100 /  3.  5.100
  libpostproc    55.  5.100 / 55.  5.100
Input #0, mp3, from './-3 Daniel Powter - Bad Day.mp3':
  Metadata:
    title           : Bad Day
    comment         : www.mediahuman.com
    Software        : Lavf58.20.100
    artist          : Daniel Powter
  Duration: 00:03:55.18, start: 0.025057, bitrate: 182 kb/s
    Stream #0:0: Audio: mp3, 44100 Hz, stereo, fltp, 182 kb/s
    Metadata:
      encoder         : LAME3.98r
Stream mapping:
  Stream #0:0 -> #0:0 (mp3 (mp3float) -> aac (native))
Press [q] to stop, [?] for help
Output #0, mp4, to './Daniel Powter.mp4':
  Metadata:
    title           : Bad Day
    comment         : www.mediahuman.com
    Software        : Lavf58.20.100
    artist          : Daniel Powter
    encoder         : Lavf58.29.100
    Stream #0:0: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 160 kb/s
    Metadata:
      encoder         : Lavc58.54.100 aac
[mp4 @ 0000021d07bf3940] Starting second pass: moving the moov atom to the beginning of the file
size=    4636kB time=00:03:55.14 bitrate= 161.5kbits/s speed=78.9x
video:0kB audio:4596kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: 0.881678%
[aac @ 0000021d07c18a40] Qavg: 508.682
```

## Proving the duration

In the example above, there is a **Input** section with _Metadata_ and _Duration_. This information can be extracted using [`ffprobe`][web-ffprobe].

```shell
ffprobe input
```

In particular, I am interested in the _duration_ of the file.

```shell
ffprobe input -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1
```

1. `-v`: Sets the log level to error, set that only errors _and_ the "formatted" output is shown;
2. `-show_entries`: When this is present, the output only contains the entries as set in this option. Its value (`section:field`) will result in an output `[SECTION]field=value[/SECTION]`;
3. `-of`: Output format, also as `-print_format`, which is set to use the `default` formatted, but remove the wrapper (`[SECTION]`) and remove the `field=` key portion;

What remains as output is either an error message or the duration, in (partial) seconds.

### Example call and output

```shell
ffprobe "Daniel Powter - Bad Day.mp4" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1
235.152000
```

[git-determine-mime-type-js]: https://github.com/sindresorhus/file-type#file-type-
[git-determine-mime-type-ruby]: https://github.com/shrinerb/shrine/blob/master/doc/plugins/determine_mime_type.md#analyzers
[web-ffprobe]: https://www.ffmpeg.org/ffprobe-all.html
[web-ffmpeg]: https://www.ffmpeg.org/
[web-ffmpeg-aac]: https://www.ffmpeg.org/ffmpeg-all.html#aac
[web-ffmpeg-documentation]: https://www.ffmpeg.org/documentation.html
[web-sounders]: https://soundersmusic.com/
[wiki-encoding]: https://en.wikipedia.org/wiki/Character_encoding
[wiki-iso8859]: https://en.wikipedia.org/wiki/ISO/IEC_8859
[wiki-mp3]: https://en.wikipedia.org/wiki/MP3
[wiki-ref1]: http://searchmicroservices.techtarget.com/definition/transcoding
[wiki-transcoding]: https://en.wikipedia.org/wiki/Transcoding
[wiki-utf8]: https://en.wikipedia.org/wiki/UTF-8
[wiki-wav]: https://en.wikipedia.org/wiki/WAV
