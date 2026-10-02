+++
title = 'New Output is_residential_proxy Released for GeoIP Insights Web Service, minFraud Insights, and minFraud Factors'
date = 2020-10-20T16:00:00Z
draft = false
legacy_anchor = 'new-output-is_residential_proxy-released-for-geoip-insights-web-service-minfraud-insights-and-minfraud-factors'
+++

We have released an additional output for our web services.
[GeoIP Insights](https://www.maxmind.com/en/geoip-api-web-services),
[minFraud Insights, and minFraud Factors](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
customers can now see whether an IP address is likely a
[residential proxy](https://en.wikipedia.org/wiki/Proxy_server#Residential_proxy):

- `/traits/is_residential_proxy` – This is true if the IP address is on a
  suspected anonymizing network and belongs to a residential ISP. Otherwise, the
  key is not included in the traits object.

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support these outputs so you may need to refresh yours if
you are not interfacing directly with our REST API.
