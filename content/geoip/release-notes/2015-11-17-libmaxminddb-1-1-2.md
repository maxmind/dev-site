+++
title = 'libmaxminddb 1.1.2'
date = 2015-11-17T16:00:00Z
draft = false
legacy_anchor = 'libmaxminddb-112'
+++

MaxMind has released libmaxminddb 1.1.2, which includes a number of important
security fixes. Among these fixes is improved validation of the database
metadata. Unfortunately, MaxMind GeoIP2 and GeoLite2 databases created earlier
than January 28, 2014, had an invalid data type for the `record_size` in the
metadata. Previously these databases worked on little endian machines with
libmaxminddb but did not work on big endian machines. Due to increased safety
checks when reading the file, these databases will no longer work on any
platform. If you are using one of these databases, we recommend that you upgrade
to the latest GeoLite2 or GeoIP2 database.
