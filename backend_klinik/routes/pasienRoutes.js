const express = require("express");
const router = express.Router();
const db = require("../config/db");


// =========================
// TAMPIL DATA PASIEN
// =========================
router.get("/", (req, res) => {

  db.query("SELECT * FROM pasien", (err, results) => {
    if (err) return res.send(err);

    res.render("pasien/index", { pasien: results });
  });

});


// =========================
// FORM TAMBAH
// =========================
router.get("/tambah", (req, res) => {
  res.render("pasien/tambah");
});


// =========================
// SIMPAN DATA
// =========================
router.post("/tambah", (req, res) => {

  const { nama, nik, alamat, no_hp, tanggal_lahir } = req.body;

  const sql = `
    INSERT INTO pasien (nama, nik, alamat, no_hp, tanggal_lahir)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nama, nik, alamat, no_hp, tanggal_lahir], (err) => {
    if (err) return res.send(err);

    res.redirect("/pasien");
  });

});


// =========================
// FORM EDIT
// =========================
router.get("/edit/:id", (req, res) => {

  const id = req.params.id;

  db.query("SELECT * FROM pasien WHERE id=?", [id], (err, result) => {
    if (err) return res.send(err);

    res.render("pasien/edit", {
      data: result[0] // 🔥 FIX
    });
  });

});


// =========================
// PROSES UPDATE
// =========================
router.post("/edit/:id", (req, res) => {

  const id = req.params.id;
  const { nama, nik, alamat, no_hp, tanggal_lahir } = req.body;

  const sql = `
    UPDATE pasien 
    SET nama=?, nik=?, alamat=?, no_hp=?, tanggal_lahir=?
    WHERE id=?
  `;

  db.query(sql, [nama, nik, alamat, no_hp, tanggal_lahir, id], (err) => {
    if (err) return res.send(err);

    res.redirect("/pasien");
  });

});


// =========================
// HAPUS
// =========================
router.get("/hapus/:id", (req, res) => {

  db.query("DELETE FROM pasien WHERE id=?", [req.params.id], (err) => {
    if (err) return res.send(err);

    res.redirect("/pasien");
  });

});

module.exports = router;