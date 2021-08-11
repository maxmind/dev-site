import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaCopy, FaParagraph } from 'react-icons/fa';

import useIsClient from '../../../hooks/useIsClient';
import { ILanguage,languages } from '../../../languages';
import Button from './Button';
import Code from './Code';
import Message, { State as MessageState } from './Message';
import Wrapper from './Wrapper';

import * as styles from './Pre.module.scss';

interface IPre {
  className?: string;
  hasWrapper?: boolean;
  highlightLines?: string;
  nav?: React.ReactElement<React.HTMLProps<HTMLElement>>;
  showLineNumbers?: boolean;
}

const extractCli = (className: string): string => className && className
  .startsWith('language-cli-') ? 'language-markdown' : className;

const Pre: React.FC<React.HTMLProps<HTMLDivElement> & IPre> = (props) => {
  const {
    children,
    className,
    hasWrapper,
    highlightLines,
    showLineNumbers,
    ...rest
  } = props;

  const { isClient, key } = useIsClient();

  const [
    message,
    setMessage,
  ] = React.useState('');

  const [
    messageState,
    setMessageState,
  ] = React.useState('hidden' as MessageState);

  let child = React.Children.toArray(children)[0] as React.ReactElement;

  const extractedClassName = extractCli(child.props.className);

  child = React.cloneElement(child, {
    className: extractedClassName,
  });

  const language = languages.find(
    language => `language-${language.id}` === extractedClassName
  ) || {
    id: extractedClassName?.replace('language-', ''),
    label: extractedClassName?.replace('language-', ''),
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

  if ( !isClient ) return null;

  const codeExample = (
    <div
      className={classNames(styles.container, props.hidden && styles.hidden)}
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
          highlightLines={highlightLines}
          language={language}
          showLineNumbers={showLineNumbers}
        >
          {child}
        </Code>
      </div>
    </div>
  );

  if (hasWrapper) {
    return (
      <Wrapper
        className={className}
        key={key}
        {...rest}
      >
        {codeExample}
      </Wrapper>
    );
  }

  return codeExample;
};

Pre.defaultProps = {
  hasWrapper: true,
};

Pre.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasWrapper: PropTypes.bool,
  highlightLines: PropTypes.string,
  nav: PropTypes.any,
  showLineNumbers: PropTypes.bool,
};

export default Pre;
