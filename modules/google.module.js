
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID =
  '43246667719-bjn103b2i6vd7ksucs398c7e1t8ku87q.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const checkAuth = async (req, res, next) => {
  const token = req.cookies['session-cookie'];
  const user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user.email = payload.email;
    user.picture = payload.picture;
    user.name = payload.name;
    req.user = user;
  }
  try {
    await verify();

    console.log('ew', user);
    next();
  } catch (error) {
    res.redirect('/login');
    console.log(error);
  }
};

const verify = async (req, res) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};
try {
  const verified = await verify();
  res.cookie('session-cookie', token, {
    expires: new Date(Date.now() + 9000000),
  });
  res.send('success');
  console.log('VERIFIED: ', verified);
} catch (error) {
  console.log(error);
}
