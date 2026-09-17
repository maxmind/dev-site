+++
title = 'Mapping more mobile networks to a state'
date = 2021-08-31T16:00:00Z
draft = false
legacy_anchor = 'mapping-more-mobile-networks-to-a-state'
+++

We will be mapping more mobile (cellular) networks to a state (subdivision)
rather than a city for the United States and other countries. This change will
better reflect the end user location of these IP addresses across a region
instead of a specific city.

For example, many of these networks use IP addresses across a region like “New
England.” In such cases, we may map IP addresses to a state in the geographic
center of the region, and set the `accuracy_radius` and `subdivision_confidence`
values appropriately. See our
[Support Center documentation on GeoIP2 accuracy](https://support.maxmind.com/knowledge-base/articles/maxmind-geolocation-accuracy)
for more information about `accuracy_radius` values.

These changes will be implemented incrementally. Some IP addresses will reflect
this change on September 2, 2021, and additional IP addresses will be updated on
September 13, 2021.
