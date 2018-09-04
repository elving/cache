import session from 'lib/session';

export default function isOwner(item) {
  if (session.userIsLoggedIn) {
    if (session.user && session.user.objectId) {
      if (item && item.createdBy) {
        return session.user.objectId === item.createdBy.objectId;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
