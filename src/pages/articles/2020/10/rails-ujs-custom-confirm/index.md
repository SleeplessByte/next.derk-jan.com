---
layout: /src/layouts/Article.astro
title: Rails UJS · Custom Confirm
date: "2020-10-06T22:34:00Z"
description: "Using a custom confirmation dialog, when using Rails unobtrusive JavaScript driver."
cover: "/src/assets/articles/2020/10/rails-ujs-custom-confirm/cover.jpg"
---

In Rails, the [`@rails/ujs`][npm-rails-ujs] driver can be used to add interactions to a website, without needing to mix the JavaScript with the HTML. It's progressively enhancing a site, and will not do anything special if JavaScript is turned off. In particular, this driver allows to [Show a Confirmation][rails-guides-confirmations] before actually executing whatever the click / touch / interaction was supposed to do.

![Thumbs up with a gradient background](/src/assets/articles/2020/10/rails-ujs-custom-confirm/cover.jpg)

From the documentation, the following Ruby or ERB (Embedded Ruby) code...

```ruby
link_to "Dangerous zone", dangerous_zone_path, data: { confirm: 'Are you sure?' }
```

...generates the following HTML:

```html
<a href="..." data-confirm="Are you sure?">Dangerous zone</a>
```

## Changing the default behaviour

The documentation says:

```text
The default confirmation uses a JavaScript confirm dialog, but you can customize
this by listening to the confirm event, which is fired just before the
confirmation window appears to the user. To cancel this default confirmation,
have the confirm handler to return false.
```

In my experience, this method has been flaky at best, or straight out not working as expected.

## Source code implementation

The [source code][github-rails-ujs], however, isn't that scary. It even has a message to indicate to us that this is how a custom confirm dialog should be added:

```coffee
# Default confirm dialog, may be overridden with custom confirm
# dialog in Rails.confirm
Rails.confirm = (message, element) ->
  confirm(message)
```

## Implementing a custom dialog

Follow along with the code below, the comments explain what is happening.

```typescript
import Rails from "@rails/ujs";

// This is the native confirm, showing a browser alert/confirm dialog
const nativeConfirm = Rails.confirm;

let __SkipConfirmation = false;

Rails.confirm = function (message: string, element: HTMLElement) {
  // JavaScript is single threaded. We can temporarily change this variable
  // in order to skip out of the confirmation logic.
  //
  // When this function returns true, the event (such as a click event) that
  // sourced it is not prevented from executing whatever it was supposed to
  // trigger, such as a form submission, or following a link.
  if (__SkipConfirmation) {
    return true;
  }

  // Here is the logic to determine if a custom dialog should be shown. In
  // this case, we'd expect [data-confirm-dialog="id"] to be present, but
  // other techniques, such as dynamically building a dialog from the
  // [data-confirm] content would also work.
  const dialogId = element.getAttribute("data-confirm-dialog");
  if (!dialogId) {
    return nativeConfirm(message, element);
  }

  // This function should be executed when the dialog's positive action is
  // clicked. All it does is re-click the element that was originally
  // triggering this confirmation.
  //
  // Clicking that element will, as expected, re-call Rails.confirm (unless
  // we'd remove [data-confirm] temporarily, which is the alternative solution
  // to this), but because __SkipConfirmation is set, it will bail out early.
  function onConfirm() {
    __SkipConfirmation = true;
    element.click();
    __SkipConfirmation = false;
  }

  // Here a custom dialog can be shown. use whatever method you like. This
  // hypothetical function shows a dialog.
  //
  showDialog(dialogId, element, onConfirm);

  // The dialog should, on confirm, call onConfirm()

  // This ensures that the original event that caused this confirmation is
  // swallowed and the action is NOT executed.
  return false;
};
```

When `data-confirm-dialog` is not passed, nothing changes. When it is passed, `showDialog` is called which is supposed to show the dialog.

```ruby
link_to "Dangerous zone", dangerous_zone_path, data: {
  confirm: 'Are you sure?',
  'confirm-dialog': '#my-confirm-dialog'
}
```

### Implementing a custom library

Here is an example for implementing [`sweetalert2`][web-sweetalert2], which I don't care for personally, but seen quite a few times in the wild.

First, change the custom `Rails.confirm` to look for `data-sweet-alert`. Optionally, use this to pass in arguments to customize the dialog.

```typescript
if (!element.hasAttribute("data-sweet-alert")) {
  return nativeConfirm(message, element);
}

// ...

showDialog(element, onConfirm);
```

Then, implement the new `showDialog` function, for example as follows:

```javascript
function showDialog(element, onConfirm) {
  const options = JSON.parse(element.getAttribute("data-sweet-alert") || "{}");
  const message = element.getAttribute("data-confirm");

  Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Confirm",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    ...options,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
}
```

A few examples:

```ruby
##
# Show a confirmation dialog
#
# title: Are you sure?
# text: You can't undo this.
#
# [Confirm] [Cancel]
#
link_to "Dangerous zone", dangerous_zone_path, data: {
  confirm: 'You can\'t undo this.',
  'sweet-alert': ''
}
```

```ruby
##
# Show a dialog
#
# title: Here be dragons
# text: Just say yes!
#
# [Yes!]
#
link_to "Dangerous zone", dangerous_zone_path, data: {
  confirm: 'Not showing this',
  'sweet-alert': {
    title: 'Here be dragons',
    text: 'Just say yes!',
    confirmButtonText: 'Yes!'
  }
}
```

## Conclusion

It's a bit weird to override the synchronous nature of the default `Rails.confirm` implementation, but it definitely allows for very interesting interactions, without having to write your own implementation of `[data-confirm]`.

[npm-rails-ujs]: https://www.npmjs.com/package/@rails/ujs
[rails-guides-confirmations]: https://guides.rubyonrails.org/working_with_javascript_in_rails.html#confirmations
[github-rails-ujs]: https://github.com/rails/rails/blob/e9aa7ecdee0aa7bb4dcfa5046881bde2f1fe21cc/actionview/app/assets/javascripts/rails-ujs/features/confirm.coffee#L8-L10
[web-sweetalert2]: https://sweetalert2.github.io/
