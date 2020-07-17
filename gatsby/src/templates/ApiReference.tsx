import { OpenApiBuilder,
  OpenAPIObject,
  SchemaObject,
  SchemasObject } from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../components/Layout';
import Schema, { ISchema } from '../components/Schema';
import { ITableOfContents } from '../components/TableOfContents';

interface IApiReference {
  description: string;
  keywords: string[];
  specJson: unknown;
  tableOfContents: ITableOfContents;
  title: string;
  type?: 'geoip' | 'minfraud';
}

const ApiReference: React.FC<IApiReference> = (props) => {
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

  const className: string | undefined = [
    'geoip',
    'minfraud',
  ].includes(props.type as string)
    ? `page-type--${props.type}`
    : undefined;

  return (
    <Layout
      className={className}
      description={description}
      keywords={keywords}
      tableOfContents={tableOfContents}
      title={title}
    >
      {sections.map((section: ISchema, index: number) => (
        <Schema
          key={`section-${index}`}
          name={section.name}
          schema={section.schema}
        />
      ))}
    </Layout>
  );
};

ApiReference.propTypes = {
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.any).isRequired,
  specJson: PropTypes.any.isRequired,
  tableOfContents: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'geoip',
    'minfraud',
  ]),
};

export default ApiReference;
