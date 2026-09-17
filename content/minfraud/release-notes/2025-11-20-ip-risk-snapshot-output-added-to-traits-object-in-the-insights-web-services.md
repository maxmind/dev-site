+++
title = 'IP risk snapshot output added to traits object in the Insights web services'
date = 2025-11-20T16:00:00Z
draft = false
legacy_anchor = 'ip-risk-snapshot-output-added-to-traits-object-in-the-insights-web-services'
+++

We have added the
[`ip_risk_snapshot`](/geoip/docs/web-services/responses/#schema--response--traits__ip_risk_snapshot)
to the traits object in our GeoIP Insights web service and our minFraud Insights
and Factors web services. This field contains the risk associated with the IP
address. The value ranges from 0.01 to 99. A higher score indicates a higher
risk.

The IP risk snapshot is not a replacement for the minFraud IP risk score
(`ip_address/risk`).

The IP risk snapshot is based on an analysis of historical risk on the IP
address, while the minFraud IP risk score is a responsive data field that
generates an IP risk score in real time based on the transactions you send and
activity from across the minFraud network.

minFraud customers may find the IP risk snapshot output useful to determine
whether an IP address is risky based on historical activity versus a current,
emerging issue. A lower `traits/ip_risk_snapshot` score combined with a higher
minFraud `ip_address/risk` score would mean that the IP address is becoming
risky in real time based on the traffic on your and other customers' networks. A
high score in both `ip_risk_snapshot` and minFraud IP risk score would mean that
the IP address has been risky for a longer time.

Client APIs have been updated to reflect this change.
