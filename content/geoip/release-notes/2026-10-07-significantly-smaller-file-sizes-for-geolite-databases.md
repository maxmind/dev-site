+++
title = 'Significantly smaller file sizes for GeoLite databases'
date = 2026-10-07T08:44:18-07:00
draft = false
+++

We have made changes to how we build and package our MMDB files to be more
efficient, which has significantly reduced the file sizes. The size of CSV files
will not change.

No data has been removed from the databases. You will continue to receive the
same amount of data in a smaller package.

This is a non-breaking change.

The following databases will be released today, October 7, 2026 with a smaller
file size:

| Database name            | Original file size | Reduced file size | Approx. reduction percentage |
| ------------------------ | ------------------ | ----------------- | :--------------------------: |
| GeoLite ASN database     | 12 MB              | 8.5 MB            |             25 %             |
| GeoLite City database    | 62 MB              | 50 MB             |             20 %             |
| GeoLite.Country database | 8 MB               | 3 MB              |             60 %             |
