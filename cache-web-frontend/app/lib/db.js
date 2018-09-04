import axios from 'axios';
import { isString } from 'lodash';

import session from 'lib/session';
import localstore from 'lib/localstore';
import inDevelopment from 'lib/inDevelopment';

const API_URL = inDevelopment() ? 'http://localhost:8000/api' : '/api';
const AUTH_URL = `${API_URL}/auth`;
const USER_URL = `${API_URL}/users`;
const ITEMS_URL = `${API_URL}/items`;
const INVITES_URL = `${AUTH_URL}/invite`;
const COLLECTIONS_URL = `${API_URL}/collections`;

function generateSessionHeader() {
  const { user } = session;

  return {
    'X-Session-Token': `${user.sessionToken}:${user.objectId}`
  };
}

function transformResponse(data) {
  return isString(data) ? JSON.parse(data) : data;
}

const db = {
  api: {
    pageInfo(url) {
      return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/misc/page/`, {
          params: { url }
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    }
  },

  beta: {
    getInvite(code) {
      return new Promise((resolve, reject) => {
        axios.get(
          `${INVITES_URL}/${code}/`
        ).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    redeemInvite(code, redeemedBy) {
      return new Promise((resolve, reject) => {
        axios.put(`${INVITES_URL}/${code}/`, {
          redeemed: true, redeemedBy
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    }
  },

  auth: {
    create(credentials) {
      return new Promise((resolve, reject) => {
        axios.post(USER_URL, credentials).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    edit(id, information) {
      return new Promise((resolve, reject) => {
        axios.put(`${USER_URL}/${id}/`, information, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    login(username, password) {
      return new Promise((resolve, reject) => {
        axios.get(`${AUTH_URL}/login/`, {
          params: { username, password }
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    resetPassword(email) {
      return new Promise(function(resolve, reject) {
        axios.post(`${AUTH_URL}/resetPassword/`, {
          email
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    validatePassword(username, currentPassword, newPassword) {
      return new Promise((resolve, reject) => {
        axios.get(`${AUTH_URL}/validatePassword/`, {
          params: { username, currentPassword, newPassword },
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    validateSession(sessionToken) {
      return new Promise(function(resolve, reject) {
        axios.get(`${AUTH_URL}/validate/`, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    logout() {
      return axios.post(`${AUTH_URL}/logout/`, {}, {
        headers: generateSessionHeader()
      });
    }
  },

  collections: {
    fetch() {
      return new Promise(function(resolve, reject) {
        axios.get(COLLECTIONS_URL, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    fetchPublic(id) {
      return new Promise(function(resolve, reject) {
        axios.get(
          `${COLLECTIONS_URL}/${id}/`
        ).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    checkPrivacy(id) {
      return new Promise(function(resolve, reject) {
        axios.get(
          `${COLLECTIONS_URL}/checkPrivacy/${id}/`
        ).then((response) => {
          resolve(response.data.isPublic);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    create(information) {
      return new Promise(function(resolve, reject) {
        axios.post(COLLECTIONS_URL, information, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    edit(id, information) {
      return new Promise(function(resolve, reject) {
        axios.put(`${COLLECTIONS_URL}/${id}/`, information, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    delete(id) {
      return new Promise(function(resolve, reject) {
        axios.delete(`${COLLECTIONS_URL}/${id}/`, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    }
  },

  items: {
    fetch(collection) {
      return new Promise(function(resolve, reject) {
        axios.get(ITEMS_URL, {
          params: { collection },
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    fetchPublic(collection) {
      return new Promise(function(resolve, reject) {
        axios.get(ITEMS_URL, {
          params: { collection, fromPublicCollection: true }
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    create(information) {
      return new Promise(function(resolve, reject) {
        axios.post(ITEMS_URL, information, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    edit(id, information) {
      return new Promise(function(resolve, reject) {
        axios.put(`${ITEMS_URL}/${id}/`, information, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    updateCollection(id, collection) {
      return new Promise((resolve, reject) => {
        axios.put(`${ITEMS_URL}/${id}/`, {
          collection: {
            __type: 'Pointer',
            objectId: collection,
            className: 'Collection'
          }
        }, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    delete(id) {
      return new Promise(function(resolve, reject) {
        axios.delete(`${ITEMS_URL}/${id}/`, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    },

    fetchTags() {
      return new Promise(function(resolve, reject) {
        axios.get(`${ITEMS_URL}/tags/`, {
          headers: generateSessionHeader()
        }).then((response) => {
          resolve(response.data);
        }).catch((response) => {
          reject(response.data);
        });
      });
    }
  }
};

export default db;
