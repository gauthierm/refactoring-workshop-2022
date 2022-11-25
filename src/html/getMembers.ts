export function getMembers(data: any[]) {
  return data
    .filter((member) => member.type === 'User')
    .map((member) => member.login);
}
