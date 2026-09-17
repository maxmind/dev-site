+++
title = 'Deprecated Fields and New Fields'
date = 2016-06-06T16:00:00Z
draft = false
legacy_anchor = 'deprecated-fields-and-new-fields'
[build]
  list = 'never'
+++

`credits_remaining` is deprecated in the minFraud Score, minFraud Insights, and
minFraud Factors response. It will be removed before the final release. It has
been replaced with `queries_remaining`, which also returns the number of queries
available. An additional field, `funds_remaining`, containing the US dollar
value of the funds remaining will be added before the final release.
