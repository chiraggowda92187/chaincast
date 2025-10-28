export const otpEmailTemplate = (
  
  email: string,
  otp: string,
  appName = "ChainCast",
) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${appName} Verification Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 480px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      width: 80px;
      margin-bottom: 10px;
    }
    h2 {
      color: #111827;
      margin-bottom: 10px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      margin: 10px 0;
    }
    .otp-box {
      text-align: center;
      background-color: #f0f4ff;
      color: #1d4ed8;
      font-size: 28px;
      letter-spacing: 4px;
      font-weight: bold;
      padding: 15px 0;
      border-radius: 8px;
      margin: 25px 0;
      border: 1px solid #c7d2fe;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="your-logo-url.png" alt="${appName} Logo" class="logo" />
      <h2>${appName} Verification Code</h2>
    </div>

    <p>Hello ${email},</p>
    <p>Use the following one-time password (OTP) to verify your login to <strong>${appName}</strong>:</p>

    <div class="otp-box">${otp}</div>

    <p>This code is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>

    <p>If you did not request this verification, you can safely ignore this email.</p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} ${appName}. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};
