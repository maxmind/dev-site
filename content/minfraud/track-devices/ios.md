---
draft: false
title: iOS
---

{{< alert warning >}} The MaxMind Device SDK for iOS is currently in beta.
{{</ alert >}}

The MaxMind Device SDK for iOS collects device data and sends it to MaxMind so
that the minFraud service can assign a Device ID and use it to detect fraud
across sessions. The SDK exposes both a Swift API and an Objective-C API;
Objective-C classes use an `MM` prefix.

## Requirements

- iOS 15.0+
- Swift 5.9+
- Xcode 15.0+

## Installation

Add the MaxMind Device SDK as a Swift Package dependency. In Xcode, choose
**File > Add Package Dependencies…** and enter the repository URL
`https://github.com/maxmind/device-ios.git`.

Or add it to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/maxmind/device-ios.git", from: "0.1.0")
]
```

Check the [device-ios releases](https://github.com/maxmind/device-ios/releases)
for the latest version.

## Initialization

Initialize the SDK with your
[MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id).
Replace `MAXMIND_ACCOUNT_ID` with your account ID.

{{< codeset >}}

```swift
import MinFraudDevice

let config = SDKConfig(accountID: MAXMIND_ACCOUNT_ID)
let tracker = DeviceTracker(config: config)
```

```objc
@import MinFraudDevice;

MMSDKConfig *config = [[MMSDKConfig alloc] initWithAccountID:MAXMIND_ACCOUNT_ID];
MMDeviceTracker *tracker = [[MMDeviceTracker alloc] initWithConfig:config];
```

{{</ codeset >}}

## Collect and send device data

Call `collectAndSend()` to collect device data and send it to MaxMind. The Swift
API uses Swift concurrency (`async`/`await`); the Objective-C API uses a
completion handler.

{{< codeset >}}

```swift
import MinFraudDevice

do {
    let result = try await tracker.collectAndSend()
    print("Device data sent successfully")
} catch {
    print("Failed to send device data: \(error)")
}
```

```objc
[tracker collectAndSendWithCompletion:^(MMTrackingResult *result, NSError *error) {
    if (error) {
        NSLog(@"Failed to send device data: %@", error);
        return;
    }
    NSLog(@"Device data sent successfully");
}];
```

{{</ codeset >}}

## Explicit device linking examples

Capture the `trackingToken` from the `collectAndSend()` result and pass it to
your backend for inclusion in the minFraud API request.

{{< codeset >}}

```swift
import MinFraudDevice

do {
    let result = try await tracker.collectAndSend()
    let token = result.trackingToken
    // Send the tracking token to your backend
    sendTokenToBackend(token)
} catch {
    print("Failed to send device data: \(error)")
}
```

```objc
[tracker collectAndSendWithCompletion:^(MMTrackingResult *result, NSError *error) {
    if (error) {
        NSLog(@"Failed to send device data: %@", error);
        return;
    }
    // Send the tracking token to your backend
    [self sendTokenToBackend:result.trackingToken];
}];
```

{{</ codeset >}}

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
[device-ios README](https://github.com/maxmind/device-ios#readme).
