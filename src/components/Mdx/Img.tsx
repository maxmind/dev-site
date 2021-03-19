import classNames from 'classnames';
import { graphql,useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Img.module.scss';

const Img: React.FC<React.HTMLProps<HTMLImageElement>> = (props) => {
  const data = useStaticQuery(graphql`{
  placeholderImage: file(relativePath: {eq: "gatsby-astronaut.png"}) {
    childImageSharp {
      gatsbyImageData(width: 300, layout: CONSTRAINED)
    }
  }
}
`);

  return (
    <GatsbyImage
      alt={props.alt || ''}
      className={classNames(props.className, styles.img)}
      image={data.placeholderImage.childImageSharp.gatsbyImageData}
      title={props.title}
    />
  );
};

Img.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default Img;
