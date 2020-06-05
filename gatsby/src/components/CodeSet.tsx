import PropTypes from 'prop-types';
import React from 'react';

import { Store } from '../store';

import styles from './CodeSet.module.scss';

const getHumanReadable = (className: string): string  => {
  const humanReadable = new Map([
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

  return humanReadable.get(className) || className.replace('language-', '');
};

const CodeSet: React.FC = (props) => {
  const { dispatch, context } = React.useContext(Store);
  const [
    activeLanguage,
    saveActiveLanguage,
  ] = React.useState(context.selectedLanguage);

  const languages = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return child.props.children.props.className;
    }
  });

  // If the codeset contains the context language, display it.
  // Otherwise, don't change what is being displayed.
  // Default to displaying the first language in the codeset.
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
  });

  return (
    <div>
      <nav>
        {
          React.Children.map(props.children, child => {
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
        React.Children.map(props.children, child => {
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
