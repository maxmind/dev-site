import classNames from 'classnames';
import { graphql,useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Img.module.scss';

const Img: React.FC<React.HTMLProps<HTMLImageElement>> = (props) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Image
      alt={props.alt}
      className={classNames(props.className, styles.img)}
      fluid={data.placeholderImage.childImageSharp.fluid}
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
