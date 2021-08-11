import {
  OpenApiBuilder,
  OpenAPIObject,
  SchemaObject,
  SchemasObject,
} from 'openapi3-ts';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import Schema from './Schema';
import { ISchema } from './Schema/Schema';

interface IApiReference {
  pageContext: {
    description: string;
    keywords: string[];
    spec: unknown;
    // TODO - Add type for `tableOfContents`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableOfContents: any;
    title: string;
    type?: 'geoip' | 'minfraud';
  };
}

const ApiReference: React.FC<IApiReference> = (props) => {
  const {
    description,
    keywords,
    spec: specJson,
    title,
    type,
  } = props.pageContext;

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
      title={title}
      type={type}
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
  pageContext: PropTypes.exact({
    description: PropTypes.string.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    spec: PropTypes.object.isRequired,
    tableOfContents: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'geoip',
      'minfraud',
    ] as const).isRequired,
  }).isRequired,

};

export default ApiReference;
