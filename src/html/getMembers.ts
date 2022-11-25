export function getMembers(data: any[]) {
  const members: string[] = [];

  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      members.push(contributor.login);
    }
  });

  return members;
}
