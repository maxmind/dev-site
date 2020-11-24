/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const reachRouter = jest.requireActual('@reach/router');

module.exports = {
  ...reachRouter,
  useLocation: jest.fn(),
};
