# Embrace the patch

- 00:30 · 1 · History
- 03:30 · 7 · TOC
- 04:00 · 8 · What's the diff?
- 08:00 · 17 · Quick recap
- 09:00 · 19 · Quick detour
- 11:30 · 25 · Emailing patches?
- 13:30 · 26 · Another quick recap
- 14:00 · 27 · Let's get practical
- 14:30 · 36 · JavaScript & TypeScript
- 19:30 · 39 · Patching Ruby Gems
- 21:00 · 41 · Roll your own
- 25:00 · 48 · Responsible Techniques
- 28:15 · 50 · Outro

## Preface (4 minutes 💨)

1. The Colossus Mark 2
2. The Colossus Mark 2 paper drive mechanism
3. Paper encoding (7 channels)
4. Paper patching (24 channels)
5. Paper patch up close
6. A patch changes the original

- A patch is a change to the original
- A patch is a change to the original <em>program</em>

## TOC (25 seconds)

> ~_Reach by 04:00_~
> _Reach by 03:30_

7. TOC

- What is a patch?
- How to make a patch?
- How to apply a patch?
- Practical application
- Patching without patch files

## Diffs & Patches (5 minutes 30 seconds)

> ~_Reach by 04:30_~
> _Reach by 04:00_

8. What's the diff?

- Before
- After
- ⭕
- Shell command
- Result `3c3`

9. Explaining a diff

- Use old after
- Make another change
- Compare to old before
- ⭕
- Shell command
- Result with 2 changes. `0a1,2`
- Different than PR diffs
- Add `-u` for unified diff (`-c` for context, diff with context)
- Result with `+` and `-`

10. `diff` is a unix shell command
11. `git diff` is a git tool
12. They are very similar to use
13. Result with `+` and `-`, extra metadata (`diff --git` and hashes)
14. Turn a diff into a patch file
15. Turn a patch file into an applied change
16. How it works

## Recap 1 (1 minute)

> ~_Reach by 10:00_~
> _Reach by 08:00_

17. Quick recap

- diff: unix tool
- diff: finds differences in 2 files
- git diff: optimized diff for git
- git apply: applies git diff output

18. Definitions

- a diff is a (set of) differences
- a patch is a (set of) diffs with metadata
- no one agrees on these terms

## Detour

> ~_Reach by 11:00_~
> _Reach by 09:00_

19. Apache was developed from patch files
20. Linux Kernel is still developed sharing patch files

## Patch driven development (3 minutes)

21. Patch driven development
22. Git patches email workflow
23. Why kernel development still uses email
24. Uncommon but not rare

- Linux Kernel
- PostgreSQL
- Anything on sourcehut (GitHub for hackers)
- GNU projects (such as Hurd and GUIx)
- Ruby core uses both issue tracker and email

## Emailing patches (2 minutes 30 seconds)

> ~_Reach by 14:00_~
> _Reach by 11:30_

25. Emailing patches?

- git log
- take first and last commit hash
- `git format-patch`
- It generates a patch per commit (with metadata)
- `git send-email`
- `git am`
- Get started on git-send-email.io

## Another recap (30 seconds)

> ~_Reach by 16:30_~
> _Reach by 13:30_

26. Another quick recap

- git format-patch: generates patches (mbox compatible)
- git send-email: emails compatible patches
- git am: commits received mbox patches

_Each project like the Linux Kernel has more rules and formatting restrictions, but using these tools satisfy the majority of them_

---

## Let's get practical (1 minute 30 seconds)

> ~_Reach by 17:00_~
> _Reach by 14:00_

27. Let's get practical
28. When will this be merged?
29. When will this be released?
30. Is this dead?
31. Wontfix
32. Due to inactivity this PR will be closed
33. Problems are Challenges
34. Providing patch files for the adventurous.
35. Providing patch files as workaround.

## JavaScript & TypeScript (5 minutes)

> ~_Reach by 18:30_~
> _Reach by 15:30_

36. Patching JavaScript & TypeScript

- pnpm patch
- yarn patch
- bun patch
- npx patch-package

37. How to patch a package?

- Run `binary patch some-package-name`
- Open editable copy
- Make changes
- Run `binary patch-commit some-path`
- Commit your patch

38. Let's do it!

- Run `binary patch some-package-name`
- Open editable copy
- Make changes
- Run `binary patch-commit some-path`
- Commit your patch
- Note: pnpm patch will store the patch in a patches folder, and so do the others.
- Note: some tools will also edit a configuration file to mark it as something to apply. Always follow the patch steps or read the documentation, even if you received a patch or downloaded it.
- You often need to edit the compiled output (`dist`).
- Some toolchains such as react-native require you to edit the source.

_Some systems such as patch-package automatically check if the patch can still be applied, and warn you that the version the patch is for has changed, others remove the dependency from package.json like pnpm_

## Ruby, Ruby, Ruby

> ~_Reach by 23:30_~
> _Reach by 19:30_

39. Patching Ruby Gems

- gem patch: this system but then for gems, updated 10 years ago
- gem patching: marking blocks of code as patches, updated 15 years ago
- gorilla_patch: not a patch system, but a collection of refinements
- roll our own method
- use system gems

## Debian gems (2 minutes)

40. Patching Debian Gems

- If you use system gems via `apt-get install`
- If you used bundler responsibly
- Then enable `deb-src`
- Get the source for a gem
- Make changes using the quilt tool
- Finally build the code from source including your patch
- Optionally submit it to the bug tracking system

## Patching without patch files (6 minutes)

> ~_Reach by 25:30_~
> _Reach by 21:00_

41. Roll your own
42. Methods

- Monkeypatch 🐒
- Refinement (Monkeypatch 2.0?)
- JIT patch (ie. using Rails hooks)
- Vendoring
- Forking (when using bundler + git)

43. Monkeypatch

_Ruby code is dynamic, and each class you write can be reopened meaning changed. The last definition wins. We can use this to patch in changes_.

- Patrick Ewing in RailsConf 2007 said it best: it's punching a duck
- Reopening `String` class to add a method
- This will permanently change all strings. Maybe there is a better way?

44. Refinements

- Since Dec 2013 in Ruby 2.1.0 we have a new tool
- By changing the `class` keyword to the `refine` keyword, and placing it in a module, we can temporarily activate it using the `using` keyword
- That doesn't leak outside the refined class.
- Lots of caveats, only works on classes, there are historical issues, weird with dynamic programming and dynamic dispatch, and usually not what we want. We often want to port a fix, which should be active always, not in a limited scope. Linked some resources for you.

45. JIT patches

_Rails doesn't load all the code when the application reaches `application.rb`. Your initializers run, and so do the rails engines._

_Because the last definition to a class wins, and we don't always know when code is going to load, you can apply a patch just-in-time_

- by using Rails hooks. There is a huge list of hooks, but most of them are not clear of when they run. Best is to read the Rails source. You'll need this if you are monkeypatching or refining rails code!

46. Vendoring

_Okay, instead of trying to change code after it's loaded, we can opt to not use Rubygems for particular gems_

- `gem unpack`
- Most gems can be downloaded from GitHub or GitLab. Pick the version compatible with your code.
- Extract the files to `/vendor` and use `path:` in the Gemfile
- Now you can make changes. E.g. apply entire PRs as patches.

47. Fork the gem for things that are dead. Security: use refs, especially if you use someone else their fork. Tags can be changed!

## Responsible Techniques (3 minutes 15 seconds)

> ~_Reach by 31:30_~
> _Reach by 25:00_

_This was going to be my talk, but it turns out, someone wrote almost everything I care about when writing a responsible monkeypatch. I will therefore only summarize and leave the reading to you!_

48. Wrap it in a gem ✨ (create gemspec)

- Version requirements
- Nicely encapsulated in a folder
- Communicate clearly (comments, via errors, etc.) when the patch isn't correctly applied
- Read the blog

- or... wrap it in a module
- Use `Refinement.import_methods` to import a module into a refinement, so all your extensions can live in one place
- Use `Module.prepend` on classes you want to permanently edit, your change will always win
- Check for versions if you know a fix is only necessary until a certain version

49. Location Location Location

- If someone else wrote the fix: vendor
- If you wrote the fix: lib
- Tip: create a new file in lib called patches.rb and do all the requiring and activating there.

## Outro (15 seconds)

> ~_Reach by 34:45_~
> _Reach by 28:15_

- In our OSS and Closed source software, we often depend on others.
- When that dependency fails, or when your fixes aren't being merged or backported, don't fret.
- Patches work just fine.

Thanks.
