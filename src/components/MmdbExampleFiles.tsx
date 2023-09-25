import PropTypes from 'prop-types';
import * as React from 'react';

import { a as A, li as Li, p as P, ul as Ul } from './Mdx';

interface IExampleFiles {
  files: {
    filename: string;
    link: string;
  }[]
}

const MmdbExampleFiles: React.FC<IExampleFiles> = (props) => {
  const { files } = props;
  const fileItems = files.map((file) => (
    <Li
      key={file.filename}
    >
      <A
        href={file.link}
      >
        {file.filename}
      </A>
    </Li>
  ));

  return (
    <>
      <P>We maintain test MMDB files on GitHub:</P>

      <P>
        <Ul>
          {fileItems}
        </Ul>
      </P>

      <P>
        Alternatively, you can
        {' '}
        <A
          href="https://github.com/maxmind/MaxMind-DB/tree/main/test-data"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          view all of our MMDB test data on GitHub
        </A>
        .
      </P>
    </>
  );
};

MmdbExampleFiles.propTypes = {
  files: PropTypes.array.isRequired,
};

export default MmdbExampleFiles;
