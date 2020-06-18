import PropTypes from 'prop-types';
import React from 'react';

import useIsClient from '../hooks/useIsClient';
import { Store } from '../store';
import styles from './CodeSet.module.scss';

// This defines both the human-readable version of the language class, and the
// render order of the button selector.
// If the language is not found in the Map, it is rendered first.
// If multiple languages are not found in the Map, they are all rendered first
// in order of appearance.
const languageMap = new Map([
  [
    'language-c',
    'C',
  ],
  [
    'language-java',
    'Java',
  ],
  [
    'language-javascript',
    'JS',
  ],
  [
    'language-json',
    'JSON',
  ],
  [
    'language-php',
    'PHP',
  ],
  [
    'language-python',
    'Python',
  ],
  [
    'language-ruby',
    'Ruby',
  ],
  [
    'language-sharp',
    '.NET',
  ],
  [
    'language-typescript',
    'TypeScript',
  ],
]);

const languageArray = [
  ...languageMap.entries(),
];

const getHumanReadable = (className: string): string  => {
  return languageMap.get(className) || className.replace('language-', '');
};

const CodeSet: React.FC = (props) => {
  const { isClient, key } = useIsClient();
  const { dispatch, context } = React.useContext(Store);
  const [
    activeLanguage,
    saveActiveLanguage,
  ] = React.useState(context.selectedLanguage);

  const orderedChildren = React.Children.toArray(props.children).sort((a,b) => {
    if (React.isValidElement(a) && React.isValidElement(b)) {
      const indexA = languageArray
        .findIndex(element => element[0] === a.props.children.props.className);
      const indexB = languageArray
        .findIndex(element => element[0] === b.props.children.props.className);

      if (indexA - indexB > 0) {
        return 1;
      }

      if (indexA - indexB < 0) {
        return -1;
      }
    }

    return -1;
  });

  const languages = React.Children.map(orderedChildren, child => {
    if (React.isValidElement(child)) {
      return child.props.children.props.className;
    }
  });


  // If the codeset contains the context language, display it.
  // Otherwise, don't change what is being displayed.
  // Default to displaying the first language in orderedChildren.
  React.useEffect(() => {
    if (languages) {
      if (languages.includes(context.selectedLanguage) &&
        context.selectedLanguage !== activeLanguage) {
        saveActiveLanguage(context.selectedLanguage);
      }

      if (languages.includes(activeLanguage)) {
        return;
      }

      // default to the first child
      saveActiveLanguage(languages[0]);
    }
  }, [
    languages,
    context.selectedLanguage,
    activeLanguage,
  ]);

  if ( !isClient ) return null;
  return (
    <div
      className={styles.wrapper}
      key={key}
    >
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
                >
                  {getHumanReadable(className)}
                </button>
              );
            }
          })
        }
      </nav>
      {
        React.Children.map(orderedChildren, child => {
          if (React.isValidElement(child)) {
            if (child.props.children.props.className ===
              activeLanguage) {
              return child;
            }
          }
        })
      }
    </div>
  );
};

CodeSet.propTypes = {
  children: PropTypes.node,
};

export default CodeSet;
