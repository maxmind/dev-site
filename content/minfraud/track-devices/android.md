---
draft: false
title: Android
---

{{< alert warning >}} The MaxMind Device SDK for Android is currently in beta.
{{</ alert >}}

The MaxMind Device SDK for Android collects device data and sends it to MaxMind
so that the minFraud service can assign a Device ID and begin collecting
fingerprint information.

## Requirements

- Android API 27+ (Android 8.1+)
- A recent stable version of Kotlin
- AndroidX libraries

## Installation

Add the MaxMind Device SDK dependency to your app-level `build.gradle.kts` or
`build.gradle` file. The coroutine examples below also require
`androidx.lifecycle:lifecycle-runtime-ktx` and
`org.jetbrains.kotlinx:kotlinx-coroutines-android`. Your app must declare these
dependencies because the SDK does not include them.

{{< codeset >}}

```kotlin
// build.gradle.kts (Kotlin DSL)
dependencies {
    // Check https://search.maven.org/artifact/com.maxmind.device/device-sdk for the latest version.
    implementation("com.maxmind.device:device-sdk:0.3.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.11.0")
}
```

```groovy
// build.gradle (Groovy DSL)
dependencies {
    // Check https://search.maven.org/artifact/com.maxmind.device/device-sdk for the latest version.
    implementation 'com.maxmind.device:device-sdk:0.3.1'
    implementation 'androidx.lifecycle:lifecycle-runtime-ktx:2.11.0'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.11.0'
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
import android.app.Application
import com.maxmind.device.DeviceTracker
import com.maxmind.device.config.SdkConfig

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

Run the following examples from an AndroidX activity or fragment with a
`lifecycleScope`.

```kotlin
import android.util.Log
import androidx.lifecycle.lifecycleScope
import com.maxmind.device.DeviceTracker
import kotlinx.coroutines.launch

lifecycleScope.launch {
    DeviceTracker.getInstance().collectAndSend()
        .onSuccess { _ ->
            Log.d("MaxMind", "Device data sent successfully")
        }
        .onFailure { error ->
            Log.e("MaxMind", "Failed to send device data", error)
        }
}
```

A callback-based API is also available. Java callers need a Kotlin bridge to
read the tracking token because Kotlin's `Result<T>` has limited Java
interoperability. See the
[Java bridge example](https://github.com/maxmind/device-android/tree/v0.3.1#java-example)
in the SDK documentation.

## Explicit device linking examples

Capture the `trackingToken` from the `collectAndSend()` result and pass it to
your backend for inclusion in the minFraud API request.

```kotlin
import android.util.Log
import androidx.lifecycle.lifecycleScope
import com.maxmind.device.DeviceTracker
import kotlinx.coroutines.launch

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
