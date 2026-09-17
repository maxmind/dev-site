+++
title = 'EU Country outputs added to GeoIP2 Country, City, Enterprise DBs and web service'
date = 2018-02-13T16:00:00Z
draft = false
legacy_anchor = 'eu-country-outputs-added-to-geoip2-country-city-enterprise-dbs-and-web-service'
+++

We have added additional outputs to the GeoIP2 Country, GeoIP2 City, and GeoIP2
Enterprise databases and to the GeoIP2 web services. The outputs are:

- EU Country: `/country/is_in_european_union` – Country of the location of the
  IP address in an EU member state
- EU Registered Country: `/registered_country/is_in_european_union` – Country
  registered by the ISP or organization is an EU member state

_GeoIP2 Country, GeoIP2 City, and GeoIP2 Enterprise CSV databases will have a
new column added to the location files named “is_in_european_union”. This will
be “1” if the country is in the European Union and “0” otherwise._
