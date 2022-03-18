const welcomeTemplate = (username, name) => {
  return `<p style="display: flex; align-items: center;">Hey, ${username}</p>
          <br/>
          <br/>
          <p>I'm ${name}, the founder of MUTU and I’d like to personally 
          welcome you to our team of amazing workers.</p>
          <br/>
          <br/>
          <p>We established MUTU in order to take care of the need for clean
          portable, affordable and healthy drinking water in areas of Nigeria</p>
          <br/>
          <br/>
          <p>I'd love to hear what you think of our products and company as a whole and if
          there's something we can improve. If you have any questions, please reply to this email.
          I'm alwasy happy to help!</p>
          <br/>
          <br/>
          <p>${name}</p>
          <br/>
          <p>Best Regards, </p>
          <p>CEO | MUTU</p>
          `;
};

module.exports = { welcomeTemplate };
