+++
title = 'New phone verification inputs'
date = 2026-10-15T16:00:00Z
draft = false
+++

We have released new inputs for all minFraud web service customers. They
describe the most recent verification of the billing or shipping phone number.

| new input                                    | description                                                                                                                                                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `billing/phone_verification_method`          | The method used for the most recent verification attempt of the billing phone number: `network`, `delivered_code`, or `other`. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_verification_method)   |
| `billing/phone_was_verification_successful`  | Whether the most recent verification that the end user controls this billing phone number was successful. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_was_verification_successful)                |
| `billing/phone_verification_time`            | The most recent date and time a verification of the billing phone number was attempted, if known. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--billing__phone_verification_time)                                  |
| `shipping/phone_verification_method`         | The method used for the most recent verification attempt of the shipping phone number: `network`, `delivered_code`, or `other`. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--shipping__phone_verification_method) |
| `shipping/phone_was_verification_successful` | Whether the most recent verification that the end user controls this shipping phone number was successful. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--shipping__phone_was_verification_successful)              |
| `shipping/phone_verification_time`           | The most recent date and time a verification of the shipping phone number was attempted, if known. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--shipping__phone_verification_time)                                |
