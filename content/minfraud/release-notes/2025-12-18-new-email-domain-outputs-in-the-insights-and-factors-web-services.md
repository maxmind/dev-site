+++
title = 'New email domain outputs in the Insights and Factors web services'
date = 2025-12-18T16:00:00Z
draft = false
legacy_anchor = 'new-email-domain-outputs-in-the-insights-and-factors-web-services'
+++

We have added new fields to the
[`email/domain` sub-object](/minfraud/api-documentation/responses/#email--domain)
in our minFraud Insights and Factors web services. This enhancement provides you
with more granular data for risk modeling and workflows, which is especially
useful in B2B account opening/onboarding use cases.

These data points will only be returned when you pass the domain or the unhashed
email address as an input to the minFraud Insights and Factors web services.
[Learn more about domain risk data on our knowledge base.](https://support.maxmind.com/knowledge-base/minfraud-domain-risk-data)

| new output                    | description                                                                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email/domain/classification` | A classification of the domain such as business or education. [Read the API specifications for domain classification on our developer portal.](/minfraud/api-documentation/responses/#schema--response--email--domain__classification)                                                      |
| `email/domain/risk`           | Contains the risk associated with the domain. [Read the API specifications for domain risk on our developer portal.](/minfraud/api-documentation/responses/#schema--response--email--domain__risk)                                                                                          |
| `email/domain/volume`         | Indicates how much activity we see on an email domain across the minFraud network, expressed in sightings per million. [Read the API specifications for domain volume on our developer portal.](/minfraud/api-documentation/responses/#schema--response--email--domain__volume)             |
| `email/domain/first_seen`     | When an email domain was first seen on the minFraud Network. [Read the API specifications for domain tenure tracking on our developer portal.](/minfraud/api-documentation/responses#schema--response--email--domain__first_seen)                                                           |
| `email/domain/visit`          | A sub-object of `email/domain` that contains information about an automated visit to the email domain such as whether a website on the domain is live. [Read the API specifications for domain visit on our developer portal.](/minfraud/api-documentation/responses/#email--domain--visit) |

[Client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to reflect this change.
