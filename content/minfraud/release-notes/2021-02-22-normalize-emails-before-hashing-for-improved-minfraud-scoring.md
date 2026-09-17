+++
title = 'Normalize Emails Before Hashing for Improved minFraud Scoring'
date = 2021-02-22T16:00:00Z
draft = false
legacy_anchor = 'normalize-emails-before-hashing-for-improved-minfraud-scoring'
[build]
  list = 'never'
+++

The client APIs for minFraud Score, Insights, and Factors now normalize emails
prior to hashing them for improved risk scoring. Email normalization ensures
that minor, inconsequential differences in the email input (i.e.,
`jadoeisonline@yahoo.com` and `jadoeisonline-12345@yahoo.com`) do not result in
minFraud treating these as different email addresses.

Our [client APIs](/minfraud/evaluate-a-transaction#links-to-maxmind-client-apis)
for minFraud Score, Insights, and Factors have been updated to support email
normalization so you may need to refresh yours in order to get automatic email
normalization. If you interface directly with our REST API or use minFraud
Legacy, we recommend that you normalize email addresses prior to hashing. Please
see our developer’s site for
[guidance on how to normalize emails](/minfraud/normalizing-email-addresses-for-minfraud).
