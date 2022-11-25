import { ApiMember } from '../schema/member';
import { isUser } from './isUser';

export function getMembers(data: ApiMember[]) {
  return data.filter(isUser).map((member) => member.login);
}
