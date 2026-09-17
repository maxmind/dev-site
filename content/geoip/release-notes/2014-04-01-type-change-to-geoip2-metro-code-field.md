+++
title = 'Type Change to GeoIP2 Metro Code Field'
date = 2014-04-01T16:00:00Z
draft = false
legacy_anchor = 'type-change-to-geoip2-metro-code-field'
+++

In previous GeoIP2 databases, the `metro_code` was incorrectly represented as a
string. This has been corrected and now `metro_code` is internally represented
as an `uint16`. This should not affect users of the official Java, .NET, Perl,
or PHP GeoIP2 APIs. The Python API will now return an integer rather than a
string for `metro_code`. Users of libmaxminddb or third-party APIs may be
affected.
