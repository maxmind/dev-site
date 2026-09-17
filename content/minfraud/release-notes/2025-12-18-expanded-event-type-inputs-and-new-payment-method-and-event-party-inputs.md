+++
title = 'Expanded event type inputs, and new payment method and event party inputs'
date = 2025-12-18T15:00:00Z
draft = false
legacy_anchor = 'expanded-event-type-inputs-and-new-payment-method-and-event-party-inputs'
[build]
  list = 'never'
+++

We have released additional inputs and possible input values for all minFraud
web service customers.

| new input        | description                                                                                                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payment/method` | The payment method associated with the transaction. [View possible values on our developer portal.](/minfraud/api-documentation/requests/#schema--request--payment__method)                                                                                                                                   |
| `event/party`    | The party submitting the transaction. Either `agent` or `customer`. This input can help reduce false positive potential in cases where an agent is submitting transactions on behalf of customers. [Learn more on our developer portal.](/minfraud/api-documentation/requests/#schema--request--event__party) |

`event/type` now supports the additional values below.
[View the full list of possible values for `event/type` on our developer portal.](/minfraud/api-documentation/requests/#schema--request--event__type)

| additional input     | description                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `credit_application` | The transactor is attempting to submit an application for credit.                                                               |
| `fund_transfer`      | The transactor is attempting to transfer funds from one account to another.                                                     |
| `sim_swap`           | For mobile network operators. A new SIM card or eSIM is being issued to activate service on a customer’s existing phone number. |

Passing the additional inputs above can help us improve our risk scoring
accuracy for you by increasing the context available to our machine learning
models and heuristics.

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support these inputs so you may need to refresh yours to
submit them in your minFraud requests if you are not interfacing directly with
our REST API.
