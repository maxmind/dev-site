+++
title = 'Updated warning codes in minFraud Score, Insights, and Factors'
date = 2021-05-19T16:00:00Z
draft = false
legacy_anchor = 'updated-warning-codes-in-minfraud-score-insights-and-factors'
+++

We updated warning codes for [minFraud Score, Insights and Factors](/minfraud)
responses in the
[/warnings/ object](/minfraud/api-documentation/responses/#schema--response--warnings).

- We added `BILLING_REGION_NOT_FOUND` and `SHIPPING_REGION_NOT_FOUND` codes
- We updated the warning explanations for certain warning codes to include that
  distance calculations (outlined below) may be impacted when certain location
  information is missing or cannot be found
  - `/shipping_address/distance_to_ip_location`
  - `/shipping_address/distance_to_billing_address`
  - `/billing_address/distance_to_ip_location`

See our developer documentation for the
[updated codes and warnings](/minfraud/api-documentation/responses/#schema--response--warnings).
