module.exports = (db) => {
  return {
    authenticateUser: (ctx) => {
      if (!ctx) {
        return Promise.reject(new Error);
      } else {
        return Promise.resolve(true);
      }
    },
    getFreeSlots: () => Promise.resolve(true),
  };
};
