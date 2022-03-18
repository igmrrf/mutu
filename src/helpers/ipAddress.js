const requestIp = require("request-ip");
const ipMiddleware = (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  next();
};

// As app middleware
app.use(requestIp.mw());
app.use((req, res) => {
  const ip = req.clientIp;
});
