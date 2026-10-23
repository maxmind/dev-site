+++
title = 'Residential proxy confidence is lower for ISPs that share IPv4 addresses'
date = 2026-10-23T09:44:51-07:00
draft = false
+++

Some ISPs share each IPv4 address across many subscribers, for example through
carrier-grade NAT (CGNAT). On these networks, a residential proxy seen on an
address tells little about the other people who use the same address.

The GeoIP Residential Proxy data now sets the confidence to the minimum value,
1, for IPv4 networks of ISPs that we identify as sharing addresses across many
users.

On Sunday, October 11, 2026, we applied this to a small set of ISPs, including
Starlink.

On Monday, October 26, 2026, we will expand the change to about 530 more ISPs,
most of them in Latin America and Asia.

These networks stay in the data with their provider name and last-seen date.
Only the confidence changes. IPv6 networks of these ISPs are not affected,
because IPv6 addresses are not usually shared. We plan to review the list of
ISPs regularly.

### Recommendation

We generally do not recommend blocking an IP address when its residential proxy
confidence is 1. An address at this level is usually shared by many users, so
blocking it can also block legitimate users of the same ISP. Use a confidence of
1 as a weak signal together with other signals, and reserve blocking for higher
confidence values.
