+++
title = 'Significantly smaller file sizes for a number of databases'
date = 2026-10-21T09:06:01-07:00
draft = false
+++

We have made changes to how we build and package our MMDB files to be more
efficient, which has significantly reduced the file sizes. The size of CSV files
will not change.

No data has been removed from the databases. You will continue to receive the
same amount of data in a smaller package.

This is a non-breaking change.

The following databases will be released today, October 21, 2026 with a smaller
file size:

| Database name                            | Original file size | Reduced file size | Approx. reduction percentage |
| ---------------------------------------- | ------------------ | ----------------- | :--------------------------: |
| GeoIP Anonymous Plus database            | 475 MB             | 105 MB            |             75%              |
| GeoIP City Redacted US database          | 83 MB              | 65 MB             |             20%              |
| GeoIP Enterprise Redacted US database    | 255 MB             | 230 MB            |             10%              |
| GeoIP Network Optimization City database | 80 MB              | 45 MB             |             45%              |
| GeoIP Regions database                   | 160 MB             | 150 MB            |             10%              |
| GeoIP Anonymous IP database              | 2.5 MB             | 830 KB            |             65%              |
| GeoIP City Africa database               | 10 MB              | 5 MB              |             50%              |
| GeoIP City Asia Pacific database         | 25 MB              | 18 MB             |             25%              |
| GeoIP City Europe database               | 45 MB              | 36 MB             |             20%              |
| GeoIP City North America database        | 65 MB              | 55 MB             |             15%              |
| GeoIP City South America database        | 15 MB              | 8 MB              |             40%              |
| GeoIP City database                      | 120 MB             | 105 MB            |             10%              |
| GeoIP Country database                   | 8 MB               | 3 MB              |             60%              |
| GeoIP Enterprise database                | 380 MB             | 365 MB            |              5%              |
| GeoIP ISP database                       | 20 MB              | 14 MB             |             25%              |
| GeoIP Precision Enterprise database      | 1.7 GB             | 1.15 GB           |             35%              |
