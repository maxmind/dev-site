+++
title = 'Upcoming changes to ISP names'
date = 2024-06-27T16:00:00Z
draft = false
legacy_anchor = 'upcoming-changes-to-isp-names'
+++

We are updating several ISP names in our data. We expect to release these
changes in new database updates and web service requests beginning Friday, July
12, 2024.

There are two kinds of changes to expect.

First, we will update several popular ISP names to match their current naming
and branding conventions:

| Current ISP name in MaxMind data    | Updated ISP name in MaxMind data |
| ----------------------------------- | -------------------------------- |
| `Korea Telecom`                     | `KT`                             |
| `Telecom Italia`                    | `TIM`                            |
| `Telecom Italia Mobile`             | `TIM Mobile`                     |
| `SaudiNet`                          | `stc Saudi`                      |
| `Lg Powercomm`                      | `LG Uplus`                       |
| `Versatel Deutschland`              | `1&1 Versatel`                   |
| `Telefonica O2 UK`                  | `O2 UK`                          |
| `INDOSAT Internet Network Provider` | `Indosat`                        |
| `Telefonica del Peru`               | `Movistar Peru`                  |
| `TDC Danmark`                       | `TDC Net`                        |
| `T-mobile Polska`                   | `T-Mobile Polska`                |
| `Atlantic Broadband`                | `Breezeline`                     |
| `Vodafone New Zealand`              | `One NZ`                         |

Second, we will be updating the ISP name for a number of AT&T networks. About
1,000 (0.003%) AT&T networks in the United States will have an updated ISP name,
either `AT&T Internet` or `AT&T Wireless`.

Updated AT&T networks will have corresponding updates to their `connection_type`
value as well. For most networks, this will mean:

| Updated ISP name | Updated connection type |
| ---------------- | ----------------------- |
| `AT&T Internet`  | `Cable/DSL`             |
| `AT&T Wireless`  | `Cellular`              |

Please note that some AT&T networks may not have the corresponding connection
type, because connection type values are dependent on additional signals.

These changes will be reflected in the following products and services:

- GeoIP Insights web service
- GeoIP City Plus web service
- GeoIP ISP database
- GeoIP Connection Type database
- GeoIP Enterprise database
