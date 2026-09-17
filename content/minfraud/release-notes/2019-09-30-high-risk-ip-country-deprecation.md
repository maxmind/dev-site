+++
title = 'High risk IP country deprecation'
date = 2019-09-30T16:00:00Z
draft = false
legacy_anchor = 'high-risk-ip-country-deprecation'
[build]
  list = 'never'
+++

We've deprecated the `/ip_address/country/is_high_risk` output in
[minFraud Insights and minFraud Factors](/minfraud) (and highRiskCountry output
in [legacy minFraud services](/minfraud/minfraud-legacy)) because it provides
limited value. You can find the IP country in the `/ip_address/country/names`
output.
