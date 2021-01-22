import PropTypes from 'prop-types';
import * as React from 'react';

import H2 from './Mdx/H2';

interface IReleaseNote {
  children: React.ReactNode;
  date: string;
}

const ReleaseNote: React.FC<IReleaseNote> = (props) => {

  return (
    <>
      <H2>
        {props.date}
      </H2>
      {props.children}
    </>
  );
};

ReleaseNote.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string.isRequired,
};

export default ReleaseNote;
