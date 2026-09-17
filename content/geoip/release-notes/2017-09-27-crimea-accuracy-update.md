+++
title = 'Crimea accuracy update'
date = 2017-09-27T16:00:00Z
draft = false
legacy_anchor = 'crimea-accuracy-update'
+++

We completed our most recent review and update of Geolocation for Crimea. Our
accuracy has increased as follows:

Approximately 89% of website visitors who are from Crimea are currently located
by GeoIP as being in Crimea. Approximately 97% of the visitors who are located
in Crimea by GeoIP are actually in Crimea.

We currently locate Crimea in Ukraine, as we use GeoNames data and they locate
Crimea in Ukraine. If GeoNames locates Crimea in Russia in the future, we will
follow their change and post an announcement here as well as on
[https://twitter.com/maxmind](https://twitter.com/maxmind).

In legacy GeoIP, we return a FIPS region code of 11 or 20. In GeoIP2, we return
an ISO code of 40 or 43 in the subdivision object.

Due to the nature of geolocation technology and other factors beyond our
control, we cannot guarantee any specific future accuracy level. Further,
accuracy figures are subject to change as IP networks are reallocated.
