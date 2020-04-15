module.exports = {
  plugins: [
    'preset-lint-recommended',
    'preset-lint-markdown-style-guide',
    'remark-frontmatter',
    'remark-lint-heading-increment',
    'remark-lint-no-empty-url',
    [
      'remark-lint-ordered-list-marker-value',
      'one',
    ],
    [
      'remark-lint-unordered-list-marker-style',
      '*',
    ],
    [
      'remark-lint-write-good',
      [
        'warn',
        {
          whitelist: [
            'read-only',
          ],
        },
      ],
    ],
    [
      'lint-file-extension',
      'mdx',
    ],
    [
      'lint-first-heading-level',
      2,
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
    bullet: '*',
    fences: true,
    incrementListMarker: false,
    listItemIndent: 1,
    ruleRepetition: 3,
  },
};
