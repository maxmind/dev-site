+++
title = 'New email verification inputs'
date = 2026-10-26T16:00:00Z
draft = false
+++

We have released new inputs for all minFraud web service customers. They
describe the most recent verification of the email address.

| new input                           | description                                                                                                                                                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email/verification_time`           | The most recent date and time a verification of the email address was attempted, if known. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--email__verification_time)                   |
| `email/was_verification_successful` | Whether the most recent verification that the end user controls this email address was successful. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--email__was_verification_successful) |
