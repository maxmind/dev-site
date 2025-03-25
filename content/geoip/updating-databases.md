---
draft: false
title: Updating GeoIP and GeoLite Databases
---

{{< alert warning >}}
  In January 2024, we began using R2 presigned URLs for all database downloads.
  You should make sure that your HTTP client follows redirects and there are no
  proxy or firewall settings that would block requests to the host we are
  redirecting to. We will redirect requests using HTTPS on the following
  hostname:

- `mm-prod-geoip-databases.a2649acb697e2c09b632799562c076f2.r2.cloudflarestorage.com`

Existing database download links will continue to work, they will simply be
redirected.

[Read our release note for more information.](/geoip/release-notes/2024#presigned-urls-for-database-downloads)

{{</ alert >}}

There are two methods for automatically updating GeoIP2 and GeoLite binary
databases:

1. Using MaxMind's
   [GeoIP Update program](https://github.com/maxmind/geoipupdate/releases).
2. Directly downloading the database.

For clients using our binary database format, we highly recommend using GeoIP
Update, but the direct download method is available if necessary. Clients using
the CSV-format databases must use the direct download method.

## Using GeoIP Update

MaxMind provides the GeoIP Update program, which performs automatic updates for
both GeoIP2 and GeoLite2 binary databases.

MaxMind uses R2 presigned URLs for database downloads. Make sure that your
servers can make HTTPS connections to the following hostname:

- `mm-prod-geoip-databases.a2649acb697e2c09b632799562c076f2.r2.cloudflarestorage.com`

### 1. Install GeoIP Update

Install GeoIP Update. The latest release may be downloaded from
[GitHub Releases](https://github.com/maxmind/geoipupdate/releases). See
[the installation instructions](https://github.com/maxmind/geoipupdate) for more
information. GeoIP Update can also be installed via our
[Docker image](https://hub.docker.com/r/maxmindinc/geoipupdate).

If you are using an older version of GeoIP Update, you may need to upgrade to
GeoIP Update 4.x or later version. The 4.x and later versions meet our
requirement for using TLS 1.2 or greater for all requests to our servers to keep
your data secure.

Please see our [upgrade guide](/geoip/upgrading-geoip-update) for more
information on upgrading from an older version of GeoIP Update.

### 2. Obtain GeoIP.conf with Account Information

Log in to your account portal to download a partially
[pre-filled configuration file](https://www.maxmind.com/en/accounts/current/license-key/GeoIP.conf)
and save it in your configuration directory (e.g., `/usr/local/etc/`) as
`GeoIP.conf`. You will need to replace the `YOUR_LICENSE_KEY_HERE` placeholder
with an active license key associated with your MaxMind account. You can see
your license key information on
[your account License Keys page](https://www.maxmind.com/en/accounts/current/license-key).

{{< alert warning >}}
  You may also write this file by hand using the template below
  (**not  recommended**).

Note that for `geoipupdate` versions less than 2.5.0, use `UserId` instead of
`AccountID` and `ProductIds` instead of `EditionIDs`.

{{</ alert >}}

```bash
# GeoIP.conf file - used by geoipupdate program to update databases
# from http://www.maxmind.com
AccountID YOUR_ACCOUNT_ID_HERE
LicenseKey YOUR_LICENSE_KEY_HERE
EditionIDs YOUR_EDITION_IDS_HERE
```

### 3. Run GeoIP Update

Run `geoipupdate`. To fully automate this process on Linux or Unix, use a
crontab file like:

{{< geoip-crontab >}}
```bash
# top of crontab
MAILTO=your@email.com

___js-cron-placeholder___ /usr/local/bin/geoipupdate
# end of crontab
```
{{</ geoip-crontab >}}

This crontab file would run twice a week, and it would email you the results.

If you are running a firewall, `geoipupdate` requires that the DNS and HTTPS
(443) ports be open.

### Troubleshooting

If you receive an error when running GeoIP Update, you can use the verbose
option by adding the `-v` flag. This will print out each step taken as it runs.
The information provided can often help to clarify issues. Additional
instructions for GeoIP Update can be viewed when running `man geoipupdate` on
the command line.

Please note that GeoIP Update requires current access to database updates to run
properly. If your subscription needs to be renewed, updates can be purchased
while logged into
[your Account Summary page](https://www.maxmind.com/en/accounts/current/people/current).

Updating to the
[latest release of GeoIP Update](https://github.com/maxmind/geoipupdate/releases)
may be required to resolve some errors. If you are not currently using version 4
or higher of GeoIP Update and would like to learn about upgrading to the current
version of the program, read our
[guide on how to upgrade to GeoIP Update version 4.x](/geoip/upgrading-geoip-update).

Starting in 2024, MaxMind began using R2 presigned URLs for database downloads.
If your server is refusing the connection during download, make sure that your
servers can make HTTPS connections to the following hostname:

- `mm-prod-geoip-databases.a2649acb697e2c09b632799562c076f2.r2.cloudflarestorage.com`

## Directly downloading databases

This is only recommended for systems unable to use GeoIP Update or for clients
using the CSV-format databases.

### Download best practices

At a high level, the best practice is to write an automated script that
periodically checks the `last-modified` header for the database's build date,
and downloads the database when the `last-modified` time is later than the
`last-modified` time of the latest local copy of the database.

It is good to check periodically throughout the day for a release so that you do
not rely on an update schedule, and so that you catch off-schedule releases.

### Checking for the Latest Release Date

You can check the date of a given database’s latest release by issuing a HEAD
request for that database’s download permalink URL. The download permalink can
be found in the
[Download Databases](https://www.maxmind.com/en/accounts/current/geoip/downloads)
section of your account portal.

For example, using the permalink for the GeoIP2 City CSV database, you can issue
a `curl` command like the following:

```bash
curl -I -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY \
'https://download.maxmind.com/geoip/databases/GeoIP2-City-CSV/download?suffix=zip'
```

Or a `wget` command like the following:

```bash
wget -S \
--method HEAD \
--user=YOUR_ACCOUNT_ID \
--password=YOUR_LICENSE_KEY \
'https://download.maxmind.com/geoip/databases/GeoIP2-City-CSV/download?suffix=zip'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/hc/en-us/articles/4407116112539-Using-License-Keys).

In the response, you can check the `last-modified` header for the file’s build
date, or you can check the `content-disposition` header for the date that would
appear in the file name. These checks can be incorporated into your own script
or program, according to your needs.

This method only issues a HEAD request, rather than a download request, so
running this check won’t count against your
[daily database download limit](https://support.maxmind.com/hc/en-us/articles/4408216129947).

### Automating downloads

The steps for automating downloads of the databases are similar to the steps for
checking the latest release date. Instead of checking the file HEAD, you will
download the file.

In order to download the databases from a script or program, please use the
permalinks found on the
[GeoIP download page](https://www.maxmind.com/en/accounts/current/geoip/downloads).
Please note that you will be redirected from these permalinks because MaxMind
uses R2 presigned URLs for database downloads. You should make sure that your
HTTP client follows redirects and there are no proxy or firewall settings that
would block requests to the host we are redirecting to. We will redirect
requests using HTTPS on the following hostname:

- `mm-prod-geoip-databases.a2649acb697e2c09b632799562c076f2.r2.cloudflarestorage.com`

To directly download databases, follow these steps:

1. In the “Download Links” column, click “Get Permalink(s)” for the desired
   database.
2. Copy the permalink(s) provided in the modal window.
3. Provide your
   [account ID](https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID)
   and
   [your license key](https://www.maxmind.com/en/accounts/current/license-key)
   using
   [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
   to authenticate.
4. If you are using `wget` or `curl` from a shell script, please be sure to
   quote the URL.

This download will return a compressed file in gzip (for binary) or zip (for
CSV) format, which can be uncompressed using a program like
[7-Zip](https://www.7-zip.org/) or [gzip](https://www.gzip.org/).

For example, using the permalink for the GeoIP2 City CSV database, you can issue
a `curl` command like the following:

```shell
curl -O -J -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY 'https://download.maxmind.com/geoip/databases/GeoIP2-City-CSV/download?suffix=zip'
```

Or a `wget` command like the following:

```shell
wget --content-disposition --user=YOUR_ACCOUNT_ID --password=YOUR_LICENSE_KEY 'https://download.maxmind.com/geoip/databases/GeoIP2-City-CSV/download?suffix=zip'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/hc/en-us/articles/4407116112539-Using-License-Keys).

These examples will save the database to a file called
`GeoIP2-City-CSV_YYYYMMDD.zip` where YYYYMMDD is the date of the latest release.

We also maintain example zip files on the corresponding GeoIP database
documentation pages (see
[the GeoIP City example file](/geoip/docs/databases/city-and-country/#example-files)),
and
[tutorials for importing CSV databases into SQL](/geoip/importing-databases).

## Changes to file size between updates

It is expected for database files to increase or decrease in size from time to
time between releases. As we incorporate data corrections and new data sources,
we will add entries to our databases. Sometimes IP ranges are taken out of use
and removed. You should develop your integration with the expectation that
changes to the size of our databases will occur.

When we anticipate significant changes to the size of our databases, we will
notify customers by [posting a release note](/geoip/release-notes).

## Download limits

_MaxMind reserves the right to
[limit the number of downloads](https://support.maxmind.com/hc/en-us/articles/4408216129947)
made within a limited period of time._
