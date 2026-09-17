+++
title = 'minFraud subscores are now minFraud risk factor scores'
date = 2022-01-10T16:00:00Z
draft = false
legacy_anchor = 'minfraud-subscores-are-now-minfraud-risk-factor-scores'
[build]
  list = 'never'
+++

We have renamed minFraud subscores to be "risk factor scores" to make it clearer
that the scores returned in our minFraud Factors web service are actionable risk
scores in their own right, similar to the IP risk score.
[You can learn more about all of minFraud's risk scores on our knowledge base.](https://support.maxmind.com/knowledge-base/articles/minfraud-risk-scores-maxmind)

Nothing has changed about how to use our web services, and no changes are
required to your current integration. Specifically, the JSON response for
minFraud Factors queries will continue to return risk factor scores in the
`subscores` object.
[Learn more about the subscores object.](/minfraud/api-documentation/responses#schema--response--risk-score-reasons)
