+++
title = 'Changes to ASN Organization Data'
date = 2020-01-21T16:00:00Z
draft = false
legacy_anchor = 'changes-to-asn-organization-data'
+++

Effective January 21, 2020, many records for the
`autonomous_system_organization` data field in GeoIP2 databases and web services
will change from full ISP names to abbreviated codes, due to changes in a
third-party data feed that contributes to building this data. We recommend using
the `isp` and `organization` data fields as they should be more stable over time
and reflect the full ISP brand name.
