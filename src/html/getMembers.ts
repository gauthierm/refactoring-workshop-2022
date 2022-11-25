import { isUser } from './isUser';

export function getMembers(data: any[]) {
  return data.filter(isUser).map((member) => member.login);
}
