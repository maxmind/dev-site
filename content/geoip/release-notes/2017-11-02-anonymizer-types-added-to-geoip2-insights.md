+++
title = 'Anonymizer types added to GeoIP2 Insights'
date = 2017-11-02T16:00:00Z
draft = false
legacy_anchor = 'anonymizer-types-added-to-geoip2-insights'
+++

GeoIP2 Insights now includes anonymizer-type outputs. These outputs are:

- `/traits/is_anonymous` – whether the IP address belongs to any sort of
  anonymous network.
- `/traits/is_anonymous_vpn` – whether the IP address belongs to an anonymous
  VPN system.
- `/traits/is_hosting_provider` – whether the IP address belongs to a hosting
  provider.
- `/traits/is_public_proxy` – whether the IP address belongs to a public proxy.
- `/traits/is_tor_exit_node` – whether the IP address is a Tor exit node.

Please see our [GeoIP2 Web Services documentation](/geoip/docs/web-services) for
more information.
