---
draft: false
title: Normalizing Email Addresses for minFraud
---

When providing an email address as an input to the minFraud services, you can
provide it either as plain text or as an MD5 hash.

If you provide the email as an MD5 hash, it’s important that you normalize it
before generating the hash. Otherwise minor, inconsequential differences could
cause minFraud to consider it a different address.

Our [client APIs](/minfraud/api-documentation/#client-apis) do this for you if
you enable sending the MD5 hash. This is the recommended way to do this.

## Normalizing email addresses

If you are not able to use our client APIs, you can normalize an email address
yourself. Below are the steps to take to do this.

1. Trim whitespace from both ends of the address.
1. Lowercase the address.
1. Find the local part of the email (before the `@`) and the domain (after the
   `@`).
1. Apply NFC normalization to the email local part.
1. Trim whitespace from the beginning of the domain.
1. If the domain ends with any number of periods, trim them off.
1. Convert international domain names (IDNs) to ASCII. For example, you can do
   this in Java using
   [java.net.IDN](https://docs.oracle.com/javase/8/docs/api/java/net/IDN.html).
1. If the domain ends with a repetition of `.com` (`.com.com`, `.com.com.com`,
   etc.), replace with a single `.com`.
1. If the domain is `gmail.com` with any leading digits, it is replaced with
   `gmail.com` (i.e., `123gmail.com` is replaced with `gmail.com`).
1. Check for typos in the TLD and correct them. For a complete list of typos we
   correct, consult the
   [normalization code in one of our client APIs](#examples) below.
1. Check for typos in the domain name and correct them. For a complete list of
   typos we correct, consult the
   [normalization code in one of our client APIs](#examples) below.
1. If the domain is `fastmail.com` or any of the
   [fastmail domains](https://www.fastmail.com/about/ourdomains/), replace the
   email local part with the subdomain (i.e., `alias@user.fastmail.com` is
   replaced with `user@fastmail.com`).
1. If the domain has an equivalent, such as `googlemail.com` to `gmail.com`,
   replace it with the equivalent. For the list of equivalent domains we use,
   consult the [normalization code in one of our client APIs](#examples) below.
1. Remove alias parts from the local part. For addresses at the `yahoo.com`
   domain, or other domains affiliated with Yahoo, this is everything after and
   including the first `-` character, if present. For addresses with all other
   domains, this is everything after and including the first `+` character, if
   present.
1. Remove periods from `gmail.com` local parts.
1. Put the local part and the domain back together to form the normalized email
   address.
1. Calculate the MD5 hash.

## Examples

You can review the code in our client APIs see how to normalize an email address
in various languages.

- [.NET (C#)](https://github.com/maxmind/minfraud-api-dotnet/blob/bdc196438d4b1f35bf88431f3b0b1a62353950fb/MaxMind.MinFraud/Request/Email.cs#L395)
- [Java](https://github.com/maxmind/minfraud-api-java/blob/98e3ad44651ee71b319cf42a21a57f2ed80925fc/src/main/java/com/maxmind/minfraud/request/Email.java#L414)
- [JavaScript](https://github.com/maxmind/minfraud-api-node/blob/3c6591930377759fcba345ec6b737c65b4952284/src/request/email.ts#L313)
- [PHP](https://github.com/maxmind/minfraud-api-php/blob/1e361918074957bf8013d744351fa9f1ae733227/src/MinFraud/Util.php#L284)
- [Python](https://github.com/maxmind/minfraud-api-python/blob/fcb5b2a372d533d1c398ffc7f8554d730722234f/src/minfraud/request.py#L375)
- [Ruby](https://github.com/maxmind/minfraud-api-ruby/blob/1a8a243060631cc55d203fac267bdb6ac64e8802/lib/minfraud/components/email.rb#L84)
