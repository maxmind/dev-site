+++
title = 'New License Key Format'
date = 2023-03-16T16:00:00Z
draft = false
legacy_anchor = 'new-license-key-format'
[build]
  list = 'never'
+++

We have updated the format of our license keys. New license keys will be longer,
with a six character prefix.

The new license keys can be used in all current versions of our Client APIs and
in version 3.1.1 and higher of
[our GeoIP Update program](/geoip/updating-databases).

No action is required for minFraud users. Existing license keys will still be
valid and will continue to function normally.

New license keys will have the following changes:

- The character set is changing from `[a-zA-Z0-9]` to `[a-zA-Z0-9_]`.
- The length of the license key will now be 40 characters.
- License keys will have a `_mmk` suffix.

Please note that the length of license keys may be increased in the future.
