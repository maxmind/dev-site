import PropTypes from 'prop-types';
import React from 'react';

const Tbody: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({ ...props }) => (
  <tbody
    {...props}
  >
    {props.children}
  </tbody>
);

Tbody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tbody;
