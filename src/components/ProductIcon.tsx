import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Icons } from '../assets';
import styles from './ProductIcon.module.scss';

type SvgElement = React.FC<React.SVGProps<SVGSVGElement>>

type SvgElementOrReference = SvgElement | string;

interface IProductIcon {
  className?: string;
  family?: 'geoip' | 'geolite' | 'minfraud',
  svg: SvgElementOrReference;
}

export const isSvgElement = (
  svg: SvgElementOrReference
): svg is SvgElement => typeof svg !== 'string' && !(svg instanceof String);

const ProductIcon: React.FC<
  React.HTMLProps<HTMLDivElement> & IProductIcon
> = (props) => {
  const svg = props.svg;

  let Svg;

  if (isSvgElement(svg)) {
    Svg = svg;
  } else {
    // eslint-disable-next-line security/detect-object-injection
    Svg = Icons[svg];
  }

  return (
    <div
      className={classNames(
        styles.container,
        props.className,
        {
          [styles.geoip] : props.family === 'geoip',
          [styles.geolite] : props.family === 'geolite',
          [styles.minfraud] : props.family === 'minfraud',
        }
      )}
    >
      <Svg
        className={styles.svg}
      />
    </div>
  );
};

ProductIcon.propTypes = {
  className: PropTypes.string,
  family: PropTypes.oneOf([
    'geoip',
    'geolite',
    'minfraud',
  ] as const),
  svg: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
};

export default ProductIcon;
