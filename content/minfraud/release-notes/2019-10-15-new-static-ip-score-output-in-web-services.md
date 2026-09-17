+++
title = 'New static_ip_score output in web services'
date = 2019-10-15T16:00:00Z
draft = false
legacy_anchor = 'new-static_ip_score-output-in-web-services'
+++

The following output has been added to the
[GeoIP Insights web service](https://www.maxmind.com/en/geoip-api-web-services),
and
[minFraud Insights and Factors web services](https://www.maxmind.com/en/solutions/fraud-prevention/overview):

- `static_ip_score` – An indicator of how static or dynamic an IP address is.
  The value ranges from 0 to 99.99 with higher values meaning a greater static
  association. For example, many IPs with a `user_type` of `cellular` have a
  score under one. Static Cable/DSL IPs typically have a score above thirty.

  This indicator can be useful for deciding whether an IP address represents the
  same user over time.

The `static_ip_score` output is present in the `traits` object.
