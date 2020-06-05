import PropTypes from 'prop-types';
import React from 'react';

import { Store } from '../store';

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
  const { dispatch, state } = React.useContext(Store);
  const languages = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return child.props.children.props.className;
    }
  });

  const activeLanguage = (): string => {
    if (languages) {
      if (languages.includes(state.selectedLanguage)) {
        return state.selectedLanguage;
      }

      return languages[0];
    }

    return '';
  };

  return (
    <div>
      <nav>
        {
          React.Children.map(props.children, child => {
            if (React.isValidElement(child)) {
              const className = child.props.children.props.className;
              return (
                <button
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
              activeLanguage()) {
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
