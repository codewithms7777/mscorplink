import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const urlDB = {}; // In-memory storage

// Generate short code
function generateCode() {
  return crypto.randomBytes(3).toString("hex"); // 6-char code
}

// API → Shorten URL
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: "URL required" });

  const code = generateCode();
  urlDB[code] = url;

  res.json({ short: `http://localhost:3000/${code}` });
});

// Redirect
app.get("/:code", (req, res) => {
  const long = urlDB[req.params.code];

  if (!long) return res.send("Invalid Link");

  res.redirect(long);
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
