+++
title = 'Mobile country and mobile network code data'
date = 2022-01-25T16:00:00Z
draft = false
legacy_anchor = 'mobile-country-and-mobile-network-code-data'
+++

We have added data containing the mobile country code and mobile network code to
several of our GeoIP2 product and services. Mobile country code and mobile
network code data uniquely identify mobile network operators (carriers). This
data can be used for carrier segmentation and targeting as well as general
analytics.
[Learn more about mobile country code data on Wikipedia.](https://en.wikipedia.org/wiki/Mobile_country_code)

This data will be included in the following GeoIP2 products and services:

- GeoIP2 ISP database
- GeoIP2 Enterprise database
- GeoIP2 City Plus web service
- GeoIP2 Insights web service
- minFraud Insights web service
- minFraud Factors web service

### Database users

The `mobile_country_code` and `mobile_network_code` data will be included in all
new releases of the GeoIP2 ISP and Enterprise databases starting with today's
release.

#### CSV file users

The new data columns will be added to the following files:

- GeoIP2 ISP database
  - `GeoIP2-ISP-Blocks-IPv4.csv`
  - `GeoIP2-ISP-Blocks-IPv6.csv`
- GeoIP2 Enterprise database
  - `GeoIP2-Enterprise-ISP.csv`

See our developer documentation for the GeoIP2
[ISP](/geoip/docs/databases/isp#blocks-files) and
[Enterprise](/geoip/docs/databases/enterprise#isp-file) databases for more
information about the files. You can also download a sample CSV database
containing the new data columns for GeoIP2
[ISP](/geoip/docs/databases/isp#example-files) and
[Enterprise](/geoip/docs/databases/enterprise#example-files) from our
developer's site.

#### MMDB file users

You may need to update your
[MMDB reader](/geoip/docs/databases#official-client-apis) to support lookups
containing the new output when it is released. You can find a sample MMDB file
with `mobile_country_code` and `mobile_network_code` on our
[GitHub page](https://github.com/maxmind/MaxMind-DB/tree/main/test-data).

### Web service users

The new data will be included in the `/traits` object:

- [`/traits/mobile_country_code`](/geoip/docs/web-services/responses#schema--response--traits__mobile_country_code)
- [`/traits/mobile_network_code`](/geoip/docs/web-services/responses#schema--response--traits__mobile_network_code)

Our client APIs will be updated in the coming weeks to handle the new data. Make
sure to keep your client API up to date to start taking advantage of this data.

If you are interfacing directly with our REST API, you can begin receiving the
new data right away.
