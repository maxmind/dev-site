import PropTypes from 'prop-types';
import React from 'react';

import * as specs from '../specs';

interface IOpenApi {
  pageContext: object;
}

const OpenApi: React.FC<IOpenApi> = () => {
  return (
    <pre>
      <code>
        {JSON.stringify(specs.minFraud_2_0.getSpec(), null, 2)}
      </code>
    </pre>
  );
};

OpenApi.propTypes = {
  pageContext: PropTypes.any,
};

export default OpenApi;
