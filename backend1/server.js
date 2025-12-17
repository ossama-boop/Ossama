const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leb_guide",
});

// Ensure images folder exists
const imagesFolder = path.join(__dirname, "images");
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
  console.log("✔ images folder created");
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(" ").join("_") +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// GET Restaurants
app.get("/restaurants", (req, res) => {
  const q = "SELECT * FROM restaurants";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    data.forEach((r) => {
      if (r.image) {
        try {
          const img = fs.readFileSync(path.join(imagesFolder, r.image));
          r.image = img.toString("base64");
        } catch {
          r.image = null;
        }
      }
    });

    res.json(data);
  });
});

// POST Restaurant
app.post("/restaurants", upload.single("image"), (req, res) => {
  const { name, location } = req.body;
  const imageFile = req.file ? req.file.filename : null;

  const q =
    "INSERT INTO restaurants (image, name, location, rating) VALUES (?, ?, ?, 0)";

  db.query(q, [imageFile, name, location], (err, data) => {
    if (err) return res.json(err);

    res.json({ message: "Restaurant added!", id: data.insertId });
  });
});

// DELETE Restaurant (DB + image file)
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;

  // أول شي جيب اسم الصورة من الـ DB
  const qSelect = "SELECT image FROM restaurants WHERE id = ?";

  db.query(qSelect, [id], (err, rows) => {
    if (err) {
      console.log("SELECT ERROR:", err);
      return res.status(500).json(err);
    }

    const imageName = rows[0] ? rows[0].image : null;

    // بعدين امسح السطر من جدول restaurants
    const qDelete = "DELETE FROM restaurants WHERE id = ?";

    db.query(qDelete, [id], (err2, data) => {
      if (err2) {
        console.log("DELETE ERROR:", err2);
        return res.status(500).json(err2);
      }

      // وأخيراً امسح ملف الصورة من الفولدر images (إذا موجود)
      if (imageName) {
        const filePath = path.join(imagesFolder, imageName);
        fs.unlink(filePath, (err3) => {
          if (err3) {
            console.error("Error deleting file:", err3);
          }
        });
      }

      return res.json(data);
    });
  });
});
// SIGN UP - إضافة يوزر جديد
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const q = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(q, [email, password], (err, data) => {
    if (err) {
      console.log("SIGNUP ERROR:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Database error" });
    }

    return res.json({ message: "User signed up successfully" });
  });
});

// LOGIN - التحقق من اليوزر
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const q = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(q, [email, password], (err, rows) => {
    if (err) {
      console.log("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    // هون ممكن ترجع مثلاً id أو email
    return res.json({ message: "Login successful", user: rows[0] });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});