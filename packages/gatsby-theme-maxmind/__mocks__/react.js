/**
 * See - https://github.com/enzymejs/enzyme/issues/2073#issuecomment-811792551
 */
const React = require('react');

module.exports = {
  ...React,
  useState: (...args) => {
    const { act } = require('react-dom/test-utils');
    const [
      state,
      setState,
    ] = React.useState(...args);
    const actSetState = (...newStateArgs) => {
      act(() => setState(...newStateArgs));
    };
    return [
      state,
      actSetState,
    ];
  },
};
