const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim()).filter(Boolean)
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bpj_dev";
(async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
  }
})();

function safeMount(path, modulePath) {
  try {
    const mod = require(modulePath);
    const router = mod?.default || mod;
    const isRouterFn = typeof router === "function";
    const hasHandle = router && typeof router.handle === "function";
    if (!isRouterFn && !hasHandle) {
      throw new Error(
        `Router at ${modulePath} is not a function. typeof=${typeof router} keys=${Object.keys(router || {})}`
      );
    }
    app.use(path, router);
    console.log(`Mounted ${path} from ${modulePath}`);
  } catch (e) {
    console.error(`Failed to mount ${path} from ${modulePath}:`, e);
  }
}

safeMount("/api/auth", "./routes/auth");
safeMount("/api/admin", "./routes/admin");
safeMount("/api/orders", "./routes/orders");
safeMount("/api/quotes", "./routes/quotes");
safeMount("/api/products", "./routes/products");
safeMount("/api/posts", "./routes/posts");
safeMount("/api/tickets", "./routes/tickets");
safeMount("/api/blog", "./routes/blog");

const distDir = path.resolve(__dirname, "..", "dist");
const shouldServeClient =
  process.env.NODE_ENV === "production" ||
  Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID);

if (shouldServeClient) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
} else {
  app.use((req, res, _next) => res.status(404).json({ error: "Not found" }));
}

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server error", detail: String(err?.message || err) });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
