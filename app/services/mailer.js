const nodemailer = require("nodemailer");
module.exports = function() {
  this.sendMail = (recipient) =>{
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
        subject: "Krankmeldung",
        text: "Guten Tag, aufgrund von Krankheit kann ich heute leider nicht an Ihrer Vorlseung teilnehmen." +
        "Mit freundlichen Grüßen",
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve("Email sent: " + info.response);
        }
      });
    });
  };
  return this;
};
