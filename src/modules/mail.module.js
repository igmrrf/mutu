const nodmailer = require('nodemailer');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_API_KEY;
const { google } = require('googleapis');
const config = require('config');
const OAuth2 = google.auth.OAuth2;
sgMail.setApiKey(apiKey);

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
const GoogleSendMail = (to, subject, html) => {
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

const SendGridSendMail = async (recipient, emailSubject, content) => {
  const msg = {
    to: 'devclub57@gmail.com',
    from: 'vuetify@vue.com',
    subject: emailSubject,
    html: content,
  };
  try {
    let info = await sgMail.send(msg);
    console.log(`mail sent succcessfully >>> ${info}`);
    return info;
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};


module.exports = {GoogleSendMail, SendGridSendMail};
