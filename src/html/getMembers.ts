import { port } from '../config';
import { getData } from './getData';

export async function getMembers() {
  const members: string[] = [];

  const data: any[] = await getData(
    `http://localhost:${port}/api/orgs/facebook/members`
  );

  data.forEach((contributor) => {
    if (contributor.type === 'User') {
      members.push(contributor.login);
    }
  });

  return members;
}
