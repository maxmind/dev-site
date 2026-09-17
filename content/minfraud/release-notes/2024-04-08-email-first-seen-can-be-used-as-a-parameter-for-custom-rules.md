+++
title = 'Email first seen can be used as a parameter for custom rules'
date = 2024-04-08T16:00:00Z
draft = false
legacy_anchor = 'email-first-seen-can-be-used-as-a-parameter-for-custom-rules'
+++

minFraud Insights and Factors customers can now use the
[`/email/first_seen` output](/minfraud/api-documentation/responses/#schema--response--email)
in minFraud custom rules.

The minFraud service retains a record of when an email address or email domain
was first seen on the minFraud Network. An email address that has been
conducting transactions for a long time across the minFraud Network may be more
trustworthy than a new email address created within the last 30 days.

You can select the email first seen output as a parameter in custom rules by
selecting minFraud outputs > Email first seen when defining a new condition for
a custom rule.

- [Learn more about setting custom rule conditions on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/create-a-custom-rule-minfraud-maxmind#create-custom-rule)
- [Learn more about email risk data on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/minfraud-email-risk-data)
