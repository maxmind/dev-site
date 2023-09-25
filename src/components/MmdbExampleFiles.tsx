import PropTypes from 'prop-types';
import * as React from 'react';

import { a as A, li as Li, p as P, ul as Ul } from './Mdx';

interface IExampleFiles {
  link: string;
  product: string;
}

const MmdbExampleFiles: React.FC<IExampleFiles> = (props) => {
  const { link, product } = props;

  return (
    <>
      <P>We maintain test MMDB files on GitHub:</P>

      <P>
        <Ul>
          <Li>
            <A
              href={link}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {product}
            </A>
          </Li>
        </Ul>

        <P>
          Alternatively, you can
          <A
            href="https://github.com/maxmind/MaxMind-DB/tree/main/test-data"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            view all of our MMDB test data on GitHub
          </A>
          .
        </P>
      </P>
    </>
  );
};

MmdbExampleFiles.propTypes = {
  product: PropTypes.string.isRequired,
};

export default MmdbExampleFiles;
