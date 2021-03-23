import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';

import { Icons } from '../assets';

import * as styles from './ProductIcon.module.scss';

type SvgElement = React.FC<React.SVGProps<SVGSVGElement>>

type Icon = SvgElement | string | IconType;

interface IProductIcon {
  className?: string;
  family?: 'geoip' | 'geolite' | 'minfraud',
  svg: Icon;
}

export const isSvgString = (
  svg: Icon
): svg is string => typeof svg === 'string'
  || (svg as unknown) instanceof String;

const ProductIcon: React.FC<
  React.HTMLProps<HTMLDivElement> & IProductIcon
> = (props) => {
  const svg = props.svg;

  // eslint-disable-next-line security/detect-object-injection
  const Icon = isSvgString(svg) ? Icons[svg] : svg;

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
      <Icon
        className={styles.icon}
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
