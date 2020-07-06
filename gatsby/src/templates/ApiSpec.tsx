import { OpenApiBuilder,
  OpenAPIObject,
  SchemaObject,
  SchemasObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import Pre from '../components/mdx/Pre';
import Schema from '../components/Schema';
import { ITableOfContents } from '../components/TableOfContents';
import styles from './ApiSpec.module.scss';

interface IPage {
  description: string;
  keywords: string[];
  specJson: unknown;
  tableOfContents: ITableOfContents;
  title: string;
}

const ApiSpec: React.FC<IPage> = (props) => {
  const { description, keywords, specJson, tableOfContents, title } = props;

  const builder = new OpenApiBuilder(specJson as OpenAPIObject);
  const spec = builder.getSpec();

  return (
    <Layout
      description={description}
      keywords={keywords}
      tableOfContents={tableOfContents}
      title={title}
    >
      {Object
        .entries(spec.components?.schemas as SchemasObject)
        .map((schema: SchemaObject, index: number) => (
          <article
            className={styles.schema}
            key={index}
          >
            <h1
              className={styles['schema__heading']}
              id={schema[0]}
            >
              <a
                className={styles['schema__heading-link']}
                href={`#${schema[0]}`}
              >
                {schema[0]}
              </a>
            </h1>
            <div
              className={styles['schema__example']}
            >
              <Pre
                className={styles['schema__example-json']}
              >
                <code
                  className="language-json"
                >
                  {JSON.stringify({
                    foo: 'bar',
                  }, null, 2)}
                </code>
              </Pre>
            </div>
            <div
              className={styles['schema__body']}
            >
              <div
                className={styles['schema__properties']}
              >
                {schema[1] && (
                  <Schema
                    data={schema[1]}
                  />
                )}

              </div>
            </div>
          </article>
        ))
      }
    </Layout>
  );
};

ApiSpec.propTypes = {
  description: PropTypes.string.isRequired,
  keywords: PropTypes.any.isRequired,
  specJson: PropTypes.any.isRequired,
  tableOfContents: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default ApiSpec;
