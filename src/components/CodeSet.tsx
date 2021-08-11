import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useIsClient from '../hooks/useIsClient';
import { languages } from '../languages';
import { Store } from '../store';
import Pre from './Mdx/Pre';
import Button from './Mdx/Pre/Button';
import Wrapper from './Mdx/Pre/Wrapper';

const getHumanReadable = (className: string): string  => languages
  .find(language => `language-${language.id}` === className)?.label
    || className.replace('language-', '');

export const extractLanguage = (className: string): string => className
  .startsWith('language-cli-') ?
  className.replace('cli-', '').replace('_', ' ') : className;

interface ICodeSet {
  children?: React.ReactNode;
  noReorder?: boolean;
}

const CodeSet: React.FC<ICodeSet> = (props) => {
  const { isClient, key } = useIsClient();
  const { dispatch, context } = React.useContext(Store);
  const [
    activeLanguage,
    saveActiveLanguage,
  ] = React.useState(context.selectedLanguage);

  const orderedChildren = props.noReorder ?
    React.Children.toArray(props.children) :
    React.Children.toArray(props.children).sort((a,b) => {
      if (React.isValidElement(a) && React.isValidElement(b)) {
        const indexA = languages.findIndex(element =>
          `language-${element.id}` === extractLanguage(
            a.props.children.props.className
          )
        );
        const indexB = languages.findIndex(element =>
          `language-${element.id}` === extractLanguage(
            b.props.children.props.className
          )
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
      return extractLanguage(child.props.children.props.className);
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

  const tabs = React.Children.map(orderedChildren, child => {
    if (React.isValidElement(child)) {
      const className = extractLanguage(
        child.props.children.props.className
      );

      const text = getHumanReadable(extractLanguage(className));

      return (
        <Button
          isActive={className === activeLanguage}
          onClick={(): void => {
            dispatch({
              payload: className,
              type: 'change_language',
            });
          }}
          title={`Focus on ${text} tab`}
        >
          {text}
        </Button>
      );
    }
  });

  if ( !isClient ) return null;

  return (
    <Wrapper>
      {React.Children.map(orderedChildren, child => {
        if (React.isValidElement(child)) {
          const { className } = child.props.children.props;
          return (
            <Pre
              {...child.props}
              hasWrapper={false}
              hidden={extractLanguage(className) !== activeLanguage}
              key={key}
              tabs={tabs}
            />
          );
        }
      })}
    </Wrapper>
  );
};

CodeSet.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/boolean-prop-naming
  noReorder: PropTypes.bool,
};

export default CodeSet;
