// FILE: server/models/Order.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    number: String, // e.g., human-friendly order number
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        tag: String,
      },
    ],
    status: { type: String, enum: ["pending", "paid", "shipped", "completed", "canceled"], default: "pending" },
    subtotal: Number,
    tax: Number,
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
