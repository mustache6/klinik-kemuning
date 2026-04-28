const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// koneksi database
const db = require("../config/db");


// ===============================
// HALAMAN LOGIN
// ===============================
router.get("/login", (req, res) => {
  res.render("admin_login");
});


// ===============================
// PROSES LOGIN
// ===============================
router.post("/login", (req, res) => {

  const { username, password } = req.body;

  // validasi input kosong
  if (!username || !password) {
    return res.send("Username dan password wajib diisi");
  }

  // query user
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, results) => {

    if (err) {
      console.log(err);
      return res.send("Terjadi error server");
    }

    // jika user tidak ditemukan
    if (results.length === 0) {
      return res.send("Username tidak ditemukan");
    }

    const user = results[0];

    // ===============================
    // CEK PASSWORD (bcrypt)
    // ===============================
    const passwordCocok = bcrypt.compareSync(password, user.password);

    if (!passwordCocok) {
      return res.send("Password salah");
    }

    // ===============================
    // SIMPAN SESSION
    // ===============================
    req.session.user = {
      id: user.id,
      username: user.username
    };

    // ===============================
    // REDIRECT KE DASHBOARD
    // ===============================
    res.redirect("/");

  });

});


// ===============================
// LOGOUT
// ===============================
router.get("/logout", (req, res) => {

  req.session.destroy((err) => {

    if (err) {
      return res.send("Gagal logout");
    }

    res.redirect("/auth/login");

  });

});


// ===============================
// EXPORT ROUTER
// ===============================
module.exports = router;