const nodmailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('config');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  config.get('client_id'),
  config.get('client_secret'),
  config.get('redirect_url')
);

oauth2Client.setCredentials({
  refresh_token: config.get('refresh_token'),
});

const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodmailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'Oauth2',
    user: config.get('mail_email'),
    clientId: config.get('client_id'),
    clientSecret: config.get('client_secret'),
    refreshToken: config.get('refresh_token'),
    accessToken,
  },
  tls: {
    rejectedUnauthorized: false,
  },
});
const sendMail = (to, subject, html) => {
  const mailOptions = {
    from: `MUTU <${config.get('mail_email')}>`,
    to,
    cc: to,
    bcc: `${to}, ${config.get('mail_email')}`,
    subject,
    generatedTextFromHTML: true,
    html,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
  });
};

module.exports = sendMail;
