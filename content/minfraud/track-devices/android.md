---
draft: false
title: Android
---

{{< alert warning >}} The MaxMind Device SDK for Android is currently in beta.
{{</ alert >}}

The MaxMind Device SDK for Android collects device data and sends it to MaxMind
so that the minFraud service can assign a Device ID and begin collecting
fingerprint information.

## Installation

Add the MaxMind Device SDK dependency to your app-level `build.gradle` file.

{{< codeset >}}

```kotlin
// build.gradle.kts (Kotlin DSL)
dependencies {
    implementation("com.maxmind.device:device-sdk:0.2.0")
}
```

```groovy
// build.gradle (Groovy DSL)
dependencies {
    implementation 'com.maxmind.device:device-sdk:0.2.0'
}
```

{{</ codeset >}}

Check
[Maven Central](https://search.maven.org/artifact/com.maxmind.device/device-sdk)
for the latest version.

## Initialization

Initialize the SDK in your `Application` class. Replace `MAXMIND_ACCOUNT_ID`
with your
[MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id).

```kotlin
import com.maxmind.device.DeviceTracker
import com.maxmind.device.SdkConfig

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = SdkConfig.Builder(MAXMIND_ACCOUNT_ID).build()
        DeviceTracker.initialize(this, config)
    }
}
```

## Collect and send device data

Call `collectAndSend()` to collect device data and send it to MaxMind. This is a
suspend function designed for use with Kotlin coroutines.

```kotlin
import com.maxmind.device.DeviceTracker

lifecycleScope.launch {
    DeviceTracker.getInstance().collectAndSend()
        .onSuccess { result ->
            Log.d("MaxMind", "Device data sent successfully")
        }
        .onFailure { error ->
            Log.e("MaxMind", "Failed to send device data", error)
        }
}
```

A callback-based API is also available for Java compatibility. See the
[SDK documentation](https://github.com/maxmind/device-android#readme) for
details.

## Explicit device linking examples

Capture the `trackingToken` from the `collectAndSend()` result and pass it to
your backend for inclusion in the minFraud API request.

```kotlin
lifecycleScope.launch {
    DeviceTracker.getInstance().collectAndSend()
        .onSuccess { trackingResult ->
            val token = trackingResult.trackingToken
            // Send the tracking token to your backend
            sendTokenToBackend(token)
        }
        .onFailure { error ->
            Log.e("MaxMind", "Failed to send device data", error)
        }
}
```

On your backend, include the token in the minFraud API request:

```json
{
  "device": {
    "ip_address": "2001:db8::ff00:42:8329",
    "tracking_token": "token-value-from-client"
  }
}
```

For full SDK documentation, see the
[device-android README](https://github.com/maxmind/device-android#readme).
