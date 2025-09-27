1.  headlines
2.  introduction
3.  what is Exercism
4.  - languages
5.  - web editor / tests
6.  syllabus
7.  feedback: analyzer
8.  feedback: representers
9.  feedback: mentorship
10. community / 12 in 23

## Headlines (0:00 - 1:00)

1. It is generally accepted that exercise is good, and daily exercise is recommended by almost each and every reputable health organisation.
2. Given enough sleep, we also know that repeated exercise, practice, and training makes perfect.
3. Once attained, knowing a foreign language often lasts a lifetime, despite it feeling foreign again after not exercising that for a while.
4. It has been shown that exposure to multiple languages makes it easier to learn one.
5. And why is it difficult for Developers to Learn Another Programming Language? Interference by lack of practice in the languages they already know and the language they're trying to learn.

## Volunteer for Exercism (1:00 - 1:30)

Hi, I am Derk-Jan, also known as DJ. I am SleeplessByte on most social platforms. You may have seen me complain about accessibility, or praise standards. Perhaps you've heard me on speak on topics such as unobtrusive JavaScript components, or lessons learnt in production. Today's lightning talk is about platform that can help you achieve fluency in a programming language you already know, or help you start learning a new one.

## What is exercism (1:30 - 2:30)

Exercism is a completely free platform to achieve fluency in a programming language, by combining learning, practice, and mentoring. It's fun, and effective. Did I mention free? That's free as in beer.

Exercism has existed for many years. It was created in 2013 by Katrina Owens as a tool for her students. It's possible that have used Exercism in the past, mentored, or contributed in an other way. If you are familiar with version 1 or version 2, I recommend this excellent video by Angelika who is one of the key maintainers. She talks about what's new in the latest version, which launched on 1 September 2021.

## Languages (2:30 - 3:30)

There are currently 67 languages supported - you may recognize some of the icons. We're still adding new ones as long as we can find people who can donate their time to help build the track and tooling.

I am a core maintainer of both the JavaScript and TypeScript tracks, and help out on others. The TypeScript track is getting a revision later this year, as it needs some love.

At work (so basically regular life) I use Ruby, JavaScript, TypeScript, Bash, Common Lisp, and occasionally PL/SQL, Kotlin, Swift, and PHP.

The Turing complete languages you work with are likely also in this list.

Out of these 67 languages, only Delphi and PL/SQL require you to install something on your machine to get started. That is because every other language has a web editor that you can use. A tool is available to download the exercise and your solution to your own machine, and to submit it.

## Web editor (3:30 - 4:05)

Barring those two languages, the web editor for each language features a code panel, an introduction to the exercise, instructions - sometimes divided into various individual tasks, hints, and a way to debug the code.

Many languages also support syntax highlighting online.

## Test runner (4:05 - 4:35)

Once you are happy with your solution, you can run the tests for that specific exercise. Again, you don't need to install anything to use this feature.

If the tests run to completion, it will show you which ones have passed, what code was ran, and if there was a boo-boo, why the test failed.

Tracks that support debugging from the web editor will also show the output of those debugging calls here.

## Syllabus (4:35 - 5:10)

New in version 3 of Exercism is the track syllabus: 14 tracks currently have one. A syllabus is a collection of concepts of that programming language and exercises specifically designed to help you understand the concept.

The 14 tracks with a syllabus are:

1. clojure
2. common_lisp
3. csharp
4. elixir
5. elm
6. fsharp
7. go
8. java
9. javascript
10. jq
11. python
12. ruby
13. rust
14. swift

## Syllabus (5:10 - 5:45)

Each syllabus is designed for the language it belongs to. Elixir has a whopping 57 concepts, and that looks like this. It helps you learn a language following a specific path, with avenues to practice learnt concepts. Tracks with a syllabus are still adding new exercises for existing concepts, and as languages evolve, new concepts are supported as well.

## Analyzer (5:45 - 6:30)

Let's talk feedback!

Here is part of a solution to an early exercise from the syllabus in JavaScript:

```javascript
const PREPARATION_MINUTES_PER_LAYER = 2;

/**
 * Given a number of layers, determines the total preparation time.
 *
 * @param {number} numberOfLayers
 * @returns {number} the total preparation time
 */
export function preparationTimeInMinutes(numberOfLayers) {
  return numberOfLayers * 2;
}
```

In this example, it used my constant `PREPARATION_MINUTES_PER_LAYER`, but if had written `CRYING_BEFORE_DINING = 2`, the comment would have reflected that.

## Representers (6:30 - 7:30)

Analyzers are, as you may imagine, a lot of work to write, and complex in various situations. With hundreds of thousands of students and millions of submissions, we did find out that there is a lot of duplication.

We can probably agree that at least in JavaScript, the two solutions shown are effectively the same. Sure. Some people will use whitespace differently, write more or less comments, or pick different names for variables, functions, classes, and arguments. However, once normalized, a lot of solutions to the same problem are exactly... well the same!

_next slide_

Therefore, mentors can now write commentary on a earlier solution, and if that solution is submitted again, that commentary is given to the students. This means that for a lot of common mistakes, or exemplary work, you will receive feedback automatically.

For a particular implementation of `Hello, World!` this can be shown thousands of times, but even for more complex exercises this can be hundred of thousands times.

## Mentoring (7:30 - 8:15)

Finally, there is a human route to receiving feedback, which is absolutely free. Tell the mentor in advance what you'd like to get out of the session, and they can see your iterations, and automated feedback. They can then mentor you towards a more idiomatic solution or a particular goal you've listed in you request.

Where in previous versions of Exercism submitting your solution for mentoring was mandatory, with wait times going beyond a month, mentoring is now completely optional. Often your submitted solution will be picked up in mere moments.

You can even have a private session by sharing your mentor url with a friend or colleague. It's like code-review on steroids.

## Community (8:15 - 9:00)

With far more than 100.000 unique contributors, we wanted to have a place where we could chat together, both about Exercism related topics and beyond. New are the forums for asynchronous communication and an official Discord server for more noisy synchronous shouting. There are frequent videos recorded such as interviews with community members, or prominent figures from our industries. On top of that, this entire year you can follow Exercism endorsed streams on Twitch.

## 12 in 23 (9:00 - 9:45)

...And that is because there is a year long event called 12 in 23 where the goal is to explore at least 12 programming languages by completing at least 5 exercises. Each month has a specific theme. Each month starts with a video about the theme of that month and the languages that belong to it.

If you complete five exercises in that particular month in one of the languages that belong to this theme, you even receive a badge, which you can proudly display on your profile. It's the perfect way to incentivize yourself to pick up something new.

## Conclusion (9:45 - 10:00)

Ten minutes isn't enough to dig deeper and I've only scratched the surface. Start exercising tomorrow by signing up and enjoy Exercism.
