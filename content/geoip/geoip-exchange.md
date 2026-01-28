---
draft: false
title: GeoIP Exchange documentation
---

## Overview

GeoIP Exchange is a platform for network operators to receive automated feedback
about how MaxMind codes their networks. To learn more and join, please
[sign up on our website](https://www.maxmind.com/en/geoip-exchange).

## Download GeoIP Exchange geofeed report

If you are a current GeoIP Exchange user, you can automate downloads of the
GeoIP Exchange geofeed report. In order to download the report from a script or
program, please use the permalinks found on the GeoIP Exchange page on your
account portal.

Please note that you will be redirected from these permalinks to the hostname
`storage.googleapis.com`.

### Download best practices

At a high level, the best practice is to write an automated script that
periodically checks the `last-modified` header for the report's build date, and
downloads the resulting report when the `last-modified` time is later than the
`last-modified` time of the latest local copy of the report.

It is good to check periodically throughout the day for a new report so that you
do not rely on an update schedule, and so that you catch off-schedule reports.

### Checking for the latest release date

You can check the date of the GeoIP Exchange geofeed report's latest release by
issuing a HEAD request for that report's download permalink URL. The download
permalink can be found in the GeoIP Exchange section of your account portal.

The basic steps are:

1. In the “Report links” row for the geofeed, click “Get Permalinks”.
2. Copy the permalink provided in the modal window.
3. Provide your
   [account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id)
   and
   [your license key](https://www.maxmind.com/en/accounts/current/license-key)
   using
   [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
   to authenticate.
4. If you are using `wget` or `curl` from a shell script, please be sure to
   quote the URL.

For example, you can issue a `curl` command like the following:

```bash
curl -I -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY \
'https://download.maxmind.com/geofeed/reports/v1.0/YOUR_GEOFEED_ID/YOUR_REPORT_ID'
```

Or a `wget` command like the following:

```bash
wget -S \
--method HEAD \
--user=YOUR_ACCOUNT_ID \
--password=YOUR_LICENSE_KEY \
'https://download.maxmind.com/geofeed/reports/v1.0/YOUR_GEOFEED_ID/YOUR_REPORT_ID'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/knowledge-base/articles/using-maxmind-license-keys).
Please note that the permalink copied from your account portal will replace
`YOUR_GEOFEED_ID` with a unique ID for your geofeed and `YOUR_REPORT_ID` with an
identifier for the kind of report you're downloading.

In the response, you can check the `last-modified` header for the file’s build
date. These checks can be incorporated into your own script or program,
according to your needs.

### Automating downloads

The steps for automating downloads of the report are similar to the steps for
checking the latest release date. Instead of checking the file HEAD, you will
download the file.

1. In the “Report links” row for the geofeed, click “Get Permalinks”.
2. Copy the permalink provided in the modal window.
3. Provide your
   [account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id)
   and
   [your license key](https://www.maxmind.com/en/accounts/current/license-key)
   using
   [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
   to authenticate.
4. If you are using `wget` or `curl` from a shell script, please be sure to
   quote the URL.

For example, you can issue a `curl` command like the following:

```bash
curl -O -J -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY 'https://download.maxmind.com/geofeed/reports/v1.0/YOUR_GEOFEED_ID/YOUR_REPORT_ID'
```

Or a `wget` command like the following:

```bash
wget --user=YOUR_ACCOUNT_ID --password=YOUR_LICENSE_KEY 'https://download.maxmind.com/geofeed/reports/v1.0/YOUR_GEOFEED_ID/YOUR_REPORT_ID'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/knowledge-base/articles/using-maxmind-license-keys).
Please note that the permalink copied from your account portal will replace
`YOUR_GEOFEED_ID` with a unique ID for your geofeed and `YOUR_REPORT_ID` with an
identifier for the kind of report you're downloading.

This will save the report to a file called `YOUR_REPORT_ID.csv`. For example,
`https://download.maxmind.com/geofeed/reports/v1.0/YOUR_GEOFEED_ID/geolocation`
would download a file called `geolocation.csv`.
