+++
title = 'More proxy scores'
date = 2016-09-06T16:00:00Z
draft = false
legacy_anchor = 'more-proxy-scores'
[build]
  list = 'never'
+++

We will be returning more proxyScores between 0 and 1.8 and 1.8 and 3. Such
scores typically represent “medium” risk transactions which have some risk of
fraud but may be legitimate. The higher the proxyScore, the riskier the
transaction.

The proxyScore is a score from 0.00-4.00 indicating the likelihood that the
user's IP address is high risk.

This change has also been implemented for the IP Risk Score provided with
minFraud Score, minFraud Insights, and minFraud Factors. The IP Risk Score is a
score from 0.01 to 99 indicating the likelihood that the user's IP address is
high risk. We will return more positive IP Risk Scores between 0 and 45 and 45
and 75. Such scores typically represent “medium” risk transactions which have
some risk of fraud but may be legitimate. The higher the IP Risk Score, the
riskier the transaction.
