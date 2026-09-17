+++
title = 'Identifying Verizon 5g Home Internet'
date = 2025-01-27T16:00:00Z
draft = false
legacy_anchor = 'identifying-verizon-5g-home-internet'
+++

Starting on Tuesday, February 4, we will be making changes to identify more
fixed wireless networks. We are starting with Verizon Wireless networks in the
United States.

Beginning with database releases on Tuesday, February 4, about 15% of traffic
previously identified with ISP name `Verizon Wireless` will be reclassified.

These networks will have their ISP name set to `Verizon 5g Home Internet` and
they will have their `user_type` set to `residential`. Their `connection_type`
will remain set to `Cellular`.

The following products and services will be affected:

- GeoIP Enterprise database
- GeoIP Insights and City Plus web services
- GeoIP ISP database
- minFraud Insights and Factors web services
