+++
title = 'Increase in slightly elevated IP risk and proxy scores and remediation'
date = 2024-09-12T16:00:00Z
draft = false
legacy_anchor = 'increase-in-slightly-elevated-ip-risk-and-proxy-scores-and-remediation'
[build]
  list = 'never'
+++

On September 10, 2024 we pushed a model update to IP risk scoring that increased
a large volume of IP risk scores (also referred to as proxy score for legacy
services) at the lower end of the scale (between 0.01 and 1).

While these IP risk scores remained low (less than 1), this shifted the score
distribution and may have impacted your systems depending on your score
thresholds.

On September 12, 2024, we implemented an update that will decrease most of these
low IP risk scores again. To remediate this sort of issue in the future, we will
be increasing the sensitivity of our monitoring for scores on the lower end of
the distribution before releasing model updates.
