// import express from "express";
// import passport from "passport";
// import { logout, getMe } from "../controllers/authControllers.js";
// import { isAuthenticated } from "../middleware/auth.middleware.js"; 

// const router = express.Router();


// const CLIENT_URL = process.env.CLIENT_URL ||   "http://localhost:5173/"//"https://oauth-frontend-dnq9.onrender.com";

// router.get("/google", (req, res, next) => {
//     console.log(" Step 1: Requesting Google Auth...");
//     next();
// }, passport.authenticate("google", { 
//     scope: ["profile", "email"],
//     prompt: "select_account"
// }));

// // The Callback Route
// router.get("/google/callback", (req, res, next) => {
//     console.log(" Step 2: Received callback from Google...");
    
//     passport.authenticate("google", (err, user, info) => {
//         if (err) {
//             console.error(" Passport Auth Error:", err);
//             return res.status(500).json({ message: "Auth failed", error: err.message });
//         }
//         if (!user) {
//             console.log("⚠️ No user found, redirecting to login.");
//             return res.redirect(`${CLIENT_URL}/login`);
//         }

        
//         req.logIn(user, (loginErr) => {
//             if (loginErr) {
//                 console.error("Login Session Error:", loginErr);
//                 return res.status(500).json({ message: "Session failed", error: loginErr.message });
//             }
//             console.log(" Step 3: Auth Successful! Redirecting to Dashboard.");
//             return res.redirect(`${CLIENT_URL}/dashboard`);
//         });
//     })(req, res, next);
// });

// router.get("/me", isAuthenticated, getMe);
// router.get("/logout", logout);

// export default router;

import express from "express";
import passport from "passport";
import { logout, getMe } from "../controllers/authControllers.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

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
