+++
title = 'Device Tracking Add-On now always uses HTTPS'
date = 2018-05-18T16:00:00Z
draft = false
legacy_anchor = 'device-tracking-add-on-now-always-uses-https'
[build]
  list = 'never'
+++

The HTTP request made by the Device Tracking Add-On now always uses HTTPS.
Previously it used HTTP if your document was served over HTTP. This reduces
compatibility with certain older versions of Internet Explorer, but will not
cause errors.

We also recommend that you use an HTTPS URL when including the add-on in your
site. We've updated the example code in
[our documentation](/minfraud/track-devices) to show how to do this.
