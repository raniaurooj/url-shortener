const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (tokenCookie) {
    req.user = getUser(tokenCookie);
  }
  return next();
}

function restrictTO(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) {
      return res.status(403).render("error", { message: "Access denied." });
    }
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTO };
