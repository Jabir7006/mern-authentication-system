const mailOptions = ({
  from = process.env.EMAIL_USER,
  to,
  subject,
  text = null,
  html = null,
}) => {
  return {
    from,
    to,
    subject,
    text,
    html,
  };
};

module.exports = mailOptions;
