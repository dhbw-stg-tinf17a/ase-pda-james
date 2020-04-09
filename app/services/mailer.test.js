let mailer;

describe("mailer sendMail", () => {
  beforeEach(() => {
    mailer = require("./mailer")();
  });
  test("if function fails with an error when no recipient is defined", () => {
    return mailer.sendMail({})
        .catch((err) => {
          expect(err.message).toEqual("[Mailer Service Error] The API did not perform successfully.");
          expect(err.object.message).toEqual("No recipients defined");
        });
  });
  test("if the funcition send the mail, and it got send to the right address", () => {
    return mailer.sendMail({
      recipient: "jamesaseprojekt@gmail.com",
      subject: "",
      text: "",
      htmlText: ""})
        .then((res) => {
          expect(res.accepted).toEqual(["jamesaseprojekt@gmail.com"]);
        });
  });
});

