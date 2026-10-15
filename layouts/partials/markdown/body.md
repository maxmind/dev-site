{{- /* Page content with shortcodes rendered by their .md templates. The
       Prettier and CSpell comments exist for the source tools and mean
       nothing to a reader of the output. Remove the whole line, so the
       blocks around the comment and the indent of the next line stay as they
       are. */ -}}
{{- $body := .RenderShortcodes -}}
{{- $body = replaceRE `(?m)^[ \t]*<!-- (prettier-ignore(-start|-end)?|cspell[^>]*) -->[ \t]*\n` "" $body -}}
{{- $body | strings.TrimSpace -}}
