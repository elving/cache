var localstore = {
  get(key) {
    var response = localStorage.getItem(key);
    return response ? JSON.parse(response) : null;
  },

  set(key, data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      data = JSON.stringify(data);
    }

    localStorage.setItem(key, data);
  },

  clear() {
    localStorage.clear();
  },

  isEmpty() {
    return localStorage.length <= 0;
  }
};

export default localstore;
