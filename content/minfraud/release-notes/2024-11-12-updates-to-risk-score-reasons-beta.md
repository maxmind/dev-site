+++
title = 'Updates to Risk Score Reasons (beta)'
date = 2024-11-12T16:00:00Z
draft = false
legacy_anchor = 'updates-to-risk-score-reasons-beta'
+++

On November 13, 2024, we will release a number of updates to
[risk score reasons](https://support.maxmind.com/knowledge-base/articles/risk-score-reasons-minfraud):

- All reasons will be updated to say `[reason] raised the overall risk score` or
  `[reason] lowered the overall risk score` to more clearly indicate the effect
  of a reason.
- The `EMAIL_ADDRESS_NEW` reason code will be removed and replaced with three
  distinct and more specific codes and reasons:
  - `EMAIL_FIRST_SEEN`
  - `EMAIL_TENURE`
  - `EMAIL_TENURE_NO_ACTIVITY`
- The `CUSTOMER_ID` reason code will be renamed to `CUSTOMER_ID_ACTIVITY` to
  better fit its reason description.

Please [email product@maxmind.com](mailto:product@maxmind.com) if you have any
questions.
