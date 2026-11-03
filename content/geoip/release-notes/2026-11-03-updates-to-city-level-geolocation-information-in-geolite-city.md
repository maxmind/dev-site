+++
title = 'Updates to city-level geolocation information in GeoLite City'
date = 2026-11-03T10:22:26-07:00
draft = false
+++

As part of ongoing efforts to optimize GeoLite databases for performance in
lightweight environments and for testing, in today's GeoLite City release some
networks previously geolocated to Donetsk in Ukraine will be aggregated with
networks in Russia, resulting in these networks no longer having city-level
geolocation information, and returning Russia for the country.

Other similar improvements are expected to continue, and may not always be
announced.
[Read more about how and why GeoLite is less accurate than GeoIP on our blog](https://blog.maxmind.com/how-to-tell-whether-geolite-is-enough-for-your-project/).

Please also note that we recommend that compliance use cases covering conflict
regions like Ukraine and Russia use our paid GeoIP datasets for maximum
accuracy.
[Read more about using IP geolocation data for regulatory compliance on our blog](https://blog.maxmind.com/leveraging-ip-intelligence-in-your-compliance-data-stack/).
