/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { OpenApiBuilder,
  OpenAPIObject,
  SchemaObject,
  SchemasObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';

import Layout from '../components/Layout';
import Pre from '../components/mdx/Pre';
import { Properties, Type } from '../components/Spec';
import { getRefAnchorLink,
  renderMarkdownElement } from '../components/Spec/utils';
import { ITableOfContents } from '../components/TableOfContents';
import styles from './ApiSpec.module.scss';

interface ISectionProperties {
  handleExpand: () => void;
  handleHightlightLines: (lines: string) => void;
  isExpanded?: boolean;
  name: string;
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
          && (
            <div
              className={styles['schema__description']}
            >
              {renderMarkdownElement(
                props.schema.description as unknown as string
              )}
            </div>
          )
        }

        {props.schema && (
          <Properties
            data={props.schema}
            handleHightlightLines={props.handleHightlightLines}
            schemaName={props.name}
          />
        )}
      </div>
      <button
        className={classNames(
          styles['schema__toggle-example'],
          {
            [
            styles['schema__toggle-example-btn--is-expanded']
            ]: props.isExpanded,
          }
        )}
        onClick={props.handleExpand}
      >
        {props.isExpanded ? (
          <>
            <span
              className={styles['schema__toggle-example-btn-icon']}
            >
              <FaAngleDoubleDown />
            </span>
            {' '}
            Hide
          </>
        ) : (
          <>
            <span
              className={styles['schema__toggle-example-btn-icon']}
            >
              <FaAngleDoubleDown />
            </span>
            {' '}
            Show
          </>
        )}
        {' '}
        example
      </button>
    </div>
  );
};

interface ISectionHeading {
  name: string;
  schema: SchemaObject;
}

const NameRegex = new RegExp('\\.', 'g');

const SectionHeading: React.FC<ISectionHeading> = (
  props
): React.ReactElement => {
  const id = props.name.replace(NameRegex, '_');

  return (
    <h1
      className={styles['schema__heading']}
      id={id}
    >
      <a
        className={styles['schema__heading-link']}
        href={`#${id}`}
      >
        {props.name.replace(NameRegex, ' › ')}
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
  highlightLines?: string;
  isExpanded?: boolean;
  schema: SchemaObject;
}

const SectionCodeExample: React.FC<ISectionCodeExample> = (props) => (
  <div
    className={classNames(
      {
        [styles['schema__example--is-expanded']]: props.isExpanded,
      },
      styles['schema__example']
    )}
  >
    <Pre
      className={styles['schema__example-json']}
      highlightLines={props.highlightLines}
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

interface ISection {
  name: string;
  schema: SchemaObject;
}

const Section: React.FC<ISection> = (props) => {
  const [
    isExampleExpanded,
    setIsExampleExpanded,
  ] = React.useState(false);

  const [
    highlightedLines,
    setHighlightedLines,
  ] = React.useState<string>();

  const handleHightlightLines = (
    lines: string
  ): void => setHighlightedLines(lines as string);

  const handleExpand = (): void => setIsExampleExpanded(!isExampleExpanded);

  return (
    <article
      className={styles.schema}
    >
      <SectionHeading
        name={props.name}
        schema={props.schema}
      />
      <SectionProperties
        handleExpand={handleExpand}
        handleHightlightLines={handleHightlightLines}
        isExpanded={isExampleExpanded}
        name={props.name}
        schema={props.schema}
      />
      <SectionCodeExample
        highlightLines={highlightedLines}
        isExpanded={isExampleExpanded}
        schema={props.schema}
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
      {sections.map((section: ISection, index: number) => (
        <Section
          key={`section-${index}`}
          name={section.name}
          schema={section.schema}
        />
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
