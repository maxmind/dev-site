+++
title = 'Dialup values for connection_type and user_type deprecated'
date = 2022-02-09T16:00:00Z
draft = false
legacy_anchor = 'dialup-values-for-connection_type-and-user_type-deprecated'
+++

We have deprecated the dialup values for `connection_type` and `user_type` in
our GeoIP2 products and services:

- GeoIP2 Connection Type database
  - `connection_type` no longer has the possible value of `Dialup`
- GeoIP2 Enterprise database
  - `connection_type` no longer has the possible value of `Dialup`
  - `user_type` no longer has the possible value of `dialup`
- GeoIP2 Insights web service
  - `user_type` no longer has the possible value of `dialup`

You can see a list of possible values for the `connection_type` data point in
our
[documentation for the GeoIP2 Connection Type database](/geoip/docs/databases/connection-type#blocks-files).

You can see a list of possible values for the `user_type` data point
[in the API schema for our GeoIP2 web services](/geoip/docs/web-services/responses#schema--response--traits__user_type).
