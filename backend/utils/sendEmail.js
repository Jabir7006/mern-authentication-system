const nodemailer = require("nodemailer");

/**
 * Send an email using nodemailer
 * @param {Object} mailOptions - Email options
 * @param {string} mailOptions.from - Sender email or "Company Name <email@example.com>" format
 * @param {string} mailOptions.to - Recipient email
 * @param {string} mailOptions.subject - Email subject
 * @param {string} mailOptions.text - Plain text version of email
 * @param {string} mailOptions.html - HTML version of email
 * @returns {Promise<boolean>} - True if email sent successfully, false otherwise
 */
const sendEmail = async (mailOptions) => {
  try {
    // Create transporter with configuration from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true", // Convert string to boolean
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    const fromField = mailOptions.from.includes("<")
      ? mailOptions.from
      : `${process.env.COMPANY_NAME || "Mern Auth"} <${mailOptions.from}>`;

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: fromField,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
