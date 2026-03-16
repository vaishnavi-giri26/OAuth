
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email found"), null);
        }

        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email }]
        });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user);
        }

        user = await User.create({
  googleId: profile.id,
  displayName: profile.displayName || profile.name?.givenName || "User",
  email: email,
  image: profile.photos?.[0]?.value
});

        return done(null, user);

      } catch (err) {
        console.error("❌ Passport Error:", err);
        return done(err, null);
      }
    }
  )
);

/* ===============================
   SESSION
================================ */

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
