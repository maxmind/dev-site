+++
title = 'Dispositions API now pages with a cursor'
date = 2026-10-16T19:09:15Z
draft = false
+++

The [Dispositions API](/minfraud/working-with-transaction-dispositions/) now
takes a `cursor` parameter and returns a `next_cursor` value. Send
`updates_after` on your first request, then send each response's `next_cursor`
as `cursor`. A response to a `cursor` request holds at most 1000 updated
transactions, even when many updates share one timestamp.

If you page by sending `last_update_timestamp` as `updates_after`, your requests
keep working. These changes apply to all requests:

- The response has a new `next_cursor` key.
- MaxMind returns an update one minute or more after it happens.
- When `updates` is empty in a response to `updates_after`,
  `last_update_timestamp` is the time of your `updates_after` value, not the
  current time.

[See the Dispositions API documentation](/minfraud/working-with-transaction-dispositions/#body-successful)
for details.
