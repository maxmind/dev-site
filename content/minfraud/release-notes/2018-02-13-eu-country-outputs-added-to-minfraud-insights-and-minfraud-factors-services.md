+++
title = 'EU Country outputs added to minFraud Insights and minFraud Factors services'
date = 2018-02-13T16:00:00Z
draft = false
legacy_anchor = 'eu-country-outputs-added-to-minfraud-insights-and-minfraud-factors-services'
[build]
  list = 'never'
+++

We have added additional outputs to the minFraud Insights and minFraud Factors
services. The outputs are:

- EU Country: `/country/is_in_european_union` – Country of the location of the
  IP address in an EU member state
- EU Registered Country: `/registered_country/is_in_european_union` – Country
  registered by the ISP or organization is an EU member state

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
[GeoIP Web Services documentation](/geoip) for more information.
