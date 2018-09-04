import { Actions } from 'flummox';

export default class NotificationsActions extends Actions {
  close() {
    return true;
  }

  notify(type, message, position) {
    return { type, message, position };
  }
}
