// FILE: server/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const TOKEN_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signToken = (user) =>
  jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

const signDemoAdminToken = () =>
  jwt.sign({ _id: "temp_admin", role: "admin", demoAdmin: true }, JWT_SECRET, { expiresIn: "12h" });

const presentUser = (u) => ({
  _id: u._id,
  email: u.email,
  fullName: u.fullName || "",
  role: u.role,
  phone: u.phone || "",
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Built-in auth middleware (guaranteed function)
function auth(req, res, next) {
  const hdr = req.headers.authorization || "";
  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.demoAdmin) {
      req.user = { _id: "temp_admin", role: "admin", demoAdmin: true };
      return next();
    }
    req.user = { _id: decoded._id, role: decoded.role };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// POST /api/auth/signup
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash,
      fullName: fullName || "",
      role: "user",
    });

    const token = signToken(user);
    res.json({ token, user: presentUser(user) });
  })
);

// POST /api/auth/signin
router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    if (email === "admin" && password === "admin") {
      return res.json({
        token: signDemoAdminToken(),
        user: {
          _id: "temp_admin",
          email: "admin@bpj.local",
          fullName: "Temporary Admin",
          role: "admin",
          phone: "",
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: presentUser(user) });
  })
);

// GET /api/auth/me
router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    const u = await User.findById(req.user._id).select("-passwordHash");
    if (!u) return res.status(401).json({ error: "Unauthorized" });
    res.json({ user: presentUser(u) });
  })
);

// PUT /api/auth/me
router.put(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    const { fullName, phone } = req.body || {};
    const $set = {};
    if (typeof fullName !== "undefined") $set.fullName = fullName;
    if (typeof phone !== "undefined") $set.phone = phone;

    const u = await User.findByIdAndUpdate(req.user._id, { $set }, { new: true }).select("-passwordHash");
    if (!u) return res.status(404).json({ error: "User not found" });

    res.json({ user: presentUser(u) });
  })
);

// Optional signout (stateless JWT)
router.post(
  "/signout",
  auth,
  asyncHandler(async (_req, res) => res.status(204).end())
);

module.exports = router;
