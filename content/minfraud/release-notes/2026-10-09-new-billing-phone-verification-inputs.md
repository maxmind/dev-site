+++
title = 'New billing phone verification inputs'
date = 2026-10-09T16:00:00Z
draft = false
+++

We have released new inputs for all minFraud web service customers. They
describe the most recent verification of the billing phone number.

| new input                                   | description                                                                                                                                                                                                                               |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `billing/phone_verification_method`         | The most recent method used to verify the billing phone number: `delivered_code`, `network`, or `other`. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_verification_method) |
| `billing/phone_was_verification_successful` | Whether the most recent verification of the billing phone number succeeded. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_was_verification_successful)                      |
| `billing/phone_verification_time`           | The date and time of the most recent verification of the billing phone number. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_verification_time)                             |
