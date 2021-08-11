import PropTypes from 'prop-types';
import * as React from 'react';

import Link from './Link';

import * as styles from './LinkButton.module.scss';

interface  ILinkButton {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  text?: string;
  to: string;
}

const LinkButton: React.FC<ILinkButton> = (props) => {
  const { children, Icon, text, to } = props;
  return (
    <Link
      className={styles.link}
      to={to}
    >
      {Icon && (
        <span
          className={
            styles.icon
          }
        >
          <Icon />
        </span>
      )}
      {text || children}
    </Link>
  );
};

LinkButton.propTypes = {
  Icon: PropTypes.any,
  children: PropTypes.node,
  text: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export default LinkButton;
