const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs-extra");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async (req, res, next, options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return next(ErrorHandler(err, 500));
      } else {
        res.status(200).json({
          status: true,
          message: "Email sent successfully",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const sendConfimationEmail = async (req, res, next, options) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
          };
      
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return next(ErrorHandler(err, 500));
            } else {
              res.status(200).json({
                status: true,
                message: "Email sent successfully",
              });
            }
          });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sendMail,sendConfimationEmail};
