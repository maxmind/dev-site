import PropTypes from 'prop-types';
import * as React from 'react';

import { a as A, li as Li, p as P, ul as Ul } from './Mdx';

interface IExampleFiles {
  files: {
    filename: string;
    link: string;
  }[]
}

const CsvExampleFiles: React.FC<IExampleFiles> = (props) => {
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
      <P>
        We maintain examples of the CSV files as they would be downloaded from
        the account portal:
      </P>

      <P>
        <Ul>
          {fileItems}
        </Ul>
      </P>
    </>
  );
};

CsvExampleFiles.propTypes = {
  files: PropTypes.array.isRequired,
};

export default CsvExampleFiles;
