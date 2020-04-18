module.exports = (db) => {
  return {
    authenticateUser: (ctx) => {
      if (!ctx) {
        return Promise.reject(new Error);
      } else {
        return Promise.resolve(true);
      }
    },
    getFreeSlots: jest.fn().mockResolvedValue([[{
      start: "2020-04-09T09:00:00+02:00",
      end: "2020-04-09T17:00:00+02:00"}]]),
  };
};
