+++
title = 'New minFraud features: passing 3-D Secure outcome, custom rule label in minFraud response, “test” disposition for custom rules'
date = 2021-09-03T16:00:00Z
draft = false
legacy_anchor = 'new-minfraud-features-passing-3-d-secure-outcome-custom-rule-label-in-minfraud-response-test-disposition-for-custom-rules'
+++

We have released a couple of new features for the
[minFraud Score, Insights, and Factors service](https://www.maxmind.com/en/solutions/fraud-prevention/overview).

- A new input,
  [`/credit_card/was_3d_secure_successful`](/minfraud/api-documentation/requests#schema--request--credit-card__was_3d_secure_successful),
  which allows you to send us whether the outcome of
  [3-D Secure verification](https://en.wikipedia.org/wiki/3-D_Secure) was
  successful. This can help us improve your risk scoring.
- A new output,
  [`/disposition/rule_label`](/minfraud/api-documentation/responses#schema--response--disposition__rule_label),
  which returns the label of the custom rule that affected a transaction.
- A new value for the
  [`/disposition/action` output](/minfraud/api-documentation/responses#schema--response--disposition__action),
  “test”. This additional disposition action can be used to separate
  transactions for rules which you are interested in actively testing without
  affecting your existing workflows.

For more information, see our
[blog post](https://blog.maxmind.com/new-minfraud-features-passing-3-d-secure-outcome-custom-rule-label-in-minfraud-response-test-disposition-for-custom-rules/).

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
have been updated to support these outputs so you may need to refresh yours if
you are not interfacing directly with our REST API.
