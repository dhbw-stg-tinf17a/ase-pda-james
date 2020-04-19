module.exports = (db) => {
  return {
    get: jest.fn((key) => new Promise((resolve, reject) => {
      resolve("test_value");
    })),
    set: jest.fn((key, value) => new Promise((resolve, reject) => {
      resolve();
    })),
  };
};
