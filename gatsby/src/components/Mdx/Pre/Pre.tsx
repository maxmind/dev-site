import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaCopy, FaParagraph } from 'react-icons/fa';

import useIsClient from '../../../hooks/useIsClient';
import { ILanguage,languages } from '../../../languages';
import Button from './Button';
import Code from './Code';
import Message, { State as MessageState } from './Message';
import styles from './Pre.module.scss';

export const wrapCodeExample = (
  codeExample: React.ReactElement,
  className: string | undefined,
  key: string,
): React.ReactElement => (
  <div
    className={classNames(
      className,
      styles.wrapper,
    )}
    key={key}
  >
    {codeExample}
  </div>
);

interface IPre {
  hasWrapper?: boolean;
  highlightLines?: string;
  nav?: React.ReactElement<React.HTMLProps<HTMLElement>>;
}

const Pre: React.FC<React.HTMLProps<HTMLPreElement> & IPre> = (props) => {
  const { hasWrapper = true } = props;

  const { isClient, key } = useIsClient();

  const [
    message,
    setMessage,
  ] = React.useState('');

  const [
    messageState,
    setMessageState,
  ] = React.useState('hidden' as MessageState);

  const [
    showInvisibles,
    setShowInvisibles,
  ] = React.useState(true);

  const child =
    React.Children.toArray(props.children)[0] as React.ReactElement;

  const language = languages.find(
    language => `language-${language.id}` === child.props.className
  ) || {
    id: child.props.className.replace('language-', ''),
    label: child.props.className.replace('language-', ''),
    prismSettings: languages.find(
      language => language.id === '*'
    )?.prismSettings,
  } as ILanguage;

  const updateMessage = (msg: string): void => {
    // Force re-render of message component to avoid caching of same message
    setMessage('');
    setMessage(msg);
  };

  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(child.props.children.trim())
      .then(() => updateMessage('Copied to clipboard.'));
  };

  const handleInvisiblesClick = (): void => {
    setShowInvisibles(!showInvisibles);
    updateMessage(
      `Invisible characters are ${showInvisibles ? 'hidden' : 'visible'}.`
    );
  };

  if ( !isClient ) return null;

  const codeExample = (
    <div
      className={styles.container}
    >
      <div
        className={styles.toolbar}
      >
        <div
          className={styles['toolbar__buttons']}
        >
          {navigator.clipboard && (
            <Button
              disabled={messageState !== 'hidden'}
              icon={FaCopy}
              onClick={handleCopyClick}
              title="Copy code to clipboard"
            />
          )}

          <Button
            disabled={messageState !== 'hidden'}
            icon={FaParagraph}
            onClick={handleInvisiblesClick}
            title="Toggle invisible characters"
          />
        </div>
      </div>
      <div
        className={styles.content}
      >
        <Message
          onStateUpdate={(
            state: MessageState
          ): void => setMessageState(state)}
        >
          {message}
        </Message>
        <Code
          hightlightLines={props.highlightLines}
          language={language}
          showInvisibles={showInvisibles}
        >
          {props.children}
        </Code>
      </div>
    </div>
  );

  if (hasWrapper) {
    return wrapCodeExample(
      codeExample,
      props.className,
      key
    );
  }

  return codeExample;

};

Pre.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasWrapper: PropTypes.bool,
  highlightLines: PropTypes.string,
  nav: PropTypes.any,
};

export default Pre;
