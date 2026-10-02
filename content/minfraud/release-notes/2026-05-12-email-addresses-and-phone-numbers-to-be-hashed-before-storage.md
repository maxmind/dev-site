+++
title = 'Email addresses and phone numbers to be hashed before storage'
date = 2026-05-12T16:00:00Z
draft = false
legacy_anchor = 'email-addresses-and-phone-numbers-to-be-hashed-before-storage'
+++

As a security improvement, MaxMind will begin hashing all email addresses and
phone numbers submitted to the minFraud service before storing them on our
servers. **No changes to your integration are required.** We will continue to
accept plaintext values in API requests, and API responses will be unaffected.

Starting July 6, 2026, minFraud Interactive will display the hashed form of
email addresses (plus the plaintext domain) and phone prefixes (the first 6-7
digits identifying country code and carrier) in place of full plaintext values,
both in your transaction list and when drilling into individual transactions.

If your team relies on viewing full email addresses or phone numbers during
manual review, you can opt in to plaintext display in minFraud Interactive by
emailing [product@maxmind.com](mailto:product@maxmind.com).

You may opt in at any time after the transition date; however, plaintext display
will apply only to transactions received after your opt-in date. Transactions
processed after July 6 but before your opt-in will remain hashed.
