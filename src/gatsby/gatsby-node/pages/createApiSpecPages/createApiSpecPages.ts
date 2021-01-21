/* eslint-disable filenames/match-exported */
import { CreatePagesArgs } from 'gatsby';
import fetch from 'node-fetch';
import path from 'path';

import transformDocument from './utils/transformDocument';

interface IPage {
  description: string;
  keywords: string[];
  outputPath: string;
  sourceUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec?: any; // TODO - Add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableOfContents: any;  // TODO - Add type
  title: string;
  type?: 'minfraud' | 'geoip';
}

const pages: IPage[] = [
  {
    description: 'GeoIP API Reference',
    keywords: [],
    outputPath: 'geoip/api-reference',
    // eslint-disable-next-line max-len
    sourceUrl: 'https://maxmind.github.io/api-specs/minfraud/2.0/spec.bundled.json',
    tableOfContents: {
      items: [],
    },
    title: 'GeoIP API Reference',
    type: 'geoip',
  },
  {
    description: 'minFraud 2.0 API Reference',
    keywords: [],
    outputPath: 'minfraud/api-reference',
    // eslint-disable-next-line max-len
    sourceUrl: 'https://maxmind.github.io/api-specs/minfraud/2.0/spec.bundled.json',
    tableOfContents: {
      items: [],
    },
    title: 'minFraud 2.0 API Reference',
    type: 'minfraud',
  },
];

const createApiSpecPages = async ( props: CreatePagesArgs): Promise<void> => {
  const { createPage } = props.actions;

  await Promise.all(pages.map((page: IPage) => fetch(page.sourceUrl)
    .then(res => res.json())
    .then(json => transformDocument(json))
    .then(spec => {
      createPage({
        component: path.resolve('src/templates/ApiReference/index.ts'),
        context: {
          description: page.description,
          keywords: page.keywords,
          spec,
          tableOfContents: page.tableOfContents,
          title: page.title,
          type: page.type,
        },
        path: page.outputPath,
      });
    })
    .catch((error) => {
      throw error;
    })));
};

export default createApiSpecPages;
