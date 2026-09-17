+++
title = 'New network and user_count outputs in web services'
date = 2019-09-19T16:00:00Z
draft = false
legacy_anchor = 'new-network-and-user_count-outputs-in-web-services'
+++

The following outputs have been added to the
[GeoIP2 Insights web service](https://www.maxmind.com/en/geoip-api-web-services),
and
[minFraud Insights and Factors web services](https://www.maxmind.com/en/solutions/fraud-prevention/overview):

- `network` – The network in
  [CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)
  associated with the record. This is the largest network where all of the
  fields besides `ip_address` have the same value.
- `user_count` – The estimated number of users sharing the IP/network during the
  past 24 hours. For IPv4, the count is for the individual IP. For IPv6, the
  count is for the /64 network.

Both of these outputs are present in the `traits` object.
