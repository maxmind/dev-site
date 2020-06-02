import PropTypes from 'prop-types';
import React from 'react';

const CodeSet: React.FC = (props) => {
  return (
    <div>
      {React.Children.count(props.children)}
      {props.children}
    </div>
  );
};

CodeSet.propTypes = {
  children: PropTypes.node,
};

export default CodeSet;
