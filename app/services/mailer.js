const nodemailer = require("nodemailer");
const e = require("./mailerErrors");
module.exports = function() {
  this.sendMail = (mail) =>{
    return new Promise((resolve, reject)=>{
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.MAILER_USER,
        to: mail.recipient,
        subject: mail.subject,
        text: mail.text,
        html: mail.htmlText,
      };

      transporter.sendMail(mailOptions)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            e.VvsApiError.prototype = Object.create(Error.prototype);
            const error = new e.VvsApiError("The API did not perform successfully.", err);
            reject(error);
          });
    });
  };
  return this;
};
