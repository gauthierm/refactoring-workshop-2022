import { isUser } from './isUser';

export interface ApiMember {
  login: string;
  type: string;
}

export function getMembers(data: ApiMember[]) {
  return data.filter(isUser).map((member) => member.login);
}
