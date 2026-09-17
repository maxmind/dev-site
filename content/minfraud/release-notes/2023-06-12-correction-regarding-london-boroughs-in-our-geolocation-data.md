+++
title = 'Correction regarding London boroughs in our geolocation data'
date = 2023-06-12T16:00:00Z
draft = false
legacy_anchor = 'correction-regarding-london-boroughs-in-our-geolocation-data'
[build]
  list = 'never'
+++

On June 6,
[we announced that more networks would be mapped to London boroughs](/minfraud/release-notes/2023-06-06-more-networks-mapped-to-london-boroughs/)
beginning on Friday, June 9.

This change has been delayed. It should be present in our products and services
beginning on Friday, June 16.

In addition, for networks in the greater London area we will be returning the
name of the town for city-level name data instead of the borough. The borough
will be populated in the second level subdivision.

For example, a network that maps to the Walthamstow town will return Walthamstow
for the city_name, and Walthamstow Forest for the second level subdivision.
