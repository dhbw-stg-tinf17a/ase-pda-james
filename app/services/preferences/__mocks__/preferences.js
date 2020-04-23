module.exports = () => {
  return {
    get: jest.fn(() => new Promise((resolve) => {
      resolve("test_value");
    })),
    set: jest.fn(() => new Promise((resolve) => {
      resolve();
    })),
  };
};
