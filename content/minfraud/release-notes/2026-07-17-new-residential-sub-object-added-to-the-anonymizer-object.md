+++
title = 'New residential sub-object added to the anonymizer object'
date = 2026-07-17T16:00:00Z
draft = false
legacy_anchor = 'new-residential-sub-object-added-to-the-anonymizer-object'
+++

We have added a `residential` sub-object to the
[`anonymizer` object](/geoip/docs/web-services/responses/#anonymizer) returned
in the `ip_address` object for minFraud Insights and Factors, providing data
about residential proxy networks:

| new data                                   | description                                                                                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `anonymizer/residential/confidence`        | A score ranging from 1 to 99 that represents our percent confidence that the network is an actively used residential proxy.         |
| `anonymizer/residential/network_last_seen` | The last day that the network was sighted in our analysis of residential proxies. This is in the ISO 8601 date format (YYYY-MM-DD). |
| `anonymizer/residential/provider_name`     | The name of the residential proxy provider associated with the network.                                                             |

The `residential` object may be present even when none of the other `anonymizer`
fields are populated.

This change will be reflected in the following products and services:

- minFraud Insights
- minFraud Factors
- GeoIP Insights web service
