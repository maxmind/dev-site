+++
title = 'Significantly smaller file sizes for a number of proxy databases'
date = 2026-09-24T16:00:00Z
draft = false
legacy_anchor = 'significantly-smaller-file-sizes-for-a-number-of-proxy-databases'
+++

We have made changes to how we build and package our MMDB files to be more
efficient, which has significantly reduced file sizes. The size of CSV files
will not change.

No data has been removed from the databases. You will continue to receive the
same amount of data in a smaller package.

This is a non-breaking change.

The following databases from the GeoIP Anonymous Plus suite will be released
today, Thursday, September 24, 2026 with a smaller file size:

| Database name                              | Previous file size | Reduced file size | Approx. reduction percentage |
| ------------------------------------------ | ------------------ | ----------------- | ---------------------------- |
| GeoIP Residential Proxy database           | ~3 GB              | ~890 MB           | 70%                          |
| GeoIP Data Center Proxy database (in beta) | ~27 MB             | ~9 MB             | 65%                          |
| GeoIP Mobile Proxy database (in beta)      | ~175 MB            | ~45 MB            | 70%                          |

Please note that there is no change to the GeoIP Anonymous Plus database MMDB
today. The enhancement to that file will be applied in the near future.
