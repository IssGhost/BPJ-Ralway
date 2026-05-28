const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Ticket = require("../models/Ticket");
const Quote = require("../models/Quote");
const { auth, allow } = require("../middleware/auth");

router.use(auth, allow("admin"));

router.get("/users", async (_req, res) => {
  const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
  res.json(users);
});

router.get("/stats", async (_req, res) => {
  const [users, products, orders, tickets, quotes] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments({ active: true }),
    Order.countDocuments(),
    Ticket.countDocuments({ status: { $ne: "closed" } }),
    Quote.countDocuments(),
  ]);
  res.json({ users, products, orders, openTickets: tickets, quotes });
});

router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body || {};
  if (!["admin", "employee", "user"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { role } },
    { new: true }
  ).select("-passwordHash");

  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.delete("/users/:id", async (req, res) => {
  const ok = await User.findByIdAndDelete(req.params.id);
  if (!ok) return res.status(404).json({ error: "User not found" });
  res.json({ ok: true });
});

module.exports = router;
