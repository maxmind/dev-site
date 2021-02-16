import query from './query';

describe('query()', () => {
  it('called function passed as parameter', () => {
    const mockedFn = jest.fn();
    query(mockedFn);
    expect(mockedFn).toHaveBeenCalled();
  });
});
