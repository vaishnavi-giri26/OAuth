

import express from "express";
import passport from "passport";
import { logout, getMe } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "https://oauth-frontend-esm9.onrender.com";

/* ===============================
   GOOGLE LOGIN
================================ */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

/* ===============================
   GOOGLE CALLBACK
================================ */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`
  }),
  (req, res) => {
    console.log("✅ Google login successful");
    res.redirect(`${CLIENT_URL}/dashboard`);
  }
);

/* ===============================
   CURRENT USER
================================ */
router.get("/me", isAuthenticated, getMe);

/* ===============================
   LOGOUT
================================ */
router.get("/logout", logout);

export default router;
