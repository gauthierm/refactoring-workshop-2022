import { getMembers } from './getMembers';

describe('getMembers()', () => {
  test('gets an empty list of members from empty list of data', () => {
    expect(getMembers([])).toEqual([]);
  });
  test('excludes bots', () => {
    expect(
      getMembers([
        {
          type: 'Bot',
          login: 'dependabot',
        },
      ])
    ).toHaveLength(0);
  });
  test('includes users', () => {
    expect(
      getMembers([
        {
          type: 'User',
          login: 'gauthierm',
        },
      ])
    ).toHaveLength(1);
  });
  test('contains logins', () => {
    expect(
      getMembers([
        {
          type: 'User',
          login: 'gauthierm',
        },
      ])
    ).toEqual(['gauthierm']);
  });
});
