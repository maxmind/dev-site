{{- /* The HTML page sets a random schedule with JavaScript. The Markdown
       output has no script, so the reader sets the time. */ -}}
{{ replace (strings.TrimSpace .Inner) "___js-cron-placeholder___" "<minute> <hour> * * 6,3" }}

Replace `<minute>` and `<hour>` with a random time. Then the clients do not
all update at the same time.
