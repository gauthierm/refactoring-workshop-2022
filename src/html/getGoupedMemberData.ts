import { port } from '../config';
import { getContributors } from './getContributors';
import { getData } from './getData';
import { getMembers } from './getMembers';

export async function getGroupedMemberData() {
  const contributors = getContributors(
    await getData(
      `http://localhost:${port}/api/repos/facebook/react/contributors`
    )
  );
  const members = getMembers(
    await getData(`http://localhost:${port}/api/orgs/facebook/members`)
  );

  const groupedMembers: { [key: string]: any[] } = { facebook: [], other: [] };
  const totals: { [key: string]: number } = { facebook: 0, other: 0 };

  contributors.forEach((contributor) => {
    if (members.includes(contributor.login)) {
      groupedMembers.facebook.push(contributor);
      totals.facebook += contributor.contributions;
    } else {
      groupedMembers.other.push(contributor);
      totals.other += contributor.contributions;
    }
  });

  groupedMembers.facebook.splice(10);
  groupedMembers.other.splice(10);

  groupedMembers.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedMembers.other.sort((a, b) => a.login.localeCompare(b.login));

  return {
    contributors: groupedMembers,
    totals,
  };
}
