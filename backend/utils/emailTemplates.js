/**
 * Email template for email verification
 * @param {string} name - User's name
 * @param {string} verificationCode - Verification code
 * @returns {string} - HTML email template
 */
const verificationEmailTemplate = (name, verificationCode) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      background-color: #4a6cf7;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .verification-code {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 5px;
      margin: 20px 0;
      padding: 15px;
      background-color: #f2f7ff;
      border-radius: 5px;
      color: #4a6cf7;
    }
    .message {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <div class="message">
        <p>Hello ${name},</p>
        <p>Thank you for registering with our service. To complete your registration, please use the verification code below:</p>
      </div>
      <div class="verification-code">${verificationCode}</div>
      <div class="message">
        <p>This code will expire in 1 hour. If you did not request this code, please ignore this email.</p>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Email template for successful email verification
 * @param {string} name - User's name
 * @returns {string} - HTML email template
 */
const verificationSuccessTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      background-color: #4CAF50;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .success-icon {
      text-align: center;
      margin: 20px 0;
      font-size: 60px;
      color: #4CAF50;
    }
    .button {
      display: inline-block;
      background-color: #4a6cf7;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 15px;
    }
    .button-container {
      text-align: center;
      margin: 25px 0;
    }
    .message {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verified Successfully</h1>
    </div>
    <div class="content">
      <div class="success-icon">✓</div>
      <div class="message">
        <p>Hello ${name},</p>
        <p>Your email has been successfully verified! Thank you for completing the verification process.</p>
        <p>You can now enjoy all the features of our platform.</p>
      </div>
      <div class="button-container">
        <a href="https://yourwebsite.com/login" class="button">Go to Login</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Email template for password reset requests
 * @param {string} name - User's name
 * @param {string} resetLink - Password reset link
 * @returns {string} - HTML email template
 */
const passwordResetTemplate = (name, resetLink) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px 0;
    }
    .button {
      display: inline-block;
      background-color: #4a6cf7;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 15px;
    }
    .button-container {
      text-align: center;
      margin: 25px 0;
    }
    .message {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
    .warning {
      font-size: 13px;
      color: #666;
      font-style: italic;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <div class="message">
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        <p>To reset your password, please click the button below:</p>
      </div>
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Password</a>
      </div>
      <p class="warning">This link will expire in 24 hours for security reasons.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Jabir Ahmad. All rights reserved.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Email template for password reset success
 * @param {string} name - User's name
 * @returns {string} - HTML email template
 */
const passwordResetSuccessTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    .content {
      padding: 20px 0;
    }
    .success-icon {
      text-align: center;
      margin: 20px 0;
      font-size: 60px;
      color: #4CAF50;
    }
    .button {
      display: inline-block;
      background-color: #4a6cf7;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 15px;
    }
    .button-container {
      text-align: center;
      margin: 25px 0;
    }
    .message {
      margin-bottom: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <div class="success-icon">✓</div>
      <div class="message">
        <p>Hello ${name},</p>
        <p>Your password has been successfully reset! Thank you for completing the password reset process.</p>
        <p>You can now login to your account with your new password.</p>
      </div>
      <div class="button-container">
        <a href="https://yourwebsite.com/login" class="button">Go to Login</a>
      </div>
    </div>
    <div class="footer">  
      <p>&copy; ${new Date().getFullYear()} Jabir Ahmad. All rights reserved.</p>
      <p>This is an automated email, please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = {
  verificationEmailTemplate,
  verificationSuccessTemplate,
  passwordResetTemplate,
  passwordResetSuccessTemplate,
};
