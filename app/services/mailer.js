const nodemailer = require("nodemailer");
const e = require("./mailerErrors");
module.exports = function() {
  this.sendMail = (mail) =>{
    return new Promise((resolve, reject)=>{
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.MAILER_USER,
          clientId: process.env.MAILER_CLIENT_ID,
          clientSecret: process.env.MAILER_CLIENT_SECRET,
          refreshToken: process.env.MAILER_REFRESH_TOKEN,
          accessToken: process.env.MAILER_ACCESS_TOKEN,
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
            e.MailerApiError.prototype = Object.create(Error.prototype);
            const error = new e.MailerApiError("The API did not perform successfully.", err);
            console.error(error);
            reject(error);
          });
    });
  };
  return this;
};
