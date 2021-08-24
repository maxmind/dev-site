import classNames from 'classnames';
import debounce from 'lodash.debounce';
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
  select?: React.ReactElement<React.HTMLProps<HTMLElement>>;
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
    select,
    showLineNumbers,
    tabs,
    ...rest
  } = props;

  const { isClient, key } = useIsClient();

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

  /* ---------- */

  const [
    isCopying,
    setIsCopying,
  ] = React.useState(false);

  const handleCopyClick = (): void => {
    setIsCopying(true);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(child.props.children.trim())
        .then(() => {
          setTimeout(() => {
            setIsCopying(false);
          }, 3000);
        });
    }
  };

  /* ---------- */

  const [
    cachedTabsWidth,
    cacheTabsWidth,
  ] = React.useState(0);

  const [
    languageUIType,
    setLanguageUIType,
  ] = React.useState<'select' | 'tabs'>('tabs');

  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const tabsRef = React.useRef<HTMLSpanElement>(null);

  const handleWindowResize = React.useCallback(() => {
    const tabsWidth = cachedTabsWidth || tabsRef.current?.offsetWidth || 0;

    if (!cachedTabsWidth && tabsRef.current?.offsetWidth) {
      cacheTabsWidth(tabsRef.current.offsetWidth);
    }

    if (!toolbarRef.current?.offsetWidth) {
      return;
    }

    const toolbarWidth = toolbarRef.current.offsetWidth;

    if (toolbarWidth - tabsWidth < 200 ) {
      setLanguageUIType('select');
    } else {
      setLanguageUIType('tabs');
    }
  }, [
    cachedTabsWidth,
  ]);

  const debouncedHandleWindowResize = React.useMemo(
    () => debounce(handleWindowResize, 300),
    [
      handleWindowResize,
    ]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => {
    if (tabsRef.current?.offsetWidth) {
      cacheTabsWidth(tabsRef.current.offsetWidth);
    }

    window.addEventListener('resize', debouncedHandleWindowResize);
    handleWindowResize();

    return () => window.removeEventListener(
      'resize',
      debouncedHandleWindowResize
    );
  });

  if ( !isClient ) return null;

  const codeExample = (
    <div
      className={classNames(styles.container, props.hidden && styles.hidden)}
    >
      <div
        className={styles.toolbar}
        ref={toolbarRef}
      >
        <div>
          {languageUIType === 'tabs' ? (
            <span
              ref={tabsRef}
            >
              {tabs}
            </span>
          ) : select}
        </div>
        <div
          className={styles['toolbar__buttons']}
        >
          {Object.prototype.hasOwnProperty.call(navigator, 'clipboard') && (
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


Pre.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasWrapper: PropTypes.bool,
  highlightLines: PropTypes.string,
  select: PropTypes.any,
  showLineNumbers: PropTypes.bool,
  tabs: PropTypes.any,
};

export default Pre;
