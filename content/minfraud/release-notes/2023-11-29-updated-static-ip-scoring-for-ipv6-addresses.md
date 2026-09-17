+++
title = 'Updated static IP scoring for IPv6 addresses'
date = 2023-11-29T16:00:00Z
draft = false
legacy_anchor = 'updated-static-ip-scoring-for-ipv6-addresses'
+++

We are releasing a bug fix to our static IP scoring system today.

Previously we were returning higher static IP scores for cellular IPv6 addresses
when the networks were actually more dynamic.

minFraud Insights and Factors customers will see the static IP score for
cellular IPv6 addresses reduce. This should also result in improved risk scoring
for these networks for all minFraud customers.

[Learn more about static IP scores in minFraud on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/ip-trait-risk-data-minfraud#static-IP-score)
