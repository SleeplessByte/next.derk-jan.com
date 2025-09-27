---
layout: /src/layouts/Article.astro
title: Cross tab events
date: "2020-05-04T19:43:00Z"
description: "Running code on other tabs when something happens"
cover: "/src/assets/articles/2020/05/cross-tab-events/cover.jpg"
---

Last week I had an instance where I needed to update all tabs of the same site when a user chose something from a dropdown. Think of the dropdown's current value being a global setting and changing it on one tab, feels like it should change it every where.

## Use a `BroadcastChannel`

The recommended way is to use a [`BroadcastChannel`][mdn-broadcast-channel], which takes a _name_ upon construction, which is unique for all [browsing contexts][mdn-browsing-context] of the same _origin_. In other words, most of the time this equals all tabs and windows on the same site. One of the great things about `BroadcastChannel`s is that there is no real indirection, _and_ it is available in [Web Workers][mdn-web-worker].

```javascript {13,14,18}
function reload({ timeRange }) {
  // fictional function that reloads the current page contents
}

function handleSettingsBroadcast(event) {
  switch (event.data.type) {
    case "time-range.changed": {
      reload({ timeRange: event.data.value });
    }
  }
}

const channel = new BroadcastChannel("settings");
channel.onmessage = handleSettingsBroadcast;

// Callback when the drop down is changed
function onChangeTimeRange(nextValue) {
  channel.postMessage({ type: "time-range.changed", value: nextValue });
}
```

In the example above, I've chosen to use a single channel `settings`, with structured data. You could, instead, make
a channel per "message-type", or even use a single channel `com.yourdomain.app` for everything.

### React use case

If you're using something like flux, redux or another state manager, you can send "updated state" across tabs, but be weary: if you have side-effects on state changes, this will run those side-effects multiple times.

Additionally, you can use a hook to receive updates, for example:

```javascript
function useBroadcastValue(channel, event, initial = undefined) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    // Create a new channel on this name. The channel will be able to receive
    // data as long as it's not closed.
    const broadcastChannel = new BroadcastChannel(channel);

    // Receives messages and forwards them to the setValue dispatch if they
    // match the type. This requires each event in this channel to have the
    // shape:
    //
    // {
    //   type: 'event-type',
    //   value: <some value>
    // }
    //
    broadcastChannel.onmessage = (ev) => {
      ev.data.type === event && setValue(ev.data.value);
    };

    // Close the channel -- we no longer want to receive messages
    return () => {
      broadcastChannel.close();
    };
  }, [channel, event]);

  return value;
}

// ...

function MyComponent() {
  const timeRange = useBroadcastValue("settings", "time-range.updated");
  // ...
}
```

In the same fashion, a "send on change" broadcast can be achieved:

```javascript
function useBroadcastState(channel, event, initial = undefined) {
  const [value, setValue] = useState(initial);
  const [broadcastChannel, setBroadcastChannel] = useState();

  // You can do all this without a use-effect, as it's not expensive code. You
  // could also do this in a single use-effect. However, I've often gotten
  // questions how you do something like this: have two variables and update
  // them independently, whilst maintaining integrity. This is how you could do
  // that.

  useEffect(() => {
    // Create a new channel on this name. The channel will be able to receive
    // and send data as long as it's not closed.
    const pipe = new BroadcastChannel(channel);

    // This allows the channel to be used outside this effect
    setBroadcastChannel(pipe);

    // Close the channel -- we no longer want to receive or send messages, as
    // the channel name has changed (or the hook is in a component that is being
    // unmounted).
    return () => {
      pipe.close();
    };
  }, [channel]);

  useEffect(() => {
    broadcastChannel.onmessage = (ev) => {
      ev.data.type === event && setValue(ev.data.value);
    };

    // Each time the channel changes (different name, initial mount) or the
    // event we want to listen to changes, run this hook.
  }, [broadcastChannel, event]);

  const setAndBroadcastValue = useCallback(
    (nextValue) => {
      // Broadcast the value
      broadcastChannel.postMessage({ type: event, value: nextValue });

      // ...but also update it locally
      setValue(nextValue);
    },
    [broadcastChannel, event],
  );

  return [value, setAndBroadcastValue];
}

// ...

function MySettingComponent() {
  const [timeRange, setTimeRange] = useBroadcastState(
    "settings",
    "time-range.updated",
  );
  // ...
}
```

### Compatibility

[Support][can-i-use-broadcast-channel] is [pretty good][can-i-use-broadcast-channel], but at moment of writing, no Safari. This probably makes this solution not-workable for many of you. Luckily, there is a, now almost "ancient" way to do this with even better support.

## Use `localStorage`

[LocalStorage][mdn-local-storage] has been around for longer and that shows when you look at the [support][can-i-use-local-storage]. Not only is it supported on Safari, it also works on mobile browsers and even IE. Great.

How can we use `localStorage` to send data across tabs? As you can imagine, data from `localStorage` is available in all the tabs of the same origin (scheme, port, hostname), but that doesn't magically broadcast changes everywhere. It actually does!

```javascript {13,17}
function reload({ timeRange }) {
  // fictional function that reloads the current page contents
}

function handleSettingsBroadcast(event) {
  switch (event.key) {
    case "settings.time-range.changed": {
      reload({ timeRange: event.newValue });
    }
  }
}

window.addEventListener("storage", handleSettingsBroadcast);

// Callback when the drop down is changed
function onChangeTimeRange(nextValue) {
  localStorage.setItem("settings.time-range.changed", nextValue);
}
```

### React hook

The implementation for a react hook is less complex:

```javascript
function useBroadcastState(event) {
  // Get the initial value from local storage. Remove the initializer if you
  // don't intend to store the value _anyway_. For our settings, it makes
  // perfect sense, as they're not sensitive.
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(event) || "null"),
  );

  useEffect(() => {
    const onStorage = (ev) => {
      if (ev.key !== event) {
        return;
      }

      setValue(JSON.parse(ev.newValue));
    };

    // This will trigger on storage events. That usually means that it will
    // trigger in all browsing contexts that are currently blurred (so not the
    // current, active/focussed one). This doesn't hold for older browsers. IE10
    // for example will send the event to the calling tab as well. That's okay,
    // just expect a double render.
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [event]);

  const setAndBroadcastValue = useCallback(
    (nextValue) => {
      // Broadcast the value
      localStorage.setItem(event, JSON.stringify(nextValue));

      // ...but also update it locally
      setValue(nextValue);
    },
    [event],
  );

  return [value, setAndBroadcastValue];
}
```

## Onwards

There are various ways to send information across tabs. This can be really helpful if context is key. Users sometimes open sites in many tabs at the same time. Here are some examples:

- In CMS or on edit pages, you can broadcast that editing is in progress in a different tab
- In systems where you only want one socket connection open, you can broadcast that socket connections should close
- In adminsitrative dashboards you might want to reload index/show pages when content is CRUDed, for that type

[can-i-use-broadcast-channel]: https://caniuse.com/#feat=broadcastchannel
[can-i-use-local-storage]: https://caniuse.com/#feat=mdn-api_window_localstorage
[mdn-broadcast-channel]: https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel
[mdn-browsing-context]: https://developer.mozilla.org/en-US/docs/Glossary/browsing_context
[mdn-local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[mdn-web-worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
