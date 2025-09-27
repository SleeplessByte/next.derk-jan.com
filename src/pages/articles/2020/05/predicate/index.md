---
layout: /src/layouts/Article.astro
title: Predicate (Programming logic)
date: "2020-05-07T02:47:00Z"
description: "A few words on boolean-valued functions"
cover: "../../../../../../assets/articles/predicate/cover.jpg"
---

In university I had to study [Prolog][about-prolog] when using [Goal][about-goal], in order to create an agent (artificial intelligence) to play _and win_ capture the flag in Unreal Tournament. This article is not about Prolog, or Goal, but it helps me to mentally model what _predicates_ are.

## Predicates in English

In English, a predicate is a verb phrase template that describes a property, or a relationship, represented by the variables in that template. For example, the phrases **"Jessica is running"**, **"The program is running"** and **"The machine that assembles the car parts is running"** all come from the same template "x is running", where x is replaced by the appropriate noun or noun phrase. The phrase **"is running"** is a predicate, and it describe the property of 'being in a running state'.

This does not limit itself to properties, as **"The function produces an error when it runs"**, **"The operation produces a value when it compiles"** and **"The API produces a new model when it is deployed"** are all created by substituting the **a**, **b** and **c** in the template **"a produces b when c"**. The latter is a predicate and describes the relationship between two objects and a state. This could be represented as `Produces(A, B, C)` or even `P(a, b, c)`.

## Predicates in Programming

Now, in mathematical logic, predicates are usually [Boolean-valued functions][wiki-boolean-functions] which isn't much more than a function that takes a set of inputs, and only outputs a boolean value.

For example:

```javascript
number = 2;

isEven(number);
// => true
```

The function `isEven` takes a set of inputs (all natural numbers) and returns `true` or `false`, based on the predicate. More concretely, it returns `true` _if it satisfies_ the predicate, and `false` otherwise. The function `isEven` is therefore a predicate.

Apart from _specifically_ creating functions that return `true` or `false`, predicates are used all over. For example, in many languages there is a `filter()` function on something that is enumerable, like a list-like data structure.

```java {9, 12}
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

public class JavaExample {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 5, 8, 13, 21, 34);
        Predicate<Integer> isEven = n -> n % 2 == 0;

        numbers.stream()
               .filter(isEven)
               .forEach(System.out::println);
  }
}

// 2
// 8
// 34
```

In this Java example, the _lambda_ (anonymous function, which we've named `isEven`) has the type `Predicate<Integer>`, which is a function that takes an `Integer` and returns `true` or `false`. The function is a _predicate_. The _predicate_ is passed into the function `.filter()`, which will execute the predicate for each item in the list.

```java
isEven(1)
// => false

isEven(2)
// => true

isEven(5)
// => false

isEven(8)
// => true

isEven(13)
// => false

isEven(21)
// => false

isEven(34)
// => false
```

The final "list" of items that makes it to the `.forEach` are those that evaluate to `true`, because that is what `.filter()` does: keep the items for which the _predicate_ returns `true`.

A language doesn't need to be typed to support predicates. Here is the equivalent example in JavaScript:

<!-- prettier-ignore -->
```javascript {5, 8}
const numbers = [
  1, 2, 3, 5, 8, 13, 21, 34
]

const isEven = (n) => n % 2 === 0

numbers
  .filter(isEven)
  .forEach((i) => console.log(i))

// 2
// 8
// 34
```

Again, each value in the `numbers` array is given to the `isEven()` _predicate_, and those that evaluate the _predicate_ to `true`, will be kept (and are then logged in the `.forEach`). It doesn't really matter if you name the predicate, using an in-line, anonymous function doesn't change the fact that it's a predicate:

<!-- prettier-ignore -->
```javascript {6}
const numbers = [
  1, 2, 3, 5, 8, 13, 21, 34
]

numbers
  .filter((n) => n % 2 === 0)
  .forEach((i) => console.log(i))

// 2
// 8
// 34
```

Ruby has a language feature **built-in** to support predicates! Predicate methods in Ruby are those methods that end with a question mark `?`; they return either `true` or `false`. The same example in Ruby looks a bit like this:

```ruby {3, 7}
NUMBERS = [1, 2, 3, 5, 8, 13, 21, 34]

NUMBERS.select { |i| i.even? }
       .each { |i| p i }

# Or alternatively
NUMBERS.select(&:even?)
       .each { |i| p i }

# 2
# 8
# 34
# => [2, 8, 34]
```

## Conclusion

Predicates are used all over, and now you can name them as such. Each time a function (e.g. `.filter()`) takes an argument - an argument that must be _a function_ itself; a function which returns `true` or `false` based on some input (e.g `isEven`) - you know you're dealing with a `predicate`.

Oh, and in Prolog? In Prolog define an `even` predicate like this:

```prolog
even(X) :- 0 is mod(X, 2).

? even(1)
false

? even(2)
true
```

And then filter a list based on even items:

```prolog
/** Predicates */

even(X) :- 0 is mod(X, 2).
odd(X)  :- 1 is mod(X, 2).

/**
 * Filter the list on even elements only
 * 1. true when empty
 * 2. otherwise, there are two options
 *    - if Element (first item) is odd, the Next list does not get Element
 *    - if Element is even, the Next list gets Element
 */
filter([], []).
filter([Element|Tail],        Next) :-  odd(Element), filter(Tail, Next).
filter([Element|Tail], [Element|T]) :- even(Element), filter(Tail, T).

/**
 * Prints a list by iteration through each element
 * 1. true when empty
 * 2. separate Element (first item) and the Tail (...rest)
 *    - write the element + new line
 *    - continue printlist with the tail of the list
 */
printlist([]).
printlist([Element|Tail]) :-
    write(Element),nl,
    printlist(Tail).


?- filter([1, 2, 3, 5, 8, 13, 21, 34], NewList), printlist(NewList).

2
8
34
```

[about-prolog]: https://www.metalevel.at/prolog
[about-goal]: https://multiagentcontest.org/publications/AppliedGOAL.pdf
[wiki-boolean-functions]: https://en.wikipedia.org/wiki/Boolean-valued_function
