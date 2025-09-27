---
layout: /src/layouts/Article.astro
title: Expo Updates · Custom update notification
date: "2021-06-15T01:54:00Z"
description: "Maintaining a fast start-up time, and in-app message to show your users that a new update is ready whilst using the application."
cover: "../../../../../../assets/articles/expo-custom-update-notification/cover.jpg"
---

As you might now, I am a big [Expo](https://docs.expo.io/) fan.
Various of my project are built on top of this marvelous framework and help me develop, build, deploy, and quickly iterate on iOS, Android, _and_ web apps from the same TypeScript code bases.

In this article I'd like to show you how I use [`expo-updates`](https://docs.expo.io/versions/latest/sdk/updates/) to show a _custom_ update ready notification instead of relying on the start-up sequence, or the user periodically closing the application.

> The `Updates` API from `expo` allows you to programmatically control and respond to over-the-air updates to your app.

![Typewriter with a paper sticking out with a single word: "Update"](../../../../../../assets/articles/expo-custom-update-notification/cover.jpg)

## Configuration

Make sure your `app.json` has the following:

```json
{
  "updates": {
    "enabled": true,
    "fallbackToCacheTimeout": 0,
    "checkAutomatically": "ON_ERROR_RECOVERY"
  }
}
```

This will _prevent_ `expo` from checking for updates **at all**, unless you run into a fatal JS error.
In general this means that expo will only check for updates when it's not confident the user will be able to get to the in-app updater.

However, your start-up sequence might also crash, and since it will use the build from cache, that's unlikely to resolve itself.
If you're not confident that the updates you'll push are crash-free-on-load, use:

```json
{
  "updates": {
    "enabled": true,
    "fallbackToCacheTimeout": 15000,
    "checkAutomatically": "ON_ERROR_RECOVERY"
  }
}
```

## Mounting the updater

Because the `expo-updates` API is (currently) not available on web, I recommend to conditionally load the `OtaUpdater`, which I'll show you how to write in a minute.

```tsx {10}
import { Platform } from "react-native";

// Your application might look differently. What's important is that you mount
// the component at the top-level, and that it stays mounted throughout the
// lifecycle of the application.
export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
      {/* insert here */}
      <StatusBar />
    </SafeAreaProvider>
  );
}
```

Since you want to exclude web, insert the following:

```tsx
{
  Platform.OS !== "web" && <OtaUpdater />;
}
```

## Creating `OtaUpdater`

Here's the idea:

- Periodically check for updates using `Updates.checkForUpdateAsync()`
- When there is one, download it using `Updates.fetchUpdateAsync()`
- When that has finished, show some UI that calls `Updates.reloadAsync()`

Let's start with the code that would check for updates:

```typescript
import * as Updates from "expo-updates";

async function checkForUpdates(): Promise<true> {
  const update = await Updates.checkForUpdateAsync();
  if (!value.isAvailable) {
    throw new Error("No updates available");
  }

  const result = await Updates.fetchUpdateAsync();
  if (!result.isNew) {
    throw new Error("Fetched update is not new");
  }

  return true;
}
```

There are two steps.

1. Check if a new update is available
2. Download it and assert that it's newer than what's available

Next I want to run this code only after a certain amount of time has passed.

In this case I'll use [`react-native-use-timestamp`](https://npm.runkit.com/react-native-use-timestamp/index.ts), a package that allows you to re-render a component on an interval _without setting long running timers_ and _without keeping the app alive_, and defer when animations are running.
It also allows you to test it because it relies on [`use-timestamp`](https://npm.runkit.com/use-timestamp/index.ts) which comes with "mocking" out-of-the-box.

```tsx
import { useInaccurateTimestamp } from "react-native-use-timestamp";

// How often do we want to render?
const INTERVAL_RENDER = 1000 * (__DEV__ ? 10 : 60);

export function OtaUpdater() {
  const now = useInaccurateTimestamp({ every: INTERVAL_RENDER });
  const isMounted = useRef(true);
  const [updateIsAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (updateIsAvailable) {
      return;
    }

    checkForUpdates()
      .then(() => {
        isMounted.current && setUpdateAvailable(true);
      })
      .catch((_reason) => {
        /* you can inspect _reason */
      });
  }, [now]);

  return null;
}
```

This works pretty well. Every 60 seconds, it will check for an update and when it's ready, it sets `updateIsAvailable` to true.
However, it's not very nice for your user!

- Checking the internet potentially means _reconnecting_ to the internet which is _energy consuming_
- We don't _need_ to tell the user every minute that an update is ready

Let's add a 15 minute interval. You might be tempted to increase `INTERVAL_RENDER` to 15 minutes, but that would be a mistake if you're trying to avoid long running timers.

> 💡 Note: long running timers aren't bad, even though there is a warning message.
> It mostly means that the timer is no longer accurate if the user suspends the application.
> In our case, that's not a problem _but_ we do care about the 15 minute interval.
> What we don't want is that the user must be active for 15 minutes before we check.

Instead, here is a way to accomplish that:

```typescript {1-2, 7-10, 13-17}
// How often should it actually check for an update?
const INTERVAL_OTA_CHECK = 1000 * 60 * 15;

export function OtaUpdater() {
  // ... the old code

  // Setting this to initially zero means there will _always_ be a check on
  // mount, which is nice, because that means a check when the app starts.
  const [lastUpdate, setLastUpdate] = useState(0);

  useEffect(() => {
    if (now - lastUpdate < INTERVAL_OTA_CHECK) {
      return;
    }

    setLastUpdate(now);

    // ... the old code
  }, [now]);

  return null;
}
```

Each time the effect runs because of the timestamp that has changed, it will check how long it has been since the last real check.

## Everything together:

```tsx
import { useInaccurateTimestamp } from "react-native-use-timestamp";

// How often do we want to render?
const INTERVAL_RENDER = 1000 * (__DEV__ ? 10 : 60);

// How often should it actually check for an update?
const INTERVAL_OTA_CHECK = 1000 * 60 * 15;

export function OtaUpdater() {
  const now = useInaccurateTimestamp({ every: INTERVAL_RENDER });
  const isMounted = useRef(true);
  const [updateIsAvailable, setUpdateAvailable] = useState(false);

  // Setting this to initially zero means there will _always_ be a check on
  // mount, which is nice, because that means a check when the app starts.
  const lastUpdate = useRef(0);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (updateIsAvailable) {
      return;
    }

    if (now - lastUpdate.current < INTERVAL_OTA_CHECK) {
      return;
    }

    lastUpdate.current = now;

    checkForUpdates()
      .then(() => {
        isMounted.current && setUpdateAvailable(true);
      })
      .catch((_reason) => {
        /* you can inspect _reason */
      });
  }, [now]);

  return null;
}
```

All that's left for you to do is replace `null` with your UI.
Don't forget to call `Updates.reloadAsync()` on some action / button.
I often use a `Snackbar` as provided by [`react-native-paper`](https://reactnativepaper.com/) which looks something like this:

```tsx
return (
  <Portal>
    <Snackbar
      visible={updateIsAvailable}
      onDismiss={() => {}}
      action={{
        label: "Apply update",
        onPress: () => {
          Updates.reloadAsync();
        },
      }}
    >
      Hey there! We got an update for you 🥳🎉.
    </Snackbar>
  </Portal>
);
```

## Bonus: showing an update-specific message

Because you have access to the new [`Manifest`](https://docs.expo.io/guides/how-expo-works/?redirected#expo-manifest), you can use it to show a custom message.

```tsx {1, 12-13}
async function checkForUpdates(): Promise<string> {
  const update = await Updates.checkForUpdateAsync();
  if (!value.isAvailable) {
    throw new Error("No updates available");
  }

  const result = await Updates.fetchUpdateAsync();
  if (!result.isNew) {
    throw new Error("Fetched update is not new");
  }

  // Using the "extra": { "update-message": "..." } from app.json
  return result.manifest.extra["update-message"];
}
```

You can also build a message out of the new version, or, optionally `fetch` the changelog from a service you provide.

Have fun!
