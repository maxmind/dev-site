import PropTypes from 'prop-types';
import * as React from 'react';

import H2 from './Mdx/H2';

type Year = `${number}${number}${number}${number}`;
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '11' | '12';
type Day = '01' | '02'| '03'| '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21'
  | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31';

interface IReleaseNote {
  children: React.ReactNode;
  date: `${Year}-${Month}-${Day}`;
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
  date: function(props, propName, componentName) {
    if (
      !/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(
        // eslint-disable-next-line security/detect-object-injection
        props[propName]
      )
    )
    {
      return new Error(
        // eslint-disable-next-line security/detect-object-injection
        `Invalid date \`${props[propName]}\` supplied to ${componentName}.`
      );
    }
    return null;
  },
};

export default ReleaseNote;
