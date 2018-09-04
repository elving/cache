import { last } from 'lodash';

export default function getUserFromSession(session) {
  return last(session.split(':'));
}
