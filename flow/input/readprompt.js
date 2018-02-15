//Uncodumented browser shim
export default {
  createInterface() {
    return {
      async question(q, callback) {
        callback(window.prompt(q));
      }
    };
  }
};
