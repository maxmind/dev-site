+++
title = 'Anonymous IP flags as parameters for custom rules'
date = 2020-05-14T16:00:00Z
draft = false
legacy_anchor = 'anonymous-ip-flags-as-parameters-for-custom-rules'
[build]
  list = 'never'
+++

Customers of [minFraud Insights and minFraud Factors](/minfraud) can now use the
following
[Anonymous IP outputs](/geoip/docs/web-services/responses/#schema--response--traits)
as parameters to serve as the basis when creating a custom rule:

- `/ip_address/traits/is_anonymous`
- `/ip_address/traits/is_anonymous_vpn`
- `/ip_address/traits/is_hosting_provider`
- `/ip_address/traits/is_public_proxy`
- `/ip_address/traits/is_tor_exit_node`
