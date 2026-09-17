+++
title = 'Upcoming changes to our TLS certificates may impact customers with unusual server configuration'
date = 2024-04-08T15:00:00Z
draft = false
legacy_anchor = 'upcoming-changes-to-our-tls-certificates-may-impact-customers-with-unusual-server-configuration'
[build]
  list = 'never'
+++

Starting in May, Let's Encrypt will no longer use a cross-signed root
certificate, and the primary TLS certificate handling the `*.maxmind.com`
domains will be impacted by this change.

**Most customers will see no impact from this change.**

This change should only be of concern if the servers interacting with MaxMind
domains are running a very old or out of date operating system, or if you manage
your own local Certificate Authority store.

- [Read more about these changes on the Cloudflare blog.](https://blog.cloudflare.com/upcoming-lets-encrypt-certificate-chain-change-and-impact-for-cloudflare-customers/)
- [Get information about compatibility from Let's Encrypt.](https://letsencrypt.org/docs/certificate-compatibility/)
