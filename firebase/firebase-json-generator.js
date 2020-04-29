const fs = require('fs');

const hostingConfig = {
  ignore: [
    'firebase.json',
    '**/.*',
    '**/node_modules/**',
  ],
  public: 'static-site',
  redirects: [
    {
      destination: '/',
      source: '/foo',
      type: 302,
    },
  ],
};

fs.writeFileSync(
  'firebase.json',
  JSON.stringify({
    hosting: [
      {
        ...hostingConfig,
        target: 'local',
      },
      {
        ...hostingConfig,
        target: 'production',
      },
      {
        ...hostingConfig,
        target: 'staging',
      },
    ],
  }, null, 2),
  'utf8'
);
