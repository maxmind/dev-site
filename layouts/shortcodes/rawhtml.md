{{- /* A Markdown table costs fewer tokens than HTML. A cell is one line of
       inline content, so a table stays HTML if it has a tag that is not in
       the list below, an attribute other than a link href, an empty row, or
       rows of different lengths. Paragraphs in a cell join with <br><br>.
       The first row becomes the header. */ -}}
{{- $html := replaceRE "\n[ \t]*\n" "\n" (strings.TrimSpace .Inner) -}}
{{- range findRE `(?s)<table>.*?</table>` $html -}}
  {{- $other := replaceRE `</?(table|thead|tbody|tr|th|td|p|a|code|strong|em|b|i)\s*>|<a\s+href="[^"]*"\s*>` "" . -}}
  {{- $rows := slice -}}
  {{- $rules := slice -}}
  {{- range $i, $row := findRE `(?s)<tr>.*?</tr>` . -}}
    {{- $line := "|" -}}
    {{- $rule := "|" -}}
    {{- range findRESubmatch `(?s)<t[hd]>(.*?)</t[hd]>` $row -}}
      {{- $cell := index . 1 | transform.HTMLToMarkdown | strings.TrimSpace -}}
      {{- $cell = replaceRE `\n` " " (replaceRE `\n{2,}` "<br><br>" $cell) -}}
      {{- $line = printf "%s %s |" $line (replace $cell "|" `\|`) -}}
      {{- $rule = add $rule " --- |" -}}
    {{- end -}}
    {{- $rows = $rows | append $line -}}
    {{- if eq $i 0 }}{{ $rows = $rows | append $rule }}{{ end -}}
    {{- $rules = $rules | append $rule -}}
  {{- end -}}
  {{- if and (not (strings.Contains $other "<")) (eq (len (uniq $rules)) 1) (not (in $rules "|")) -}}
    {{- $html = replace $html . (printf "\n\n%s\n\n" (delimit $rows "\n")) -}}
  {{- end -}}
{{- end -}}
{{- $html = replaceRE `<div class="table">\s*((\|.*\n)+)\s*</div>` "\n\n$1\n" $html -}}
{{- $html -}}
