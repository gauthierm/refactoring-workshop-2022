import { getTotalContributionsByOrganization } from './getTotalContributionsByOrganization';

describe('getTotalContribututionsByOrganization()', () => {
  const groupedContributors = {
    facebook: [
      {
        login: 'gauthierm',
        contributions: 200,
        majorContributor: false,
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
    ],
    other: [
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
    ],
  };

  test('aggregates contributions', () => {
    const totals = getTotalContributionsByOrganization(groupedContributors);

    expect(totals.facebook).toBe(2600);
    expect(totals.other).toBe(8250);
  });
});
