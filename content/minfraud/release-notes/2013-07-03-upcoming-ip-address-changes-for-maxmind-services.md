+++
title = 'Upcoming IP address changes for MaxMind services'
date = 2013-07-03T16:00:00Z
draft = false
legacy_anchor = 'upcoming-ip-address-changes-for-maxmind-services'
+++

In the coming weeks, we will be changing the IP addresses of our web service
servers. If you hardcode any of our IPs in your application or your firewall,
then please read the information below. If you don't hardcode our IPs, then you
can stop reading now, as this change should have no effect on you.

Summary

Currently, we use the following IPs for a variety of hostnames:

- US East: 174.36.207.186
- US West: 50.97.220.226

On Tuesday, July 16th, 2013, DNS for our US West servers will change from
50.97.220.226 to 108.168.254.117.

On Tuesday, July 30th, 2013, DNS for our US East servers will change from
174.36.207.186 to 108.168.255.243.

This will affect all of the hostnames listed below.

If you hardcode our IPs, we encourage you to add the new IPs to your firewall or
application before the switchover date. If you don't, you may experience an
interruption in service. The new IPs are live now, and though we won't change
DNS until the dates specified above, you may begin directing traffic to them now
if you wish.

If you have any questions please
[contact our support team](https://support.maxmind.com/knowledge-base).

List of affected hostnames:

- maxmind.com
- api.maxmind.com
- api-us-east.maxmind.com
- api-us-west.maxmind.com
- dev9.maxmind.com
- device.maxmind.com
- download.maxmind.com
- geoip1.maxmind.com
- geoip2.maxmind.com
- geoip3.maxmind.com
- geoip.maxmind.com
- geoip-us-east.maxmind.com
- geoip-us-west.maxmind.com
- geolite.maxmind.com
- minfraud1.maxmind.com
- minfraud2.maxmind.com
- minfraud3.maxmind.com
- minfraud.maxmind.com
- minfraud-us-east.maxmind.com
- minfraud-us-west.maxmind.com
- sitecore1.maxmind.com
- sitecore.maxmind.com
- sitecore-us-east.maxmind.com
- sitecore-us-west.maxmind.com
- update.maxmind.com
- updates.maxmind.com
- www2.maxmind.com
- `www.maxmind.com`
