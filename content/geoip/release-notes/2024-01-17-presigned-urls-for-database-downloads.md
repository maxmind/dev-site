+++
title = 'Presigned URLs for database downloads'
date = 2024-01-17T16:00:00Z
draft = false
legacy_anchor = 'presigned-urls-for-database-downloads'
+++

We will begin using R2 presigned URLs for all database downloads in order to
increase the security and reliability of our services. Database download links
and integration methods will not be changing.

**What do I need to do?**

MaxMind users who download databases should make sure that their HTTP client
follows redirects and there are no proxy or firewall settings that would block
requests to the host we are redirecting to. We will redirect requests using
HTTPS on the following hostname:

- `mm-prod-geoip-databases.a2649acb697e2c09b632799562c076f2.r2.cloudflarestorage.com`

**If you use a direct-download method (most CSV downloaders):**

The permalinks for downloading databases will not be changing. You will be
redirected from those permalinks to the R2 presigned URLs.

**If you use `geoipupdate` (most MMDB downloaders):**

We will be releasing a new major version that uses redirecting links. You can
test your server configuration by updating to this new major version in a
controlled environment before updating your version on production.

**If you download directly from the account portal:**

Check your firewall and browser security settings if you get errors when trying
to download.

**If you need more help:**

[Review our documentation on how to update and download databases.](/geoip/updating-databases/)
