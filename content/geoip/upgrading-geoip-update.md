---
draft: false
title: Upgrading GeoIP Update from v3.x to v4.0 and higher
---

{{< alert info >}}
In 2019, we released a new major version of `geoipupdate`. This document
describes how you can upgrade from versions 3.x to versions 4.x and higher.

If you are upgrading from version 4.x and higher to the latest version, please
consult the
[changelog of the latest release](https://github.com/maxmind/geoipupdate/releases)
for information.
{{</ alert >}}

## What changed

`geoipupdate` 4\.x was a rewrite of the old `geoipupdate` and started from a new
modern code base. It supports the same core functionality and config file format
as before.

The biggest change is support for additional platforms, notably Windows.

## Notable changes

There are changes you should be aware of if you’re upgrading from older
versions.

If you’re coming from `geoipupdate` 2\.x:

- We removed support for the configuration options `Protocol`,
  `SkipPeerVerification`, and `SkipHostnameVerification`. `geoipupdate` now
  always uses HTTPS and always verifies certificates. We ignore these options if
  present.
- The configuration file must have the `AccountID` (or the deprecated `UserId`)
  when downloading a paid database. Previously, when downloading the GeoIP
  Legacy Country database, you were able to only provide the `LicenseKey`. Now
  you must provide both `AccountID` and `LicenseKey`.

## Confirm your version

You can do this by running `geoipupdate -V`:

```shell
geoipupdate -V
> geoipupdate 3.1.1
```

If this says something like `geoipupdate 4.0.0` then you’re already running 4.x.

If this says something like `command not found` then you may not have
`geoipupdate` installed. Please see our
[installation guide](/geoip/updating-databases#1-install-geoip-update) for more
information.

## Find your config file

Typically this will be `/etc/GeoIP.conf` or `/usr/local/etc/GeoIP.conf`.

One way to do this is to run `geoipupdate` in verbose mode:

```shell
geoipupdate -v
> geoipupdate 3.1.1
> Opened License file /etc/GeoIP.conf
> ...
```

In this case the config file is `/etc/GeoIP.conf`.

## Install geoipupdate 4.x

Follow the instructions in our
[installation guide](/geoip/updating-databases#1-install-geoip-update) for how
to do this.

If you previously installed it via our PPA, you should be able to upgrade
through `apt`.

If you previously installed it via `make install`, you should determine where
it’s installed so you don’t end up with conflicting versions. You can run this
command to check where it is:

```shell
which geoipupdate
> /usr/bin/geoipupdate
```

In this case `geoipupdate` is installed to `/usr/bin/geoipupdate` so you’d want
to install there again.

After you’ve installed it, confirm by running `geoipupdate -V` that you’re
running 4.x.

## Test it

Run `geoipupdate` in verbose mode to verify it’s using the config file you
expect and completes without error:

```shell
geoipupdate -v
> Using config file /etc/GeoIP.conf
> ...
```

If it’s using a config file from a different spot than you expect, either move
your config to that location or pass the `-f` flag when running `geoipupdate` to
tell it where to find the config.

## Check cron

If you configured `geoipupdate` to run from cron then it is a good idea to
confirm it will continue to work. In particular you should check the command in
your cron configuration will use the config file you expect. You can run the
command from your crontab with the verbose flag (`-v`) to verify this.
