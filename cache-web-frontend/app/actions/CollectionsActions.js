import { Actions } from 'flummox';

import DB from 'lib/db';
import { defaults } from 'lodash';

export default class CollectionsActions extends Actions {
  add(collection) {
    return collection;
  }

  select(collection) {
    return collection;
  }

  search(term) {
    return term;
  }

  resetSearch() {
    return;
  }

  showPrivacyModal() {
    return true;
  }

  hidePrivacyModal() {
    return true;
  }

  showDeleteModal() {
    return true;
  }

  hideDeleteModal() {
    return true;
  }

  showShareModal() {
    return true;
  }

  hideShareModal() {
    return true;
  }

  async fetch() {
    return await DB.collections.fetch();
  }

  async fetchPublic(id) {
    return await DB.collections.fetchPublic(id);
  }

  async create(information) {
    defaults(information, { isPublic: false });
    return await DB.collections.create(information);
  }

  async edit(collection, changes) {
    return await DB.collections.edit(collection, changes);
  }

  async updatePrivacy(collection, isPublic) {
    return await DB.collections.edit(collection, { isPublic });
  }

  async checkPrivacy(collection) {
    return await DB.collections.checkPrivacy(collection);
  }

  async delete(collection) {
    return await DB.collections.delete(collection);
  }
}
