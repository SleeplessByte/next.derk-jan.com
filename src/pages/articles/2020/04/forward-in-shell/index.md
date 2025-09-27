---
layout: /src/layouts/Article.astro
title: Forward arguments in shell
date: "2020-04-11T10:12:00Z"
description: "Optionally eating arguments, and passing the rest to the next process."
cover: "/src/assets/articles/2020/04/forward-in-shell/cover.jpg"
---

For one of my CLIs, I needed to remove the first argument from the argument list and forward the rest to a next process. In this example, my shell script is called `cli_process` and given arguments `arg1`, `arg2` and `arg3`, I want to execute `forward_process` with `arg2` and `arg3`.

```bash
#!/usr/bin/env bash

# Documentation on @
#   https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-_0040
# Documentation on shift [n]
#   https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-shift
# Why quoting the argument is "necessary":
#   https://stackoverflow.com/questions/4824590/propagate-all-arguments-in-a-bash-shell-script/4824637#4824637

# eats 1 argument
shift 1

# forwards the rest to "forward_process"
forward_process "$@"
```

_Originally posted as a [gist][gist], by myself_.

## Windows

Windows `.bat` files support a similar token: `%*`, which is equivalent to `$@`.
However, the `SHIFT` command, unlike the bash equivalent `shift`, doesn't modify this special token. There are various solutions that will attempt to eat the first `n` parameters, but all of them have edge-cases in which they don't properly work. Should you need this in windows, I recommend you write out the arguments manually `%2`, `%3` (and skip `%1`).

Here you can find some Windows solutions, but make sure you check the comments underneath each one:

- [StackOverflow (935609): batch parameters: everything after %1][so-935609]
- [StackOverflow (761615): Is there a way to indicate the last n parameters in a batch file?
  ][so-761615]

## Resources

- [Bash documentation][doc-at] for `@`
- [Bash documentation][doc-shift] for `shift`
- [StackOverflow (4824590)][so-4824590] on why you need the "quotes" around "@\$"

[gist]: https://gist.github.com/SleeplessByte/ea551df4088d3629f2e5fddcce6b48ea
[so-935609]: https://stackoverflow.com/questions/935609/batch-parameters-everything-after-1
[so-761615]: https://stackoverflow.com/questions/761615/is-there-a-way-to-indicate-the-last-n-parameters-in-a-batch-file/761658#761658
[so-4824590]: https://stackoverflow.com/questions/4824590/propagate-all-arguments-in-a-bash-shell-script/4824637#4824637
[doc-at]: https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-_0040
[doc-shift]: https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-shift
