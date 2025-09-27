---
layout: /src/layouts/Article.astro
title: "(Don't) be smart and use web standards"
date: "2024-05-24T12:00:00Z"
description: "Using web standards can help you make decisions; Smarter people than myself have thought of various ways to use the world wide web, including edge cases and other considerations; here exists a proposal for anything you can think of; The web wasn't built for the browser; You use web standards."
---

As this is quite a lengthy article, let's begin with a quick summary:

- Using web standards can help you make decisions;
- Smarter people than myself have thought of various ways to use the world wide web, including edge cases and other considerations;
- There exists a proposal for anything you can think of;
- The web wasn't built for the browser;
- You use web standards.

Are you a front-end developer who wants to know more about the internet or the world wide web?
Are you a full-stack developer (in whatever capacity, or meaning of this term) and do you want to know more about web standards?
Are you an architect or back-end developer and require aid designing a (web-based) API (application programming interface)?

If you said yes to at least one of those questions, or if this subject has sparked your interest, keep on reading!

1. [What is the world wide web?](#what-is-the-world-wide-web)
   1. [HTTP](#http)
   1. [Hypertext, hyperlinks, hypermedia](#hypertext-hyperlinks-hypermedia)
   1. [HTML](#html)
   1. [...what about other media?](#what-about-other-media)
   1. [Mediatype](#mediatype)
   1. [Registering a media type?](#registering-a-media-type)
1. [Request for Comments (RFC)](#request-for-comments-rfc)
   1. [RFC for everything](#rfc-for-everything)
   1. [RFC for _anything_](#rfc-for-anything)
      1. [RFC 1121](#rfc-1121)
      1. [RFC 1925](#rfc-1925)
      1. [RFC 2119](#rfc-2119)
1. [What gives? How does this help me?](#what-gives-how-does-this-help-me)
   1. [HTTP: the why?](#http-the-why)
   1. [Inventing the wheel](#inventing-the-wheel)
   1. [How do I prevent re-inventing the wheel?](#how-do-i-prevent-re-inventing-the-wheel)
1. [Webstandards for web developers](#webstandards-for-web-developers)
1. [Join the development of our www](#join-the-development-of-our-www)
1. [Final words](#final-words)

## What is the World Wide Web?

To be able to talk about web standards, it's good to first define what the web is and consists of, including some elaborations.

### HTTP

HTTP is short for **H**yper**t**ext **T**ransfer **P**rotocol.

A protocol is generally a collection of rules to achieve some goal.
In this case we're dealing with a communication and transfer protocol, and it describes the syntax, semantics, error handling and correction, as well as synchronization to accomplish the following:

> "...where **hypertext** documents include **hyperlinks** to other
> _resources_ that the **user** can easily access."
>
> [_Wikipedia_][wiki-http]

[wiki-http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol

### Hypertext, hyperlinks, hypermedia

"Hyper-" from the Greek prefix "ὑπερ-", which means **over** or **beyond**, as in **exceeding**.

- **Hypertext** is digitally displayable text, with references (yes, the hyperlinks) to other (hyper)text, which can be accessed directly by a user.
- **Hyperlink** is a link (a reference) that grants a user access to the data at the other end of that link (referred data).
- **Hypermedia** is an extension of the hypertext term and describes non-lineair (digital) media both including plain text and hyperlinks, as well as images, audio, and video.

An example of **hypermedia** is the World Wide Web!

### HTML

[HTML][spec-html] is short for **H**yper**T**ext **M**arkup **L**anguage.

It follows that _hypertext_ doesn't equal _HTML_.
Instead, this language is a way to _mark up_ hypertext in such a way that the data (the text, and when we talk about hypermedia also the other types of content) can be displayed or referenced (using _hyperlinks_).

[The HTML standard][spec-html] is meant to describe how to annotate documents so a browser may display it.
It's a way to make hypertext interactive.
Thus, the web browser is a tool to follow hyperlinks, which we know as _browsing the web_.

HTTP aids transferring HTML documents, as it's the Hypertext **Transfer Protocol** for documents written in Hypertext Markup Language.

[spec-html]: https://html.spec.whatwg.org/

### ...what about other media?

When you're browsing the web, you'll often run into content that's not just text or text-based &mdash; plain or styled &mdash; but rather things such as images, audio, video, and other non-textual content.

The smart humans that brought HTTP to life (and continued developing it) also came up with a smart way to allow HTTP to send more than _just_ hypertext and hypertext-based documents.
The way they accomplished this is by using metadata which is sent along with the content requested.

In order to support other (types of) media, HTTP commonly uses a _Media type (MIME TYPE)_.

### Mediatype

> The data format of a representation is known as a media type [...]

On the web we technically talk about _representations_ of _resources_.
The format of such a representation (meaning the syntax, the rules, the usage, the constraints, etc.) are commonly known as a _media type_.

Some well known examples of media types are:

- `text/html`
- `image/png`
- `application/json`

There are rules about the syntax and usage of these media types.
Together we came up with and agreed on how specific binary data can be interpreted (read) or arranged (written).
A PNG image is a PNG image if we _interpret_ the binary data as a PNG.
How that would and should work for PNGs is written down and accepted as a standard, after which it was (publicly) registered.

### Registering a media type?

Here are another three examples of media types:

- `application/vnd.ms-powerpoint`
- `application/graphql`
- `application/vnd.xpbytes.errors.v1+json`

The first one describes Microsoft Powerpoint files.
The second one used to be the (defacto) standard way to desrcibe GraphQL queries and responses.
The last one is one out of many _vendor_ (`vnd`) specific media types that we use at work to describe error messages.

There exists a document (and standard) that defines and explains how to register a media type: [RFC 6838: Media Type Specifications and Registration Procedures][spec-mime-6838]

> "This document defines procedures for the specification and registration
> of media types for use in HTTP, MIME, and other Internet protocols."

The goal of registering a media type is to make it accessible for other to use on the interwebs, and so that we may agree on how data can be interpreted or arranged.
Whilst it's not strictly mandatory to register media types starting with `vnd.`, it will aid in the process of writing, sanitizing, iterating, and improving a media type specification.

For media types outside of the `vnd.` (vendor) and `prs.` (personal) trees — in other words: media types that don't start with that prefix — registration is mandatory.
It's not a media type until it's officially been registered.

## **R**equest **f**or **C**omments (RFC)

That [last document linked][spec-mime-6838] to register a media type is called an RFC: a _request for comments_.
It is a publication of a technical document that has the goal of describing a _new standard_ or altering an _existing standard_ (which proliferates into a new standard because of the changes).

![XKCD 927: Standards. Comic with three panels. Heading above the panels: "How standards proliferate (see: A/C chargers, character encodings, instant messaging, etc.)". First panel: "Situation: there are 14 competing standards". Second panel: In speech bubbles: "14?! Ridiculous! We need to develop one universal standard that covers everyone's use cases.". The response: "Yeah!". Third panel: "Soon: Situation. There are 15 competing standards."](https://imgs.xkcd.com/comics/standards.png)

It's commonly the **I**nternet **E**ngineering **T**ask **F**orce (IETF) that publishes such documents.
It's this _task force_ that will ultimately decide if a distributed proposal after receiving commentary will be published as **internet (web) standard**.

And my oh my... there literally exists an RFC for almost every single thing you can think of.

### RFC for everything

As mentioned, media types are standards, and these exist as published RFCs.
Example are:

- [**image/png** registration][media-image/png]: specification [RFC 2083][spec-mime-2083];
- [**text/html** registration][media-text/html]: specification [RFC 2854][spec-mime-2854] (previously [RFC 1866][spec-mime-1866]);
- [**application/json** registration][media-application/json]: specification [RFC 8259][spec-mime-8259] (previously [RFC 4627][spec-mime-4627])

Incredibly helpful, because if you want to know if something is possible or allowed, how to accomplish it, and what the rules are, you can inspect these documents and almost always retrieve the answer.

With "for everything" I did really mean **everything**.

How plain text is defined and how to work with it can be found in [RFC 822][spec-mime-822], which was written _before the internet existed_ but rather was called [ARPANET][wiki-arpanet].
How to transfer text using the internet (utilizing HTTP) is defined in [RFC 1521][spec-mime-1521], but HTTP itself is also published in various RFCs, including:

- [RFC 1945: Hypertext Transfer Protocol -- HTTP/1.0][spec-http-1945]
- [RFC 9110: HTTP Semantics][spec-http-9110]
- [RFC 9111: HTTP Caching][spec-http-9111]
- [RFC 9112: HTTP/1.1][spec-http-9112]
- [RFC 9113: HTTP/2][spec-http-9113]
- [RFC 9114: HTTP/3][spec-http-9114]

[wiki-arpanet]: https://en.wikipedia.org/wiki/ARPANET
[media-text/html]: https://www.iana.org/assignments/media-types/text/html
[media-image/png]: https://www.iana.org/assignments/media-types/image/png
[media-application/json]: https://www.iana.org/assignments/media-types/application/json
[spec-mime-6838]: https://tools.ietf.org/html/rfc6838
[spec-mime-822]: https://www.rfc-editor.org/rfc/rfc822
[spec-mime-1521]: https://www.rfc-editor.org/rfc/rfc1521#section-7.1
[spec-mime-1866]: https://www.rfc-editor.org/rfc/rfc1866
[spec-mime-2083]: https://www.rfc-editor.org/rfc/rfc2083
[spec-mime-2854]: https://www.rfc-editor.org/rfc/rfc2854
[spec-mime-4627]: https://www.rfc-editor.org/rfc/rfc4627
[spec-mime-8259]: https://www.rfc-editor.org/rfc/rfc8259
[spec-http-1945]: https://datatracker.ietf.org/doc/html/rfc1945
[spec-http-9110]: https://datatracker.ietf.org/doc/html/rfc9110
[spec-http-9111]: https://datatracker.ietf.org/doc/html/rfc9111
[spec-http-9112]: https://datatracker.ietf.org/doc/html/rfc9112
[spec-http-9113]: https://datatracker.ietf.org/doc/html/rfc9113
[spec-http-9114]: https://datatracker.ietf.org/doc/html/rfc9114

### RFC for _anything_

That many technical aspects have been documented and published in RFC (and often have been accepted as Web Standard) may not be unexpected.
However, when I was hinting at the fact that there is an RFC for everything, I really did mean _anything_.
So to continue down this rabbit hole, here are three more examples.

#### [RFC 1121](https://www.rfc-editor.org/rfc/rfc1121)

> This RFC presents a collection of poems that were presented at "Act One", a symposium held partially in celebration of the 20th anniversary of the ARPANET.

#### [RFC 1925](https://www.rfc-editor.org/rfc/rfc1925)

> This memo documents the fundamental truths of networking for the Internet community.
>
> [...]
>
> **The Fundamental Truths**
>
> (1) It Has To Work.
>
> [...]
>
> (3) With sufficient thrust, pigs fly just fine.

#### [RFC 2119][spec-best-practice-2119]

We've even defined _how_ to talk about standards in RFCs.

The one that's referred to the most is [RFC 2119: Key words for use in RFCs to Indicate Requirement Levels][spec-best-practice-2119]:

> The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT",
> "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this
> document are to be interpreted as described in RFC 2119.

There are narrow definitions for the aforementioned keywords, and knowing those definitions will with both writing and reading RFC, and subsequently any Web Standard.

[spec-best-practice-2119]: https://www.rfc-editor.org/rfc/rfc2119

## What gives? How does this help me?

Let's start with the question: **Who was HTTP meant for**.
You've read the word _user_ several times, without a definition of whom or _what_ a user is.
Tell me, what's a user?

The answer to this question can be found in [RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1][spec-http-2616]:

> [...] used as a generic protocol for communication between user agents [...]

It first describes what HTTP can be used for.
Then, not much further, the definition is given as follows:

> **user agent**
> The client which initiates a request.
>
> These are often browsers, editors, spiders (web-traversing robots), or other end user tools.

Therefore, HTTP is not _solely_ meant for people, nor browsers.

[spec-http-2616]: https://www.rfc-editor.org/rfc/rfc2616

### HTTP: the why?

If the protocol is meant for more than browser and end-users (people), there must be a bigger picture.
This standard wants to help us achieve more than merely sending hypertext and other hypermedia over the wire to our collective screens.

It doesn't take long to discover which challenges HTTP is trying to solve, or facilitate.
This article is not the right place to take a deep dive, but understand that there is more than the list that follows.
Smart people have spend ample time finding the difficulties with communicating over the internet, and which problems and challenges need solving.
HTTP is the answer.

⚡ **HTTP is the solution to so-called _hard problems_**

- Caching (many user agents, one server);
- Consistency (data format, errors, and separating data from errors);
- Interoperability (between different implementations);
- (and more).

### Inventing the wheel

It's more or less (or is supposed to be) common knowledge that in general it's _disastrous_ to _role your own encryption_.
On the security stackexchange one can find [many](https://security.stackexchange.com/questions/6740/flaw-in-encryption-through-pseudorandom-number-stream-from-pgp-documentation) [questions](https://security.stackexchange.com/questions/18197/why-shouldnt-we-roll-our-own) about the why's and why nots, and one of the most compelling comments to me is:

> If you are not convinced of "Don't Roll Your Own [Cryptography/Security]", then you probably are not an expert and there are many mistakes you likely will make.
>
> _[dr jimbob](https://security.stackexchange.com/users/2568/dr-jimbob) on [security.stackexchange.com](https://security.stackexchange.com/questions/18197/why-shouldnt-we-roll-our-own)_

#### How does that relate to web standards?

You may have heard the expression "there's a package for that" or "there's a gem for that".
The same could be said about abstract problems: "there's a spec for that".
Even when there is no spec, there's often at least one matching _proposal_ or _draft_.
This also means that it's generally unnecessary to reinvent the wheel.
There's already been a person or group of people who has thought about the problems, and (hopefully) wrote down some smart things about them.

And if you do decide _despite all that_ to try to figure it out on your own, you can still learn from what's already out there, or compile your research using the RFC format so that _others_ may use your standard.

As a developer &mdash; front-end, or back-end, or other-end &mdash; you use (web)standards _every day_!

### How do I prevent re-inventing the wheel?

There's no easy answer to this question because it implies you can easily know or intuit that there's already a standard.
When I am looking for a standard myself, it's usually because of one of two reasons:

1. something feels harder than necessary,
2. something sounds complex.

A few examples that hopefully can light your way:

#### **a. Adding interaction to HTML elements**.

In the past I have made the grave mistake (yes, mistake) to use `onclick=""` attributes or the equivalent code in JavaScript, on elements that are not interactive.
After that past, I learnt about using the web without using a mouse (and became a keyboard user), and found out that to make a "button" clickable for all types of users, a lot of JavaScript is required.
Because there's not only keyboard, and mouse, and taps.
There's also screenreaders, and voice control, and joysticks, and other assistive technologies.
Oof.

```html
<!-- a bit more accessible than onclick="" -->
<div class="button" role="button" aria-pressed="false" tabindex="0">
  My action
</div>

<script>
  // [...]
  myActionElement.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      e.target.setAttribute("aria-pressed", "true");
    }
  });

  // [...] add up handler to remove `aria-pressed`
  // [...] add blur handler to remove `aria-pressed`
  // [...] add disabled support via `aria-disabled`
  // [...] and more
</script>
```

The [HTML standard][spec-html] has quite a few tools in its proverbial shed to make HTML interactive, including [the button element][mdn-html-button].
This element supports all kinds of operation and interaction.
According to the description on MDN (Mozilla Developer Network), the `button` element is an interactive element activated by a user with a mouse, keyboard, touch, voice command, or other assistive technology.

On top of that, the action can be blocked by using the `disabled` attribute, has a default `role` (namely `button`), can receive focus without `tabindex` and doesn't require _custom CSS_ to make it appear as a clickable button.

So before using a `div`, my rule is: ensure knowledge of the available HTML elements and their purpose.

#### b. Being able to serve many users with little server power

I've worked on more than one project with hundred, thousand, or even millions of daily users.
Servers can be expensive, as is bandwidth _in the cloud_, and usage is often inconsistent.

This is a hard challenge.

If you search for solutions to this consistency problem, you'll find a technique called auto-scaling: automatically adding or removing servers or server-capacity to be able to serve more concurreny users when it's necessary, and reducing costs when it's not.
If you then continue your search you'll also find that auto-scaling is _really hard to get right_.
For example: What are the right rules to trigger a scale-up or scale down? Should there be a limit, if yes, how high or low should that be? How will you ensure that booting a server (which is slow) is taken into account, or how will you ensure the trigger to scale-up is no longer active during that process?
Answers to these question vary between "it depends" and "thoughts and prayers".

No, there should be a better (and more importantly more stable and consistent) way to be able to serve more users without it costing you the big bucks.

In our case, one of the application serving millions of users a day had more requests wanting to _read_ content than _write_ content.
In HTTP terms, the most occuring _verb_ was GET.
That by itself yields some possibilities, because even though some pages contain user specific data, most of the content was the same for everyone.
Previously I had used a Content Delivery Network (CDN) to serve media (images, videos, etc) to users, such as Cloudflare.
Amazon Web Services (AWS) has their own variant called CloudFront, and there are many others to be found.
Perhaps this is something I could use...

All CDNs have (some variant) of _caching_: (temporarily) storing information so you don't need to recalculate or retrieve that information for a next request.
Even though they all have their own _implementation_, they (almost) all support (part of) a standard: [**HTTP Caching**][spec-http-9111].
(This is sometimes called _Origin Cache Control_ should you search for it at your CDN).
[MDN has an article][mdn-http-caching] that describes many of the options; here are a few we used to cache the contents on our CDN:

```text
# You are not allowed to cache this page. Also don't cache
# it in the browser. Each request MUST generate and serve a
# new response.

Cache-Control: no-store
```

```text
# Store this in the cache for 1 year. This is used for
# files that include a hash or version identifier that
# changes if the file is changed, resulting in a new url.
#
# immutable prevents browsers from making conditional GET
# requests to check if the response has changed since it
# was cached.
#
# public ensures that the response can be shared between
# users visiting the resource. In other words: if someone
# has already requested this resource, the response given
# to them can be given to other requests for this resource.

Cache-Control: public, max-age=31536000, immutable
```

```text
# Store this in the cache for at least 5 minutes, and after
# 5 minutes mark it as stale. This is used for the majority
# of pages that do get updates, but don't require a fresh
# response every second. It is often more important to show
# slightly outdated content than no content at all.
#
# This policy is actually valid for almost all content,
# including that on the rest of the world wide web.
#
# Use the stale (cached) response for at most 60 seconds
# whilst a background job refreshes the cache. After that
# it is no longer stale (for 5 minutes). In case of an
# error, use that stale (cached) response at most for one
# hour.
#
Cache-Control: private, max-age=300, stale-while-revalidate=60, stale-if-error=3600
```

I also found out that some implementations of HTTP Caching are not _spec-compliant_.
They don't follow the standard.
Cloudflare, for example, does not respect the [Vary header][mdn-vary-header].

Only because I knew there was a standard (HTTP Caching), I could easily figure out what the implementations are of not respecting that header, and that allowed me to make conscious choices.

> Note: Please refrain from blindly adding caching headers.
> Especially using `max-age` on pages that are updated can cause issues if you don't take care of the _references_ on that page still pointing to older urls (such as CSS and JavaScript files).
> These should remain operational during the `max-age` period, after which they can be cleaned up.
> [Jake Archibald wrote about HTTP Caching][jake-http-caching].
> So continue reading, and then profit!

Oh about that performance? Realise that adding `public, max-age=60` can have a tremendous effect on the amount of requests actually served by the server:

| Situation    | Visitors per minute | Requests per minute |
| ------------ | ------------------- | ------------------- |
| No caching   | 1000                | 1000                |
| `max-age=5`  | 1000                | ~12                 |
| `max-age=60` | 1000                | ~1                  |

Even for private content marked as `must-revalidate` (which means the user-agent such as the browser MUST ask the server to _validate_ that what's cached locally matches what's fresh on the server), together with a `max-age=0` (store in the cache as fresh for 0 seconds, then mark it as stale) can help.
Because if the server responds to the revalidation check that it's still fresh (for example using an [ETag comparison][mdn-http-etag]), you still save on bandwidth and time it costs to send and receive the data.

In this case the solution that solved the issue to satisfaction was the HTTP Caching standard.

#### c. Accepting old software whilst the API has changed (significantly)

The problem is as follows:

I worked on a system with a public API available to all kinds of other systems, one of which a mobile SDK (Software Development Kit).
Such SDK becomes part of one or multiple apps which are then distributed, usually via the Google Play and Apple iTunes stores.
This means that when the API (the server code) changes, that change needs to be proliferated to the SDK(s), which in turn then need to be updated in the apps, which finally then need to be published to the stores, and finally updated on the end-user devices.
That takes time (and effort).

In other words: this is a problem, also known as a challenge!uitdaging!

[Roy Fielding][web-roy-fielding], is a very smart person.
They worked on things such as [URI Templates][spec-rfc-6570], and was also [editor of the "Do No Track" working group][w3c-dnt].
In 2013 Roy said [during a talk][talk-dont-version] that the best-practice for versioning an API is to _not_ version the API as a whole.
Yes, so what?...you may be thinking. Roy wrote their dissertation on [Architectural Styles and the Design of Network-based Software Architectures][web-roy-dissertation].
This is what is now commonly known as **REST** (Representational State Transfer) and that is the spine of a great many amount of modern web interfaces.

What I enjoy most about that is that the follow-up to their vision of REST was written and publish as a, yes, [RFC][spec-rfc-9205], which was accepted as "current best practice".

I won't dive into too many details about what we used to solve the challenge here, as that's worth multiple articles, but to summarize:

- Use versioned media types (such as `application/vnd.acme.config.v1+json`);
- Use [content-negotiation][mdn-content-negotiation]: a tactic where a server inspects the [Accept header][mdn-accept-header] of the request and bases the response often setting the [Content-Type header][mdn-content-type-header];
- Add strongly-typed validation (a data format) on _the server side_ and run _responses_ through it before sending it to the client.
  Blow up and raise an error when that response doesn't validate against a known contract (the data format).
  In other words: determine the shape of the response for a given `Content-Type` and enforce it.
  This has the added benefit that clients consuming the API can assume a valid response shape;
- Support a media type for as long as possible.
  It's often cheap to do so, as the only difference is often the shape of the response, not the logic, and you'll almost never need to change the shape generation of older versions because of that.

Solving this interesting challenge was possible using the work of multiple smart people (those contributing to that RFC that was accepted as a _best practice_), which in turn has led to the fact that five years later we are still able to serve requests to apps that are still using "v1 of the API".
This also enabled the mobile app developers to _gradually_ upgrade.
For each request-response pair they could decide if they wanted to support new behaviour by controlling the **Accept** and **Content-Type** headers.

#### d. Disagreements about errors

During this challenge I was the frontender who needed to use an API to built both a mobile app ánd a web application.
I could influence that API because it was being written by the client.
The challenge came in three parts:

1. The API returned a _500 Server Error_ if anything went wrong, even if I made a mistake.
2. The API wasn't consistent in how it returned errors. Sometimes it was a plain text response (with `Content-Type` of `application/json`), sometimes a JSON object with a key `"error"`, and sometimes differently again.
3. The API returned error messages that were either not actionable (did not help to resolve them), or were completely incoherent.

The first point was really annoying.
In general, when I implement front-end code that fetches content from an API, any `5xx` response is seen as a [server related problem][mdn-server-related-error].
That means that for those requests, in general, the request is automatically retried.
The client complained that they had many error-request-responses.

[RFC 9110][spec-rfc-9110] talks about semantics, including the HTTP status codes.
Because the error code 500 isn't really telling and doesn't indicate if this is a temporary or permanent issue, together with the fact that the error message included in the response not being structured or helpful, I opted to _always_ retry requests that results in a 500.
In contrast, for responses with any `4xx` code, I did not retry the requests, as those indicate that I made a mistake.

Luckily the client was very willing to listen to feedback, and upon sharing both the standard and the given descriptions, they felt they had to update their API, and started responding with both `4xx` and `5xx` codes, where appropriate.
This both solved the first point, and helped immensely with the third one, because even if the error message wasn't telling, the status code gave a good idea about the issue category.

For the second point neither of us had a good solution.
In the end I proposed to use someone else their ideas on the matter, namely [RFC 7807: Problem Details for HTTP APIs][spec-rfc-7807].

This RFC introduces a standard format (registered with a media type `application/problem+json`) and that in turn makes _all_ error responses more or less look like this:

```text
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en

{
    "type": "https://example.com/probs/out-of-credit",
    "title": "You do not have enough credit.",
    "detail": "Your current balance is 30, but that costs 50.",
    "instance": "/account/12345/msgs/abc",
    "balance": 30,
    "accounts": ["/account/12345",
                 "/account/67890"]
}
```

In short:

- `type`: _always_ a URI indentifying (categorising) the problem. It's strongly recommended to make this URI browsable and link to documentation about the error.
- `title`: a human-readable summary. It can even be translated using [Content-Negotiation][mdn-content-negotiation] (by indicating which language(s) you'd like to receive using `Accept-Language`, and the server can provide a different response based on that request header).
- `detail`: a textual explanation of the problem, also made for consumption by humans! So no computer bleep-bloop or SQL statements, or a _verbatim_ error message.
- `instance`: a URI for this specific instance of the problem.

As the `title` and `detail` fields are mandatory, the client is now also forced to write better error messages (which I helped them with).

Finally we were able to upgrade the API gradually, as once the error message was upgraded to the problem format, it had the new `Content-Type`.
I was able to make a list of responses that did not adhere to that new content-type.

In this particular case I used multiple standard to reach my goals.
I did not need to argue for these solutions because the status quo wasn't working.

#### e. Accessible emails?

Finally I have an example where a client wanted me to add a new user option.
This client indicated that not all members could read their newsletter that was digitally distributed via e-mail

Their request was:

> Please add the ability to pick between HTML email and text email in the user profile.

It was relatively straightforward to expose this option and implement it.
And so I did.

_Two weeks passed and I was contacted and told the feature did not work_.

It did work, but a customer of the client complained who previously indicated having trouble opening the emails on some of their devices switched to the text option and now got text emails on all of their devices.
This particular person used a text-only email client on some of their devices, but other devices were able to display the HTML e-mails.
Additionally the told me that they had seen this issue before, but also showed me e-mails that worked just fine on both types of devices.

I looked for the applicable standard, because if multiple applications get this right, it almost always is a standard.

The solution was found in [RFC 2046: Multipurpose Internet Mail Extensions (MIME) Part Two][spec-rfc-2046].
It describes how e-mails are composed and how e-mail _readers_ should treat them.
It also talks about a special mediatype `multipart` can be used to compose content out of _multiple parts_, especially using `multipart/alternative`.

> "Multipart/alternative" may be used, for example, to send a message in a fancy text format in such a way that it can easily be displayed anywhere.

And that matched the e-mails that did work in both types of devices.

```text
From: sender@example.com
To: recipient@example.com
Subject: Multipart Email Example
Content-Type: multipart/alternative; boundary="boundary-string"

--your-boundary
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Disposition: inline

Platte tekst email hier! Dit wordt gebruikt
als text/html niet werkt.

--boundary-string
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Disposition: inline

<h1>Woopdiedoo html werkt!</h1>
<p>Hier dan de HTML variant</p>

--boundary-string--
```

It was very easy to remove the option from the user profile and instead implement this multipart solution for all their emails.

Unfortunately the only two types supported by most e-mail readers are `text/plain` and `text/html`.
Recently Apple added support for a new variant `text/watch-html`.
It is used on the Apple Watch!

In this case you can see that the easiest solution wasn't the right one.
The standard used here covered more usecases than the simple implementation.

[spec-rfc-2046]: https://www.rfc-editor.org/rfc/rfc2046.html#section-5.1.4
[spec-rfc-6570]: https://www.rfc-editor.org/rfc/rfc6570
[spec-rfc-9205]: https://www.rfc-editor.org/rfc/rfc9205
[spec-rfc-9110]: https://httpwg.org/specs/rfc9110.html#status.500
[spec-rfc-7807]: https://datatracker.ietf.org/doc/html/rfc7807
[mdn-html-button]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[mdn-http-caching]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
[mdn-http-etag]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag
[mdn-vary-header]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
[mdn-content-negotiation]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
[mdn-content-type-header]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
[mdn-accept-header]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
[mdn-server-related-error]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
[jake-http-caching]: https://jakearchibald.com/2016/caching-best-practices/
[web-roy-fielding]: https://roy.gbiv.com/
[w3c-dnt]: https://www.w3.org/TR/tracking-dnt/
[talk-dont-version]: https://www.slideshare.net/evolve_conference/201308-fielding-evolve/31
[web-roy-dissertation]: https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm

## Webstandards for web developers

You've scrolled passed (and hopefully read) about 2300 words and now I can tell you you're already using (web)standards.
I'm not even talking about HTTP or tools using standards such as formatters and linters.

**Do you produce HTML?**
Congratulations. Here is the [HTML specification][spec-html]

**Do you write CSS?**
There are many CSS specifications such as [mediaqueries][spec-css-mq], [selectors][spec-css-selectors], and the [box-model][spec-css-box];

**Interactivity through a language such as JavaScript or TypeScript?**
You are probably complying the [ECMAScript standard][spec-ecma];

**Calling an API from JavaScript?**
There is a standard both for [`fetch`][spec-fetch] and [`xhr` (XMLHttpRequest)][spec-xhr];

**Uploading files through a standard form?**
You're using [`multipart/form-data`][spec-http-7578].

**Sending e-mails?**
Hello [**S**imple **M**ail **T**ransfer **P**rotocol][spec-mail-smtp].
Reading emails often uses either the older [**P**ost **O**ffice **P**rotocol][spec-mail-pop] or the [**I**nternet **M**essage **A**ccess **P**rotocol][spec-mail-imap].
The content and headers are specified in [RFC 2822: Internet Message Format][spec-mail-2822], DomainKeys Identified Mail (DKIM) is [RFC 6375][spec-mail-6375], and sending e-mails in multiple formats such as HTML and plain text is made possible because of [`multipart/alternative`][spec-http-multipart/alternative].

**Dealing with 3D graphics?**
The standard you're using is probably written by and maintained by the [Khronos Group][spec-khronos].

**Testing for accessibility?**
You're most likely following the _Web Content Accessibility Guidelines_, as described in [this specification][spec-wcag] by the W3C (**W**orld **W**ide **W**eb **C**onsortium).

The above is only a small part of the many many standards you're using, you're building on top of, and you're profiting of.
Such as how URLs are composed, and what the rules are around e-mail addresses.

[spec-css]: https://www.w3.org/Style/CSS/specs.en.html
[spec-css-mq]: https://www.w3.org/TR/mediaqueries-3/
[spec-css-selectors]: https://www.w3.org/TR/selectors-3/
[spec-css-box]: https://www.w3.org/TR/css-box-3/
[spec-ecma]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
[spec-fetch]: https://fetch.spec.whatwg.org/
[spec-xhr]: https://xhr.spec.whatwg.org/
[spec-http-7578]: https://www.rfc-editor.org/rfc/rfc7578.html
[spec-mail-pop]: https://tools.ietf.org/html/rfc1939
[spec-mail-smtp]: https://www.rfc-editor.org/rfc/rfc5321.html
[spec-mail-imap]: https://www.rfc-editor.org/rfc/rfc3501.html
[spec-mail-2822]: https://www.rfc-editor.org/rfc/rfc2822
[spec-mail-6375]: https://www.rfc-editor.org/rfc/rfc6376
[spec-http-multipart/alternative]: https://www.rfc-editor.org/rfc/rfc2046.html#section-5.1.4
[spec-wcag]: https://www.w3.org/TR/WCAG21/
[spec-khronos]: https://www.khronos.org/developers

## Join the development of our www

Was this extremely interesting to you and do you have ideas about developing the web?
Have you run into an issue that a current standard doesn't solve?
There are many ways to participate.

1. Many of the organisations now partaking in writing standard can be found on sites such as GitHub.com.
   Examples are the [WC3](https://github.com/w3c), [WICG](https://github.com/WICG), [WhatWG](https://github.com/whatwg) and [TC39](https://github.com/tc39).
   All of these have other contributor guidelines and rules to partake, often described in their README and/or Code of Conduct.
   This is one of the easiest ways to explore the current developments and discussions.
2. The WC3 has [their own website](https://www.w3.org/).
   You can find all kinds of working groups and other collaborations here.
   Becoming a member of such a group or community is often really easy and without barrier, and once you are a member, you are invited to many if not all of their discussions.
3. I have not yet mentioned the **W**eb **I**ncubator **C**ommunity **G**roup (WICG).
   This group works on proposals introducing new _features_!
   Many of those features can be found on [their website](https://wicg.io/), as well as a link to their Discourse.
4. Then there is the **W**eb **H**ypertext **A**pplication **T**echnology **W**orking **G**roup (WHATWG).
   This group maintains and develops the HTML standard!
   How to contribute is explained on [their website](https://whatwg.org/).
5. For JavaScript (and related languages) we have [the TC39 standard](https://tc39.github.io/ecma262/).
   Whilst the contributions are collected via [their GitHub](https://github.com/tc39/ecma262), as listed on their website, that website also contains a lot of additional information.

Is becoming part of such a group the only way?

**NO!**.
As an individual you are able to respond to issues, submit new proposals, as well as partake in events hosted by the IETF.
There is a [Datatracker](https://datatracker.ietf.org/) collecting and keeping track of _all_ those proposals (accepted, drafts, expired, etc.) and also exposes which questions are open.
You can also find the next opportunity to ask questions synchronously, for example during an online event.
I have joined and done so a few times now.

If you know people who contribute to these standards, they may tell you that it's not always without _challenges_.
Development takes long and to reach consensus isn't always possible.
It's sluggish machinery.
On the other hand it makes it possible to enjoy all the things we enjoy digitally and online.

## Final words

Using (web)standards made is possible for us &mdash; 5 developers total &mdash; to deploy an application being able to handle 15 million requests per _evening_, process and send 2.2 TB of data per day, with an _average_ and _median_ time of 35 ms of processing time using a single (pretty powerful) server.

Using all these (web)standards we were able to tell another client: "You have clients using screenreaders? That's not an issue.
We won't charge you extra for supporting that." after which we found out that we didn't need to build any support for it as we had already used the right constructs.

By using (web)standards the endless discussions can be averted because we (almost) always have something to fall back to and refer to, and find out if we made a programming error in our code, or if there has been made an error _implementing a specification_ for example in a browser.

You use (web)standards, and that's smart, so keep on going.
