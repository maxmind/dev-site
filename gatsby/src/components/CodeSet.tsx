import PropTypes from 'prop-types';
import React from 'react';

import { Store } from '../store';

const CodeSet: React.FC = (props) => {
  const { dispatch, state } = React.useContext(Store);
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
                  {className}
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
              state.selectedLanguage) {
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
