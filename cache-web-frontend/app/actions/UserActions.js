import { Actions } from 'flummox';

import DB from 'lib/db';
import session from 'lib/session';

export default class UserActions extends Actions {
  async create(userInfo) {
    if (userInfo.name) {
      const name = userInfo.name.split(' ');
      userInfo.lastName = name[1];
      userInfo.firstName = name[0];
      delete userInfo.name;
    }

    return await DB.auth.create(userInfo);
  }

  async edit(userId, userInfo) {
    return await DB.auth.edit(userId, userInfo);
  }

  async login(email, password) {
    return await DB.auth.login(email, password);
  }

  loginFromSession() {
    session.set();
    return session.user;
  }

  async logout() {
    return await DB.auth.logout();
  }

  async validateSession(token) {
    return await DB.auth.validateSession(token);
  }
}
