const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "change_this_in_production";

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET,
    { expiresIn: "7d" }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
