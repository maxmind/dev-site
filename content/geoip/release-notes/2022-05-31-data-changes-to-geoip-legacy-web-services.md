+++
title = 'Data changes to GeoIP Legacy web services'
date = 2022-05-31T16:00:00Z
draft = false
legacy_anchor = 'data-changes-to-geoip-legacy-web-services'
+++

In line with the
[announcement on our blog from 2020](https://blog.maxmind.com/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/),
there will be several changes to the data in our GeoIP Legacy web services
beginning today. The following web services are affected:

- GeoIP Legacy City
- GeoIP Legacy City/ISP/Org
- GeoIP Legacy Insights (formerly known as Omni)

The following data changes have been made:

1. **Region codes:** The legacy web services historically returned region codes
   in the FIPS 10-4 standard (for all countries except for the US and Canada).
   Now, region codes worldwide will be returned in the ISO 3166-2 standard.
1. **Area codes:** Area code fields will now return blank.
1. **Country/Region/City names:** Country, region, and city names will now come
   from [GeoNames](https://www.geonames.org/).

For more information, read the
[full announcement on our blog from 2020](https://blog.maxmind.com/data-changes-to-geoip-legacy-and-minfraud-legacy-web-services-in-may-2022/).

Please note that
[associated changes to the minFraud Legacy web services are also being made](/minfraud/release-notes/2022-05-31-data-changes-to-minfraud-legacy-web-services/).
