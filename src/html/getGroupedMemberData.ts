export function getGroupedMemberData(contributors: any[], members: any[]) {
  const groupedMembers = contributors.reduce<{
    facebook: any[];
    other: any[];
  }>(
    ({ facebook, other }, contributor) => {
      return members.includes(contributor.login)
        ? { facebook: [...facebook, contributor], other }
        : { facebook, other: [...other, contributor] };
    },
    { facebook: [], other: [] }
  );

  const totals = Object.fromEntries(
    Object.entries(groupedMembers).map(([group, contributors]) => {
      return [
        group,
        contributors.reduce(
          (total: number, contributor: any) =>
            total + contributor.contributions,
          0
        ),
      ];
    })
  );

  groupedMembers.facebook.sort((a, b) => b.contributions - a.contributions);
  groupedMembers.other.sort((a, b) => b.contributions - a.contributions);

  groupedMembers.facebook.splice(10);
  groupedMembers.other.splice(10);

  groupedMembers.facebook.sort((a, b) => a.login.localeCompare(b.login));
  groupedMembers.other.sort((a, b) => a.login.localeCompare(b.login));

  return {
    contributors: groupedMembers,
    totals,
  };
}
