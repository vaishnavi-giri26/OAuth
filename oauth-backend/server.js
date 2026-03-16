

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import "./config/passport.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

/* ===============================
   CORS
================================ */
app.use(
  cors({
    origin: "https://oauth-frontend-esm9.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

/* ===============================
   TRUST PROXY (for deployment)
================================ */
app.set("trust proxy", 1);

/* ===============================
   SESSION
================================ */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "vaishnavi_secure_67",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),

    cookie: {
      secure: false,       // IMPORTANT for localhost
      httpOnly: true,
      sameSite: "none",     // IMPORTANT for localhost
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

/* ===============================
   PASSPORT
================================ */
app.use(passport.initialize());
app.use(passport.session());

/* ===============================
   ROUTES
================================ */
app.get("/", (req, res) => {
  res.send("🚀 Vaishnavi's OAuth Server is live!");
});

app.use("/auth", authRoutes);

/* ===============================
   DATABASE
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
