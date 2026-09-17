+++
title = 'Anonymizer types added to minFraud Insights and Factors'
date = 2017-11-24T16:00:00Z
draft = false
legacy_anchor = 'anonymizer-types-added-to-minfraud-insights-and-factors'
[build]
  list = 'never'
+++

minFraud Insights and Factors services now include anonymizer-type outputs.
These outputs are:

- `/ip_address/traits/is_anonymous` – whether the IP address belongs to any sort
  of anonymous network.
- `/ip_address/traits/is_anonymous_vpn` – whether the IP address belongs to an
  anonymous VPN system.
- `/ip_address/traits/is_hosting_provider` – whether the IP address belongs to a
  hosting provider.
- `/ip_address/traits/is_public_proxy` – whether the IP address belongs to a
  public proxy.
- `/ip_address/traits/is_tor_exit_node` – whether the IP address is a Tor exit
  node.

As these are included via GeoIP Insights, please see our
[GeoIP Web Services documentation](/geoip/docs/web-services) for more
information.
