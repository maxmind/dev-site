+++
title = 'Change to Comcast Business ISP name'
date = 2016-11-08T16:00:00Z
draft = false
legacy_anchor = 'change-to-comcast-business-isp-name'
+++

We've updated any GeoIP database or service providing ISP and Organization data
to return Comcast Business rather than Comcast Business Communications. We are
doing so in order to use the trade name of the ISP and also because it is
shorter.

Please note that if you use this data point, for example, to flag a visitor if
they change ISP, you may need to adjust your implementation in order to avoid
false positive or negative flags.

The following GeoIP databases and services are affected by this change:

- GeoIP2 ISP database
- GeoIP2 Enterprise database (Update will apply to November 15th release)
- GeoIP Legacy ISP and Organization databases
- GeoIP2 City Plus and Legacy City Web Service
- GeoIP2 and Legacy Insights Web Service
