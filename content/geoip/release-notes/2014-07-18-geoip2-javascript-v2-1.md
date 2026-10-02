+++
title = 'GeoIP2 JavaScript v2.1'
date = 2014-07-18T16:00:00Z
draft = false
legacy_anchor = 'geoip2-javascript-v21'
+++

MaxMind released version 2.1 of our JavaScript API. Changes:

- This release updates the API to use version 2.1 of our GeoIP2 web service.
- The `omni()` method has been replaced with the `insights()` method.
- The `cityISPOrg()` has been removed.
- The `city()` method now returns ASN, ISP, and organization data.
- As noted in the web service release notes, several fields that were
  incorrectly strings in version 2.0 of the web service have been changed to be
  numeric.

To upgrade, please use the new JavaScript file specified in our
[developer documentation](/geoip/geolocate-an-ip/client-side-javascript).

Users of version 2.0 are not affected, but they are encouraged to update to the
new version. Only serious functionality issues will be fixed in version 2.0.
