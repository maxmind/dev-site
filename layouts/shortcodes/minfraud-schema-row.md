{{- $key := .Get "key" -}}
{{- $type := .Get "type" -}}
{{- $score := .Get "score" -}}
{{- $insights := .Get "insights" -}}
{{- $factors := .Get "factors" -}}
{{- $hasScore := eq $score "true" -}}
{{- $hasInsights := eq $insights "true" -}}
{{- $hasFactors := eq $factors "true" -}}
<tr>
  <td>
    <code>{{ $key }}</code>
  </td>
  <td>
    {{ .Get "valueType" }}
  </td>
  <td>
    {{ .Inner | .Page.RenderString }}
    {{ with .Get "valueTypeNote" }}
      <p>
        <em>{{ . }}</em>
      </p>
    {{ end }}
    {{ if eq $type "response" }}
      <div>
        <span>{{ if $hasScore }}✓{{ else }}✗{{ end }} minFraud Score</span>
        <span>{{ if $hasInsights }}✓{{ else }}✗{{ end }} minFraud Insights</span>
        <span>{{ if $hasFactors }}✓{{ else }}✗{{ end }} minFraud Factors</span>
      </div>
    {{ end }}
  </td>
</tr>
