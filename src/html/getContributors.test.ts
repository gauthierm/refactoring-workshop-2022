import { getContributors } from './getContributors';

describe('getContributors()', () => {
  test('gets an empty list of contributors from empty list of data', () => {
    expect(getContributors([])).toEqual([]);
  });
  test('excludes bots', () => {
    expect(
      getContributors([
        {
          type: 'Bot',
          login: 'dependabot',
          contributions: 0,
        },
      ])
    ).toHaveLength(0);
  });
  test('includes users', () => {
    expect(
      getContributors([
        {
          type: 'User',
          login: 'gauthierm',
          contributions: 200,
        },
      ])
    ).toHaveLength(1);
  });
  test('sets contributor properties', () => {
    const contributor = getContributors([
      {
        type: 'User',
        login: 'gauthierm',
        contributions: 200,
      },
    ]).at(0);
    expect(contributor).not.toHaveProperty('type');
    expect(contributor).toHaveProperty('login');
    expect(contributor).toHaveProperty('contributions');
    expect(contributor).toHaveProperty('majorContributor');
  });
  test('detects minor contributors', () => {
    expect(
      getContributors([
        {
          type: 'User',
          login: 'gauthierm',
          contributions: 500,
        },
      ]).at(0).majorContributor
    ).toBe(false);
  });
  test('detects major contributors', () => {
    expect(
      getContributors([
        {
          type: 'User',
          login: 'gauthierm',
          contributions: 501,
        },
      ]).at(0).majorContributor
    ).toBe(true);
  });
});
