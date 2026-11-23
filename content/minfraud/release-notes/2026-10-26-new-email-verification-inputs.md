+++
title = 'New email verification inputs'
date = 2026-10-26T16:00:00Z
draft = false
+++

We have released new inputs for all minFraud web service customers. They
describe the most recent verification of the email address.

| new input                           | description                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email/verification_time`           | The date and time that the end user completed the most recent verification of this email address, if known. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--email__verification_time)    |
| `email/was_verification_successful` | Whether the end user has verified that they control this email address, as of the time of the event. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--email__was_verification_successful) |
