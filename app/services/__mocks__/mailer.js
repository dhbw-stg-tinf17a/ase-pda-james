module.exports = () => {
  return {
    sendMail: (mail) => {
      if (!mail) {
        Promise.reject(new Error());
      } else {
        Promise.resolve(true);
      }
    },
  };
};
