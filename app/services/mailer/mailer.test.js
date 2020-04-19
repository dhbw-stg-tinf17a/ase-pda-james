describe("send mail", () => {
  let sendMailFunction;
  let sendMail;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    sendMailFunction = jest.fn();
    jest.doMock("nodemailer", () => {
      return {
        createTransport: () => ({
          sendMail: sendMailFunction,
        }),
      };
    });

    sendMail = require("./mailer")().sendMail;
  });

  test("if works", () => {
    sendMailFunction.mockResolvedValue();

    process.env.MAILER_USER = "email@me.com";
    return sendMail({
      recipient: "email@other.com",
      subject: "Subject",
      text: "Text",
      htmlText: "HTML Text",
    }).then(() => expect(sendMailFunction).toHaveBeenCalledWith({
      from: "email@me.com",
      to: "email@other.com",
      subject: "Subject",
      text: "Text",
      html: "HTML Text",
    }));
  });

  test("if fails correctly", () => {
    sendMailFunction.mockRejectedValue(new Error("No recipients defined"));

    process.env.MAILER_USER = "email@me.com";
    return sendMail({
      recipient: "",
      subject: "Subject",
      text: "Text",
      htmlText: "HTML Text",
    })
        .catch((err) => {
          expect(sendMailFunction).toHaveBeenCalledWith({
            from: "email@me.com",
            to: "",
            subject: "Subject",
            text: "Text",
            html: "HTML Text" });
          expect(err.message).toEqual("[Mailer Service Error] The API did not perform successfully.");
          expect(err.object.message).toEqual("No recipients defined");
        });
  });
});
