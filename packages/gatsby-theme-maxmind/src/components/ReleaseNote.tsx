import GithubSlugger from 'github-slugger';
import PropTypes from 'prop-types';
import * as React from 'react';

import H2 from './Mdx/H2';

import * as styles from './ReleaseNote.module.scss';

type Year = `${number}${number}${number}${number}`;
type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '11' | '12';
type Day = '01' | '02'| '03'| '04' | '05' | '06' | '07' | '08' | '09' | '10'
  | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21'
  | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31';

interface IReleaseNote {
  children: React.ReactNode;
  date: `${Year}-${Month}-${Day}`;
  title: string;
}

const dateOptions = {
  day: 'numeric',
  month: 'long',
  timeZone: 'America/New_York',
  year: 'numeric',
};

const ReleaseNote: React.FC<IReleaseNote> = (props) => {
  // Assume publish time is around noon office standard time
  const date = new Date(`${props.date} 12:00:00`);
  //@ts-expect-error: Types are broken for DateTimeFormat
  const humanDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

  return (
    <article
      className={styles.article}
    >
      <H2
        className={styles.title}
        id={GithubSlugger.slug(props.title)}
      >
        {props.title}
      </H2>
      <span
        className={styles.date}
      >
        {humanDate}
      </span>
      {props.children}
    </article>
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
  title: PropTypes.string.isRequired,
};

export default ReleaseNote;
