const nodemailer = require("nodemailer");
module.exports = function() {
  this.sendMail = (recipient, subject, text, htmlText) =>{
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
        to: recipient,
        subject: subject,
        text: text,
        html: htmlText,
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve("Die Email wurde an " + recipient +" gesendet");
        }
      });
    });
  };
  return this;
};
