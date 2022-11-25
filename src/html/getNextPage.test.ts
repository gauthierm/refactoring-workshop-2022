import { getNextPage } from './getNextPage';

describe('getNextPage()', () => {
  test('gets empty link when next page not parsed', () => {
    expect(getNextPage('this is a test')).toBe('');
  });

  test('parses next page link when it is only link', () => {
    expect(getNextPage('<https://www.google.com/>; rel="next"')).toBe(
      'https://www.google.com/'
    );
  });

  test('parses next page link when it is the second link', () => {
    expect(
      getNextPage(
        '<https://www.silverorange.com/>; rel="first", <https://www.google.com/>; rel="next"'
      )
    ).toBe('https://www.google.com/');
  });

  test('parses next page link when it is the first link', () => {
    expect(
      getNextPage(
        '<https://www.google.com/>; rel="next", <https://www.silverorange.com/>; rel="first"'
      )
    ).toBe('https://www.google.com/');
  });
});
