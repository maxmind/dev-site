import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Message.module.scss';

export type State = 'hidden' | 'hiding' | 'visible';

interface IMessage {
  children: React.ReactNode;
  className?: string;
  onStateUpdate: (state: State) => void;
}

const Message: React.FC<IMessage> = (props) => {
  const [
    messageState,
    setMessageState,
  ] = React.useState('hidden' as State);

  React.useEffect(() => {
    if (props.children) {
      setMessageState('visible');
      setTimeout(() => {
        setMessageState('hiding');
      }, 2000);

      setTimeout(() => {
        setMessageState('hidden');
      }, 2100);
    }
  }, [
    props.children,
  ]);

  React.useEffect(() => {
    props.onStateUpdate(messageState);
  }, [
    messageState,
    props,
    props.onStateUpdate,
  ]);

  return (
    <div
      className={classNames(
        props.className,
        styles.message,
        {
          [styles['message--hidden']]: messageState === 'hidden',
          [styles['message--hiding']]: messageState === 'hiding',
          [styles['message--visible']]: messageState === 'visible',
        },
      )}
    >
      <div
        className={styles['message__content']}
      >
        {props.children}
      </div>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onStateUpdate: PropTypes.func.isRequired,
};

export default Message;
