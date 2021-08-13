type IndentStyle =  'space' | 'tab';

interface IPrismSettings {
  cli?: {
    'data-filter-output'?: string;
    'data-host'?: string;
    'data-user'?: string;
  };
  importScript?: boolean;
  whitespace: {
    indentSize: number;
    indentStyle: 'space' | 'tab';
  };
}

export interface ILanguage {
  id: string;
  label: string;
  prismSettings: IPrismSettings;
}

export const languages: ILanguage[] = [
  {
    id: '*',
    label: '*',
    prismSettings: {
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'bash',
    label: 'Bash',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'css',
    label: 'CSS',
    prismSettings: {
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'curl',
    label: 'Curl',
    prismSettings: {
      cli: {
        'data-filter-output': '>  ',
        'data-host': 'maxmind',
        'data-user': 'docs',
      },
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'cli',
    label: 'CLI',
    prismSettings: {
      cli: {
        'data-filter-output': ' >',
      },
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'c',
    label: 'C',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'csharp',
    label: 'C#',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 4,
        indentStyle: 'tab' as IndentStyle,
      },
    },
  },
  {
    id: 'csv',
    label: 'CSV',
    prismSettings: {
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'go',
    label: 'Go',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'tab' as IndentStyle,
      },
    },
  },
  {
    id: 'java',
    label: 'Java',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'javascript',
    label: 'Node',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'json',
    label: 'JSON',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'markdown',
    label: 'Markdown',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'perl',
    label: 'Perl',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 4,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'php',
    label: 'PHP',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 4,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'python',
    label: 'Python',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 4,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'ruby',
    label: 'Ruby',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'sql',
    label: 'Sql',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    prismSettings: {
      importScript: true,
      whitespace: {
        indentSize: 2,
        indentStyle: 'space' as IndentStyle,
      },
    },
  },
];
