const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Quote = require("../models/Quote");
const Order = require("../models/Order");
const Ticket = require("../models/Ticket");
const Post = require("../models/Post");
const Testimonial = require("../models/Testimonial");

router.post("/seed", async (_req, res) => {
  const passwordHash = await bcrypt.hash("customer", 10);
  const customer = await User.findOneAndUpdate(
    { email: "customer@bpj.local" },
    {
      $set: {
        email: "customer@bpj.local",
        fullName: "Demo Customer",
        phone: "281-252-0777",
        role: "user",
        passwordHash,
      },
    },
    { upsert: true, new: true }
  );

  await Quote.findOneAndUpdate(
    { userId: customer._id, subject: "Aerobic alarm and inspection request" },
    {
      $set: {
        userId: customer._id,
        subject: "Aerobic alarm and inspection request",
        details: "Alarm light is on and the spray heads need a maintenance check.",
        status: "approved",
        estimate: 325,
      },
    },
    { upsert: true, new: true }
  );

  await Order.findOneAndUpdate(
    { userId: customer._id, number: "BPJ-DEMO-1001" },
    {
      $set: {
        userId: customer._id,
        number: "BPJ-DEMO-1001",
        items: [
          { productId: "air-pump", name: "Linear Air Pump", price: 300, qty: 1, tag: "pump" },
          { productId: "chlorinator", name: "Tablet Chlorinator", price: 80, qty: 1, tag: "treatment" },
        ],
        status: "paid",
        subtotal: 380,
        tax: 31.35,
        total: 411.35,
      },
    },
    { upsert: true, new: true }
  );

  await Ticket.findOneAndUpdate(
    { email: customer.email, subject: "Demo contact request" },
    {
      $set: {
        user: customer._id,
        name: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        city: "Pinehurst",
        subject: "Demo contact request",
        message: "Customer wants a pump-out and annual maintenance quote.",
        source: "demo-seed",
        status: "open",
      },
    },
    { upsert: true, new: true }
  );

  const posts = [
    {
      title: "What To Do When Your Aerobic Alarm Turns On",
      slug: "aerobic-alarm-guide",
      summary: "A practical first-step guide for homeowners when an aerobic system alarm activates.",
      content: "Check power, avoid heavy water use, and call for a technician if the alarm remains active.",
      coverUrl: "/images/IMG_0796.JPG",
      status: "published",
      publishedAt: new Date(),
    },
    {
      title: "How Often Should A Septic Tank Be Pumped?",
      slug: "septic-pumping-frequency",
      summary: "Usage, household size, and tank condition all affect the right pump-out schedule.",
      content: "Most homes should inspect regularly and pump every few years depending on usage.",
      coverUrl: "/images/IMG_0794.JPG",
      status: "published",
      publishedAt: new Date(),
    },
  ];

  for (const post of posts) {
    await Post.findOneAndUpdate({ slug: post.slug }, { $set: post }, { upsert: true, new: true });
  }

  const testimonials = [
    {
      name: "Renee M.",
      location: "Magnolia, TX",
      service: "Aerobic repair",
      rating: 5,
      text: "They diagnosed our alarm issue quickly, explained the repair, and left the yard cleaner than expected.",
      status: "published",
      featured: true,
    },
    {
      name: "Jason T.",
      location: "Pinehurst, TX",
      service: "Pump-out",
      rating: 5,
      text: "Fast scheduling and straightforward pricing. Exactly what you want when a septic problem shows up.",
      status: "published",
      featured: true,
    },
    {
      name: "Alicia R.",
      location: "Tomball, TX",
      service: "Maintenance plan",
      rating: 5,
      text: "The maintenance reminders and service notes make it easy to stay ahead of issues.",
      status: "published",
      featured: false,
    },
  ];

  for (const testimonial of testimonials) {
    await Testimonial.findOneAndUpdate(
      { name: testimonial.name, service: testimonial.service },
      { $set: testimonial },
      { upsert: true, new: true }
    );
  }

  res.json({
    ok: true,
    customer: { email: "customer@bpj.local", password: "customer" },
    seeded: ["customer", "quote", "order", "ticket", "blog posts", "testimonials"],
  });
});

module.exports = router;
