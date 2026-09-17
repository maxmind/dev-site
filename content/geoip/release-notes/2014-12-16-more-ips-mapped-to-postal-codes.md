+++
title = 'More IPs mapped to postal codes'
date = 2014-12-16T16:00:00Z
draft = false
legacy_anchor = 'more-ips-mapped-to-postal-codes'
+++

As part of our ongoing work to return more data, MaxMind has increased the
number of IP addresses that map to a postal code.

An ISP may allocate an IP range over multiple postal codes. In such cases,
MaxMind cannot accurately determine the exact postal code associated with an IP
address in that range. Previously we only included a postal code if we were
confident of the resolution. Now, we include more postal codes, returning a
postal code within a 50km radius.

We are doing this as a convenience to our customers who want to use the postal
code instead of the city to link to other data.

In addition, we've added Poland and Portugal to the list of countries for which
we return postal codes. The full list of countries for which we provide postal
codes now includes the following:

Argentina, Australia, Austria, Belgium, Brazil, Bulgaria, Canada, Croatia, Czech
Republic, Denmark, Finland, France, Germany, Hungary, Iceland, India, Italy,
Malaysia, Mexico, Netherlands, New Zealand, Norway, Pakistan, Poland, Portugal,
Russia, Slovakia, South Africa, Spain, Sweden, Switzerland, Thailand, United
Kingdom, United States.
