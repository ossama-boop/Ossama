import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "liu"
});

// =======================
// GET Students
// =======================
app.get("/students", (req, res) => {
  const q = `
    SELECT StdID, Fname, Lname, Email, Description, Address 
    FROM students s 
    INNER JOIN major m ON s.Major = m.MajorCode
  `;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// =======================
// GET Majors (for ComboBox)
// =======================
app.get("/students/majors", (req, res) => {
  const q = "SELECT * FROM major";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// =======================
// POST Insert Student
// =======================
app.post("/students", (req, res) => {
  const { fname, lname, email, major, address } = req.body;

  const q = `
    INSERT INTO students(Fname, Lname, Email, Major, Address)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(q, [fname, lname, email, major, address], (err, data) => {
    if (err) return res.json(err);
    return res.json("Student Added Successfully!");
  });
});

// =======================
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});