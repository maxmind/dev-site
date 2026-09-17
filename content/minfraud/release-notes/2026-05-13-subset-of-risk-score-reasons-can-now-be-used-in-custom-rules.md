+++
title = 'Subset of risk score reasons can now be used in custom rules'
date = 2026-05-13T15:00:00Z
draft = false
legacy_anchor = 'subset-of-risk-score-reasons-can-now-be-used-in-custom-rules'
[build]
  list = 'never'
+++

You can now integrate a selection of risk score reasons into your custom rules.
This update is available in the minFraud Score, Insights, and Factors service
tiers.

Risk score reasons are a set of data that provide you with specific and
understandable reasons for why a risk score is high or low.
[Learn more about risk score reasons](https://support.maxmind.com/knowledge-base/articles/risk-score-reasons-minfraud),
or
[learn how to create a custom rule](https://support.maxmind.com/knowledge-base/articles/create-a-custom-rule-minfraud-maxmind).

![Custom rules risk score reasons](/images/custom-rules-risk-score-reasons.png)

The current risk score reasons able to be used as part of a custom rule are:

- Email first seen
- Email local part
- Email velocity
- Email domain new
- IP email velocity
- Intracountry distance
- Org distance risk
- IIN/shop ID velocity
- IIN on shop ID

If you would like other risk score reasons to be added, please reach out to our
Product team at [product@maxmind.com](mailto:product@maxmind.com).
