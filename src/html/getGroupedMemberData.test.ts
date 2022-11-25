import { getGroupedMemberData } from './getGroupedMemberData';

describe('getGroupedMemberData()', () => {
  const contributors = [
    {
      login: 'gauthierm',
      contributions: 200,
      majorContributor: false,
    },
    {
      login: 'clara-campos',
      contributions: 1000,
      majorContributor: true,
    },
    {
      login: 'sgarrity',
      contributions: 150,
      majorContributor: false,
    },
    {
      login: 'nburka',
      contributions: 700,
      majorContributor: true,
    },
    {
      login: 'isagrant',
      contributions: 2000,
      majorContributor: false,
    },
    {
      login: 'pparke',
      contributions: 1500,
      majorContributor: true,
    },
    {
      login: 'kendraSO',
      contributions: 800,
      majorContributor: true,
    },
    {
      login: 'keithburgoyne',
      contributions: 400,
      majorContributor: false,
    },
    {
      login: 'charleswaddell',
      contributions: 500,
      majorContributor: false,
    },
    {
      login: 'wen-2018',
      contributions: 1200,
      majorContributor: true,
    },
    {
      login: 'robcee',
      contributions: 1300,
      majorContributor: true,
    },
    {
      login: 'wittman',
      contributions: 1100,
      majorContributor: true,
    },
  ];

  test('truncates other data at 10 contributors', () => {
    expect(
      getGroupedMemberData(contributors, []).contributors.other
    ).toHaveLength(10);
  });

  test('sorts by contributions before truncating other data', () => {
    expect(
      getGroupedMemberData(contributors, []).contributors.other.map(
        (contributor) => contributor.login
      )
    ).not.toContain('gauthierm');
  });

  test('partitions data based on facebook membership', () => {
    const members = ['gauthierm', 'wittman', 'robcee'];
    const data = getGroupedMemberData(contributors, members);

    members.forEach((member) => {
      expect(
        data.contributors.facebook.map((contributor) => contributor.login)
      ).toContain(member);
      expect(
        data.contributors.other.map((contributor) => contributor.login)
      ).not.toContain(member);
    });
  });

  test('aggregates contributions', () => {
    const members = ['gauthierm', 'wittman', 'robcee'];
    const data = getGroupedMemberData(contributors, members);

    expect(data.totals.facebook).toBe(2600);
    expect(data.totals.other).toBe(8250);
  });
});
