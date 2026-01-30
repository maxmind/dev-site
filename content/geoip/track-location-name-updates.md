---
draft: false
title: Track Location Name Updates
---

MaxMind sources most of our place names (country, subdivision, and city names)
from [GeoNames](https://www.geonames.org/). We update place names based on
changes to GeoNames usually monthly, and publish the changes to a diff report.

## Scope of changes reported

The report covers changes to English-language location names for all locations
that appear in your GeoIP database. This includes city names, country names,
country codes, and subdivision codes.

The report compares location data between consecutive GeoIP database releases
and reports three types of changes:

- **new**: A location was added to the database.
- **updated**: A location's name data changed.
- **removed**: A location was removed from the database.

While we typically update our GeoNames data monthly, a diff report is generated
for every GeoIP database release with location data. This is because the
locations appearing in your database can change between releases, even without
GeoNames updates.

## Fields in the report

The report is a CSV file with the following fields:

| Field                   | Description                                                                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`                | The type of change: `new`, `updated`, or `removed`.                                                                                                                                                                                                        |
| `geoname_id`            | The [GeoNames ID](https://www.geonames.org/) for the location.                                                                                                                                                                                             |
| `old_city_name`         | The previous city name. Empty for `new` entries.                                                                                                                                                                                                           |
| `new_city_name`         | The new city name. Empty for `removed` entries.                                                                                                                                                                                                            |
| `old_country_name`      | The previous country name. Empty for `new` entries.                                                                                                                                                                                                        |
| `new_country_name`      | The new country name. Empty for `removed` entries.                                                                                                                                                                                                         |
| `old_country_code`      | The previous ISO country code. Empty for `new` entries.                                                                                                                                                                                                    |
| `new_country_code`      | The new ISO country code. Empty for `removed` entries.                                                                                                                                                                                                     |
| `old_subdivision_codes` | The previous subdivision ISO codes. When multiple levels exist, codes are listed from broadest to most specific, separated by commas (e.g., `BC` for just a province, or `BC,VAN` for a province and a smaller region within it). Empty for `new` entries. |
| `new_subdivision_codes` | The new subdivision ISO codes, following the same format as `old_subdivision_codes`. Empty for `removed` entries.                                                                                                                                          |

## Downloading the report

You can download the report from the
[Download files](https://www.maxmind.com/en/accounts/current/geoip/downloads)
section of your account portal. The report is available alongside your database
downloads and can be downloaded automatically. To download it manually, click
the "Download Locations Diff Report" link next to the database.

### Download best practices

At a high level, the best practice is to write an automated script that
periodically checks the `last-modified` header for the report's release date,
and downloads the report when the `last-modified` time is later than the
`last-modified` time of your latest local copy.

### Checking for the latest release date

You can check the date of the report's latest release by issuing a HEAD request
for the report's download URL.

The basic steps are:

1. In the "Download Links" column, click "Get Permalink(s)".
2. Copy the database URL in the modal window.
3. Provide your
   [account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id)
   and
   [your license key](https://www.maxmind.com/en/accounts/current/license-key)
   using
   [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
   to authenticate.
4. If you are using `wget` or `curl` from a shell script, please be sure to
   quote the URL.
5. Update the URL with `suffix` and `artifact_type` as seen in the below
   examples.

For example, you can issue a `curl` command like the following:

```bash
curl -I -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY \
'https://download.maxmind.com/geoip/databases/GeoIP2-City/download?suffix=csv&artifact_type=Locations-Diff-Report'
```

Or a `wget` command like the following:

```bash
wget -S \
--method HEAD \
--user=YOUR_ACCOUNT_ID \
--password=YOUR_LICENSE_KEY \
'https://download.maxmind.com/geoip/databases/GeoIP2-City/download?suffix=csv&artifact_type=Locations-Diff-Report'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/knowledge-base/articles/using-maxmind-license-keys).

In the response, you can check the `last-modified` header for the file's release
date. These checks can be incorporated into your own script or program,
according to your needs.

### Automating downloads

The steps for automating downloads of the report are similar to the steps for
checking the latest release date. Instead of checking the file HEAD, you will
download the file.

1. In the "Download Links" column, click "Get Permalink(s)".
2. Copy the database URL in the modal window.
3. Provide your
   [account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id)
   and
   [your license key](https://www.maxmind.com/en/accounts/current/license-key)
   using
   [Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)
   to authenticate.
4. If you are using `wget` or `curl` from a shell script, please be sure to
   quote the URL.
5. Update the URL with `suffix` and `artifact_type` as seen in the below
   examples.

For example, you can issue a `curl` command like the following:

```bash
curl -O -J -L -u YOUR_ACCOUNT_ID:YOUR_LICENSE_KEY 'https://download.maxmind.com/geoip/databases/GeoIP2-City/download?suffix=csv&artifact_type=Locations-Diff-Report'
```

Or a `wget` command like the following:

```bash
wget --content-disposition --user=YOUR_ACCOUNT_ID --password=YOUR_LICENSE_KEY 'https://download.maxmind.com/geoip/databases/GeoIP2-City/download?suffix=csv&artifact_type=Locations-Diff-Report'
```

Where `YOUR_ACCOUNT_ID` is a placeholder for your account ID and
`YOUR_LICENSE_KEY` is a placeholder for your license key.
[Learn more about license keys on our knowledge base](https://support.maxmind.com/knowledge-base/articles/using-maxmind-license-keys).

This will save the report to a file like
`GeoIP2-City_Locations-Diff-Report_YYYYMMDD.csv` where YYYYMMDD is the date of
the database release.
