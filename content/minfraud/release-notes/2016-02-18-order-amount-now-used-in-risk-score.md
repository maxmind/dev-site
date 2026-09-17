+++
title = 'Order Amount Now Used in Risk Score'
date = 2016-02-18T16:00:00Z
draft = false
legacy_anchor = 'order-amount-now-used-in-risk-score'
[build]
  list = 'never'
+++

All minFraud services now include an updated machine learning algorithm that
takes order amount into consideration when calculating the risk score.

Merchants may want to update their rules if the rule is a combination of risk
score and order amount. For example, if a custom rule rejects transactions with
a high order amount and a risk score above 10, the merchant may want to adjust
the risk score to a higher number, as the high order amount itself may cause the
risk score to increase.

In general, orders $500 or above may have a higher risk score than before.
