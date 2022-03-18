/* eslint-disable max-len */
import config from "config";

const uri = config.get("app.frontendBaseUrl");
const styles = `
<style>
    html,
    body {
    font-family: "poppins", sans-serif;
    color: #003232;
    }
    header {
        padding: 8% 0;
    }
    #header-image {
        display:block;
        width: 55%;
        margin: auto;
    }
    #thanks-image {
        display:block;
        width: 100%;
        margin: auto;
    }
        
    main {
        background-color: white;
        width: 90%;
        margin:auto;
        border-radius: 2%;
        padding: 2% 6%;
    }
    h2 {
        font-size: 2.2em;
        letter-spacing: 0.1em;
    }
    #welcome-image {
        width: 100%;
    }
    p {
        font-size: 1.2em;
    }
    .code {
        font-weight: 600;
        font-size: 1.8em;
        letter-spacing: 0.1em;
        margin-top:2em;
    }
</style>
`;

const header = `
<head>
    <link
    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200&display=swap"
    rel="stylesheet"
    />
    <title>OTP </title>
    ${styles}
</head>
`;

export const WelcomeMail = () => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Welcome to our waitlist</h2>
    <p>Thank you for joining our waitlist. We are glad to have you with us as we embark this journey to be the foremost provider of African food outside Africa.</p>
    <p>We will keep you updated on our progress; consequently, you'll have an opportunity to be a beta user when we launch.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

/* eslint-disable max-len */
export const newStaff = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Hello ${recipient[0].first_name}</h2>
    <p>You have just been added as a staff on Mutu. Please use "${recipient.randomPassword}" as your password and reset your password immediately.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

/* eslint-disable max-len */
export const newPartner = () => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Hello!</h2>
    <p>You have been added as a partner on Mutu. Reset your password immediately by clicking this <a href="http://${uri}/v1/auth/forgot-password">link</a>.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

/* eslint-disable max-len */
export const forgotPassword = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Hello ${recipient.first_name},</h2>
    <p>We received your request for password change, use the code below to change your password.</p>
    <p>If you did not request for a password reset, ignore this email.</p>
    <p class="code">${recipient.confirm_password_token}</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>
`;

export const newUserEmail = (recipient) => `
<html>
<head>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Hi ${recipient.first_name},</h2>
    <p>Welcome to Mutu, our goal at Mutu is to take away all your food worries. We are excited to having you onboard!</p>
    <p>Use the code below to verify your email and activate your account.</p>
    <p class="code">${recipient.confirm_email_token}</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>
`;

export const accountVerifiedEmail = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Kudos ${recipient.first_name},</h2>
    <p>Your account has been verified!</p>
    <p>We cannot wait to serve you your first meal. Log in to the app to setup Lu, your AI meal planner.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>
`;

export const otpRequestEmail = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <h2>Hello ${recipient.first_name},</h2>
    <p>Use the code below to verify your email and activate your account.</p>
    <p class="code">${recipient.confirm_email_token}</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>
`;

/* eslint-disable max-len */
export const newRequest = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Hello, ${recipient}</h2>
    <p>Your business request has been recieved on Mutu. We'll get back to you as soon as possible.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

export const newRequestDetails = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>New Business Request Details,}</h2>
    <p>Name: ${recipient.name}.</p>
     <p>Phone: ${recipient.phone}.</p> 
     <p>Email: ${recipient.email}.</p>
     <p>Message: ${recipient.message}.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

export const currentTrack = (track) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Products Tracking</h2>
    <p>Completed: ${track.completed}</p>.</p>
     <p>Processing: ${track.current}.</p> 
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

export const trackCompleted = () => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Products have arrived at Destination</h2>
    <p>Please, endeavour to pick up products from filled destination</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

export const newGroupInvite = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Hello, ${recipient.first_name}</h2>
    <p>You have been invited to join an Mutu group please click on this link to join <a href="http://${uri}/v1/groups/invite/${recipient.encryptDetails}">link</a></p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

export const newInvite = (recipient) => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Hello</h2>
    <p> ${`${recipient.first_name} ${recipient.last_name}`} is inviting you to join a group on Mutu  however you do not have an account, click this link to create an account <a href="http://${uri}/v1/auth/signup">link</a></p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;

/* eslint-disable max-len */
export const newUser = () => `
<html>
${header}
<body>
<header>
     <img id="header-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/22263080-f214-4fc4-a216-dc6e3ba3af6d/839x297.png" />
</header>
   
<main>
    <img id="welcome-image" src="http://cdn.mcauto-images-production.sendgrid.net/602760649a73f9c1/57c85fee-d715-4305-9511-fd1a5668b22a/1920x1276.jpg" />

    <h2>Hello!</h2>
    <p>You have been added as a user on Mutu. Reset your password immediately by clicking this <a href="http://${uri}/v1/auth/resetPassword">link</a>.</p>
    <br />
  <p>Thank you,</p>
  <p>Mutu Team</p>

  <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
  </div>
  </main>
</body>
</html>

`;
