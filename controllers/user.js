const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already registered." });
    }

    await User.create({ name, email, password });
    return res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).render("signup", { error: "Something went wrong. Try again." });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid email or password." });
    }

    const token = setUser(user);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).render("login", { error: "Something went wrong. Try again." });
  }
}

module.exports = { handleUserSignUp, handleUserLogin };
