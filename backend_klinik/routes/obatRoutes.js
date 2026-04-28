const express = require("express");
const router = express.Router();
const db = require("../config/db");


// =========================
// TAMPIL DATA OBAT
// =========================
router.get("/", (req, res) => {

  db.query("SELECT * FROM obat", (err, results) => {
    if (err) return res.send(err);

    res.render("obat/index", { obat: results });
  });

});


// =========================
// FORM TAMBAH
// =========================
router.get("/tambah", (req, res) => {
  res.render("obat/tambah");
});


// =========================
// SIMPAN DATA
// =========================
router.post("/tambah", (req, res) => {

  const { nama_obat, stok, harga } = req.body;

  const sql = `
    INSERT INTO obat (nama_obat, stok, harga)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [nama_obat, stok, harga], (err) => {
    if (err) return res.send(err);

    res.redirect("/obat");
  });

});


// =========================
// FORM EDIT
// =========================
router.get("/edit/:id", (req, res) => {

  const id = req.params.id;

  db.query("SELECT * FROM obat WHERE id=?", [id], (err, result) => {
    if (err) return res.send(err);

    res.render("obat/edit", {
      data: result[0] // 🔥 FIX
    });
  });

});


// =========================
// PROSES UPDATE
// =========================
router.post("/edit/:id", (req, res) => {

  const id = req.params.id;
  const { nama_obat, stok, harga } = req.body;

  const sql = `
    UPDATE obat 
    SET nama_obat=?, stok=?, harga=?
    WHERE id=?
  `;

  db.query(sql, [nama_obat, stok, harga, id], (err) => {
    if (err) return res.send(err);

    res.redirect("/obat");
  });

});


// =========================
// HAPUS
// =========================
router.get("/hapus/:id", (req, res) => {

  db.query("DELETE FROM obat WHERE id=?", [req.params.id], (err) => {
    if (err) return res.send(err);

    res.redirect("/obat");
  });

});

module.exports = router;