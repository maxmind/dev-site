+++
title = 'New anonymizer data added to web services'
date = 2025-11-19T16:00:00Z
draft = false
legacy_anchor = 'new-anonymizer-data-added-to-web-services'
+++

We have added an
[`anonymizer` object](/geoip/docs/web-services/responses/#anonymizer) to our web
services. This object contains the anonymizer data previously found in the
`traits` object together with new outputs.

Anonymizer data in the `traits` object is being marked as deprecated. However,
for backwards compatibility, anonymizer data in the `traits` object will
continue to be populated and the functionality remains the same. This will not
be a breaking change.

We recommend updating your integrations to use the new `anonymizer` object,
which contains data points not found in the `traits` object:

| new data                       | description                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `anonymizer/confidence`        | A score ranging from 1 to 99 that represents our percent confidence that the network is currently part of an actively used VPN service. |
| `anonymizer/network_last_seen` | The last day that the network was sighted in our analysis of anonymized networks. This is in the ISO 8601 date format (YYYY-MM-DD).     |
| `anonymizer/provider_name`     | The name of the VPN provider (e.g., `nordvpn`, `surfshark`) associated with the network.                                                |

Client APIs have been updated to reflect this change, which applies to the
following web services:

- minFraud Insights
- minFraud Factors
- GeoIP Insights
