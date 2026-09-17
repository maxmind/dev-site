+++
title = 'Transaction classification can now be untagged using the `clear` report tag'
date = 2026-05-13T14:00:00Z
draft = false
legacy_anchor = 'transaction-classification-can-now-be-untagged-using-the-clear-report-tag'
[build]
  list = 'never'
+++

You can now clear a transaction report tag if the initial classification was or
is now incorrect. The new `clear` tag restores a transaction to an untagged
state. This is distinct from the `not_fraud` tag which signals the transaction
is legitimate.

Reporting transactions as chargebacks, suspected fraud, spam/abuse, or false
positives helps MaxMind detect 10–50% more fraud and reduce false positives for
you.

The `clear` tag is available via the Report Transaction API, the transaction
report web form, and minFraud Interactive.

[Learn more about reporting transactions](https://support.maxmind.com/knowledge-base/articles/report-transactions-minfraud).
