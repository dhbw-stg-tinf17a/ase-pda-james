const nodemailer = require("nodemailer");
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

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve("Die Email wurde an " + mail.recipient +" gesendet");
        }
      });
    });
  };
  return this;
};
