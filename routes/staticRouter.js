const express = require("express");
const URL = require("../models/url");
const { restrictTO } = require("../middleware/auth");

const router = express.Router();

// Home — shows logged-in user's URLs
router.get("/", restrictTO(["NORMAL", "ADMIN"]), async (req, res) => {
  try {
    const urls = await URL.find({ createdby: req.user._id });
    return res.render("home", { urls, id: null, error: null });
  } catch (error) {
    console.error("Home error:", error);
    return res.status(500).render("home", { urls: [], id: null, error: "Failed to load URLs." });
  }
});

// Admin — shows all URLs
router.get("/admin/urls", restrictTO(["ADMIN"]), async (req, res) => {
  try {
    const urls = await URL.find({}).populate("createdby", "name email");
    return res.render("home", { urls, id: null, error: null });
  } catch (error) {
    console.error("Admin URLs error:", error);
    return res.status(500).render("home", { urls: [], id: null, error: "Failed to load URLs." });
  }
});

router.get("/signup", (req, res) => res.render("signup", { error: null }));
router.get("/login", (req, res) => res.render("login", { error: null }));

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
});

module.exports = router;
