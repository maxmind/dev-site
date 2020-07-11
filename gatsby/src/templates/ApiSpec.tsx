/* eslint-disable react/prop-types */
import { OpenApiBuilder,
  OpenAPIObject,
  SchemaObject,
  SchemasObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import Pre from '../components/mdx/Pre';
import { Properties, Type } from '../components/Spec';
import { getRefAnchorLink,
  renderMarkdownElement } from '../components/Spec/utils';
import { ITableOfContents } from '../components/TableOfContents';
import styles from './ApiSpec.module.scss';

interface ISectionProperties {
  schema: SchemasObject;
}

const SectionProperties: React.FC<ISectionProperties> = (
  props
): React.ReactElement => {
  return (
    <div
      className={styles['schema__body']}
    >
      <div
        className={styles['schema__properties']}
      >
        {props.schema.description
          && renderMarkdownElement(
            props.schema.description as unknown as string
          )
        }

        {props.schema && (
          <Properties
            data={props.schema}
          />
        )}
      </div>
    </div>
  );
};

interface ISectionHeading {
  name: string;
  schema: SchemaObject;
}

const SectionHeading: React.FC<ISectionHeading> = (
  props
): React.ReactElement => {
  return (
    <h1
      className={styles['schema__heading']}
      id={props.name}
    >
      <a
        className={styles['schema__heading-link']}
        href={`#${props.name}`}
      >
        {props.name}
      </a>
      {' '}

      <Type
        className={styles['schema__heading-type']}
      >
        {props.schema.type === 'array' ? (
          <>
            {props.schema.items?.$ref
              && getRefAnchorLink(props.schema.items?.$ref)
            }
            []
          </>
        ) : (
          <>
            {props.schema.type}
          </>
        )}
      </Type>
    </h1>
  );
};

interface ISectionCodeExample {
  schema: SchemaObject;
}

const SectionCodeExample: React.FC<ISectionCodeExample> = (props) => (
  <div
    className={styles['schema__example']}
  >
    <Pre
      className={styles['schema__example-json']}
    >
      <code
        className="language-json"
      >
        {JSON.stringify(props.schema['x-compiled-example'], null, 2)}
      </code>
    </Pre>
  </div>
);

interface IPage {
  description: string;
  keywords: string[];
  specJson: unknown;
  tableOfContents: ITableOfContents;
  title: string;
}

type Section = {
  name: string;
  schema: SchemaObject;
}

const renderSection = (section: Section, index: number): React.ReactElement => {
  return (
    <article
      className={styles.schema}
      key={`section-${index}`}
    >
      <SectionHeading
        name={section.name}
        schema={section.schema}
      />
      <SectionProperties
        schema={section.schema}
      />
      <SectionCodeExample
        schema={section.schema}
      />
    </article>
  );
};

const ApiSpec: React.FC<IPage> = (props) => {
  const { description, keywords, specJson, tableOfContents, title } = props;

  const builder = new OpenApiBuilder(specJson as OpenAPIObject);
  const spec = builder.getSpec();

  const sections = Object.entries(
    spec.components?.schemas as SchemasObject
  ).map((
    schema: SchemaObject
  ) => ({
    name: schema[0],
    schema: schema[1],
  }));

  return (
    <Layout
      description={description}
      keywords={keywords}
      tableOfContents={tableOfContents}
      title={title}
    >
      {sections.map((section: Section, index: number) => renderSection(
        section,
        index
      ))}
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
