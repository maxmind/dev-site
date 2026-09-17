+++
title = 'Removing anycast locations'
date = 2017-06-11T16:00:00Z
draft = false
legacy_anchor = 'removing-anycast-locations'
+++

We are removing the geographical location for the anycast CloudFlare network
`141.101.112.0/20`. Anycast networks can be routed to a number of different
locations all around the world, typically based on what is the nearest location.
Over the next few weeks, we may remove the geographical location for additional
anycast networks, including more CloudFlare networks as well as Google public
DNS servers `8.8.8.8` and `8.8.4.4`.
