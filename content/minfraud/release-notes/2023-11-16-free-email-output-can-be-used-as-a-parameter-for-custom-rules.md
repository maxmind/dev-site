+++
title = 'Free email output can be used as a parameter for custom rules'
date = 2023-11-16T16:00:00Z
draft = false
legacy_anchor = 'free-email-output-can-be-used-as-a-parameter-for-custom-rules'
[build]
  list = 'never'
+++

You can now use the `/email/is_free` output in minFraud custom rules. This
output is available for transactions submitted through minFraud Insights and
minFraud Factors when you pass the `/email/address` input as plaintext, or when
you pass an MD5 hash of the `/email/address` and the plaintext `/email/domain`
input.

Use of free email providers (e.g. Gmail, Yahoo, Outlook, etc.) by consumers is
the norm, so filtering transactions on this data point is often useful only in
business-to-business contexts where you expect transactions to be conducted
using a business email domain.

You can select the free email output as a parameter in custom rules by selecting
minFraud outputs > Is free email when defining a new condition for a custom
rule.

- [Learn more about setting custom rule conditions on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/create-a-custom-rule-minfraud-maxmind#create-custom-rule)
- [Learn more about free email detection on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/minfraud-email-risk-data#email-reputation-flagging)
- [Learn more about passing email inputs on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/passing-email-inputs-minfraud)
