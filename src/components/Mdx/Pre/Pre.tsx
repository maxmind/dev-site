import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaCheck, FaCopy } from 'react-icons/fa';

import useIsClient from '../../../hooks/useIsClient';
import { ILanguage,languages } from '../../../languages';
import Button from './Button';
import Code from './Code';
import Wrapper from './Wrapper';

import * as styles from './Pre.module.scss';

interface IPre {
  className?: string;
  hasWrapper?: boolean;
  highlightLines?: string;
  showLineNumbers?: boolean;
  tabs?: React.ReactElement<React.HTMLProps<HTMLElement>>;
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
    tabs,
    ...rest
  } = props;

  const { isClient, key } = useIsClient();

  const [
    isCopying,
    setIsCopying,
  ] = React.useState(false);

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

  const handleCopyClick = (): void => {
    setIsCopying(true);
    navigator.clipboard.writeText(child.props.children.trim())
      .then(() => {
        setTimeout(() => {
          setIsCopying(false);
        }, 3000);
      });
  };

  if ( !isClient ) return null;

  const codeExample = (
    <div
      className={classNames(styles.container, props.hidden && styles.hidden)}
    >
      <div
        className={styles.toolbar}
      >
        <div>
          {tabs}
        </div>
        <div
          className={styles['toolbar__buttons']}
        >
          {navigator.clipboard && (
            <Button
              className={classNames(
                styles.copyBtn,
                {
                  [styles.copyBtn__isCopying]: isCopying,
                }
              )}
              disabled={isCopying}
              onClick={handleCopyClick}
              title="Copy code to clipboard"
            >
              <span
                className={styles.copyBtn__content}
              >
                <FaCopy />
                {' '}
                Copy
              </span>
              <span
                className={styles.copyBtn__checkedContent}
              >
                <FaCheck />
              </span>
            </Button>
          )}
        </div>
      </div>
      <div
        className={styles.content}
      >
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
  showLineNumbers: PropTypes.bool,
  tabs: PropTypes.any,
};

export default Pre;
