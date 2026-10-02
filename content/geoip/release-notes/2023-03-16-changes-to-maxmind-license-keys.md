+++
title = 'Changes to MaxMind License Keys'
date = 2023-03-16T16:00:00Z
draft = false
legacy_anchor = 'changes-to-maxmind-license-keys'
+++

We are making changes to the format of our license keys:

- New license keys will be longer, with a six character prefix.
- Beginning on March 27, 2023, we will no longer be issuing unhashed license
  keys for use with legacy versions of
  [our GeoIP Update program](/geoip/updating-databases) (any version prior to
  v3.1.1).

**For customers using our REST API, Client APIs or version 3.1.1 and higher of
[our GeoIP Update program](/geoip/updating-databases):**

No action is required. Existing license keys will still be valid and will
continue to function normally.

New license keys will have the following changes:

- The character set is changing from `[a-zA-Z0-9]` to `[a-zA-Z0-9_]`.
- The length of the license key will now be 40 characters.
- License keys will have a `_mmk` suffix.

Please note that the length of license keys may be increased in the future.

**Customers using legacy versions of our GeoIP Update program:**

Legacy versions of `geoipupdate` use less secure unhashed license keys.
Beginning on March 27, 2023 we will no longer be issuing new unhashed license
keys. Your existing license keys can continue to be used, but you will no longer
be able to generate new unhashed license keys.

New license keys only work with geoipupdate version 3.1.1 or greater. We
encourage you to update to the latest version at your earliest convenience.

[Learn how to upgrade from geoipupdate legacy to the current version on our Developer’s Portal.](/geoip/upgrading-geoip-update)
