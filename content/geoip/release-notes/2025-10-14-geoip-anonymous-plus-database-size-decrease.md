+++
title = 'GeoIP Anonymous Plus database size decrease'
date = 2025-10-14T16:00:00Z
draft = false
legacy_anchor = 'geoip-anonymous-plus-database-size-decrease'
+++

The GeoIP Anonymous Plus database has significantly decreased in size due to an
expected change to how we handle some low confidence networks.

A large number of lower confidence VPN networks have been removed from the GeoIP
Anonymous Plus database. We have removed these networks in order to prevent
false positives because we believe that the confidence was too low.
