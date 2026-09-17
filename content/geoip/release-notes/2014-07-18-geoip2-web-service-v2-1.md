+++
title = 'GeoIP2 Web Service v2.1'
date = 2014-07-18T15:00:00Z
draft = false
legacy_anchor = 'geoip2-web-service-v21'
+++

MaxMind has released version 2.1 of the GeoIP2 web service. Changes include:

- The Omni endpoint was renamed Insights. The path for this endpoint has changed
  accordingly.
- The City/ISP/Org endpoint was removed. The City endpoint now returns all of
  the data previously returned by City/ISP/Org.
- In v2.0, `accuracy_radius`, `autonomous_system_number`, and all of the
  `confidence` values were incorrectly returned as strings. These are now
  returned as integers.

To upgrade, please use the updated service URIs specified in our
[developer documentation](/geoip/docs/web-services/requests).

For the version 2.0 endpoints, the City endpoint will now include ISP/Org data.
The other output for the 2.0 endpoints was unchanged.
