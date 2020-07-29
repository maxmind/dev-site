import PropTypes from 'prop-types';
import React from 'react';

import useIsClient from '../hooks/useIsClient';
import { languages } from '../languages';
import { Store } from '../store';
import styles from './CodeSet.module.scss';
import Pre from './Mdx/Pre';

const getHumanReadable = (className: string): string  => languages
  .find(language => `language-${language.id}` === className)?.label
    || className.replace('language-', '');

const CodeSet: React.FC = (props) => {
  const { isClient, key } = useIsClient();
  const { dispatch, context } = React.useContext(Store);
  const [
    activeLanguage,
    saveActiveLanguage,
  ] = React.useState(context.selectedLanguage);

  const orderedChildren = React.Children.toArray(props.children).sort((a,b) => {
    if (React.isValidElement(a) && React.isValidElement(b)) {
      const indexA = languages.findIndex(element =>
        `language-${element.id}` === a.props.children.props.className
      );
      const indexB = languages.findIndex(element =>
        `language-${element.id}` === b.props.children.props.className
      );

      if (indexA - indexB > 0) {
        return 1;
      }

      if (indexA - indexB < 0) {
        return -1;
      }
    }

    return -1;
  });

  const orderedLanguages = React.Children.map(orderedChildren, child => {
    if (React.isValidElement(child)) {
      return child.props.children.props.className;
    }
  });


  // If the codeset contains the context language, display it.
  // Otherwise, don't change what is being displayed.
  // Default to displaying the first language in orderedChildren.
  React.useEffect(() => {
    if (orderedLanguages) {
      if (orderedLanguages.includes(context.selectedLanguage) &&
        context.selectedLanguage !== activeLanguage) {
        saveActiveLanguage(context.selectedLanguage);
      }

      if (orderedLanguages.includes(activeLanguage)) {
        return;
      }

      // default to the first child
      saveActiveLanguage(orderedLanguages[0]);
    }
  }, [
    orderedLanguages,
    context.selectedLanguage,
    activeLanguage,
  ]);

  const nav = (
    <nav
      className={styles.nav}
    >
      {
        React.Children.map(orderedChildren, child => {
          if (React.isValidElement(child)) {
            const className = child.props.children.props.className;
            return (
              <button
                className={`
                ${styles.button}
                ${className === activeLanguage ? styles.active : ''}
                `}
                onClick={(): void => {
                  dispatch({
                    payload: className,
                    type: 'change_language',
                  });
                }}
                title={`View ${activeLanguage} code`}
              >
                {getHumanReadable(className)}
              </button>
            );
          }
        })
      }
    </nav>
  );

  if ( !isClient ) return null;

  return (
    <div
      key={key}
    >
      {React.Children.map(orderedChildren, child => {
        if (React.isValidElement(child)) {
          if (child.props.children.props.className ===
        activeLanguage) {
            return (
              <Pre
                nav={nav}
                {...child.props}
              />
            );
          }
        }
      })}
    </div>
  );
};

CodeSet.propTypes = {
  children: PropTypes.node,
};

export default CodeSet;
