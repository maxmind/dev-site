+++
title = 'Significantly smaller file sizes for a number of databases'
date = 2026-09-30T16:00:00Z
draft = false
legacy_anchor = 'significantly-smaller-file-sizes-for-a-number-of-databases'
+++

We have made changes to how we build and package our MMDB files to be more
efficient, which has significantly reduced file sizes. The size of CSV files
will not change.

No data has been removed from the databases. You will continue to receive the
same amount of data in a smaller package.

This is a non-breaking change.

The following databases will be released today, September 30, 2026 with a
smaller file size:

| Database name                  | Original file size | Reduced file size | Approx. reduction percentage |
| ------------------------------ | ------------------ | ----------------- | :--------------------------: |
| GeoIP Connection Type database | 15 MB              | 3.5 MB            |             75%              |
| GeoIP Domain database          | 10 MB              | 5.5 MB            |             50%              |
| GeoIP IP Risk database         | 630 MB             | 145 MB            |             75%              |
| GeoIP Static IP Score database | 16 MB              | 9 MB              |             45%              |
| GeoIP User Count database      | 1.8 GB             | 320 MB            |             80%              |
