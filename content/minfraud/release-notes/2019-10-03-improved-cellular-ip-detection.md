+++
title = 'Improved cellular IP detection'
date = 2019-10-03T16:00:00Z
draft = false
legacy_anchor = 'improved-cellular-ip-detection'
[build]
  list = 'never'
+++

We have made improvements to how we identify cellular IPs for the
`connection_type` field provided in the
[GeoIP Connection Type database](https://www.maxmind.com/en/geoip-databases),
and the `user_type` field provided in the
[GeoIP Insights web service](https://www.maxmind.com/en/geoip-api-web-services)
and
[minFraud services](https://www.maxmind.com/en/solutions/fraud-prevention/overview).
Accuracy for cellular identification should now be about 95% accurate globally.
