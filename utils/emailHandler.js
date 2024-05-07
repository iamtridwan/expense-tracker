const nodemailer = require("nodemailer");

const emailHandler = (to, subject, text, html) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba4ce56ec1b343",
      pass: "012f3da676d08b",
    },
  });

  transport.sendMail({
    to,
    from: "info@expensetracker.com",
    text: text ? text : "",
    html: html ? html : undefined,
    subject: subject ? subject : "",
  });
};

module.exports = emailHandler;
