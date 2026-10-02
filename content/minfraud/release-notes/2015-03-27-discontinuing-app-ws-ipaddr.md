+++
title = 'Discontinuing /app/ws_ipaddr'
date = 2015-03-27T16:00:00Z
draft = false
legacy_anchor = 'discontinuing-appws_ipaddr'
+++

On April 28, we will deactivate the `/app/ws_ipaddr` endpoint. This endpoint
returns a list of IP addresses for use when making minFraud or GeoIP web service
requests to MaxMind servers.

If you use this endpoint, you need to take action in order to continue accessing
MaxMind services. Please switch and make requests using the minfraud.maxmind.com
hostname for minFraud webservice requests and geoip.maxmind.com for GeoIP
webservice requests.

If you use a minFraud client API we provided, please update to the latest API,
available on
[the client APIs page](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis).
Our newest API versions use hostnames instead of /app/ws_ipaddr.

If you use a third-party plugin that makes requests to MaxMind web services, you
may need to update it.
