module.exports = {
  plugins: [
    'preset-lint-recommended',
    'preset-lint-markdown-style-guide',
    'remark-frontmatter',
    'remark-lint-emphasis-marker',
    'remark-lint-heading-increment',
    'remark-lint-no-empty-url',
    'remark-lint-rule-style',
    'remark-lint-unordered-list-marker-style',
    [
      'remark-lint-ordered-list-marker-value',
      'one',
    ],
    [
      'lint-file-extension',
      'mdx',
    ],
    [
      'lint-list-item-spacing',
      false,
    ],
    [
      'lint-first-heading-level',
      2,
    ],
    [
      'lint-maximum-heading-length',
      80,
    ],
    [
      'lint-maximum-line-length',
      80,
    ],
    [
      'lint-no-consecutive-blank-lines',
      false,
    ],
  ],
  settings: {
    fences: true,
    incrementListMarker: false,
    listItemIndent: 1,
    ruleRepetition: 3,
  },
};
