+++
title = 'New Satellite connection type'
date = 2023-08-01T16:00:00Z
draft = false
legacy_anchor = 'new-satellite-connection-type'
+++

On Tuesday August 29, 2023 we will be adding a new connection type value,
`Satellite`, which will identify satellite internet providers such as Starlink,
Viasat, and Hughes. Satellite connections typically have higher latency than
cable/DSL connections.

The `Satellite` connection type value will appear in the following databases:

- GeoIP Connection Type database
- GeoIP Enterprise database

Users of the following client APIs will need to update their API to the latest
version to avoid breaking changes with the new value:

- [Update Java API to version 4.1.0](https://central.sonatype.com/search?q=g:com.maxmind.geoip2%20%20a:geoip2&smo=true)
- [Update Node API to version 4.2.0](https://www.npmjs.com/package/@maxmind/geoip2-node)
