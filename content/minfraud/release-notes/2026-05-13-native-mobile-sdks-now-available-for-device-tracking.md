+++
title = 'Native mobile SDKs now available for device tracking'
date = 2026-05-13T13:00:00Z
draft = false
legacy_anchor = 'native-mobile-sdks-now-available-for-device-tracking'
[build]
  list = 'never'
+++

minFraud device tracking is now available for native Android and iOS apps.

Each SDK and the web-based JavaScript returns a `trackingToken` you pass as an
input to your minFraud request—a meaningful improvement for mobile networks
where many devices share a single IP.

The MaxMind Device SDK for Android collects device data and sends it to MaxMind
so that the minFraud service can assign a Device ID and begin collecting
fingerprint information.

The MaxMind Device SDK for iOS collects device data and sends it to MaxMind so
that the minFraud service can assign a Device ID and use it to detect fraud
across sessions. The SDK exposes both a Swift API and an Objective-C API;
Objective-C classes use an MM prefix.

[Learn more about minFraud device tracking](/minfraud/track-devices/).
