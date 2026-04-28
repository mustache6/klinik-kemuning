const express = require("express");
const router = express.Router();
const db = require("../config/db");


// =========================
// TAMPIL DATA
// =========================
router.get("/", (req, res) => {

  const sql = `
    SELECT rm.*, p.nama 
    FROM rekam_medis rm
    LEFT JOIN pasien p ON rm.pasien_id = p.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.send(err);

    res.render("rekammedis/index", { data: results });
  });

});


// =========================
// FORM TAMBAH
// =========================
router.get("/tambah", (req, res) => {

  db.query("SELECT * FROM pasien", (err, pasien) => {
    if (err) return res.send(err);

    res.render("rekammedis/tambah", { pasien });
  });

});


// =========================
// SIMPAN DATA
// =========================
router.post("/tambah", (req, res) => {

  const { pasien_id, keluhan, diagnosa, tanggal } = req.body;

  const sql = `
    INSERT INTO rekam_medis (pasien_id, keluhan, diagnosa, tanggal)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [pasien_id, keluhan, diagnosa, tanggal], (err) => {
    if (err) return res.send(err);

    res.redirect("/rekammedis");
  });

});


// =========================
// FORM EDIT
// =========================
router.get("/edit/:id", (req, res) => {

  const id = req.params.id;

  db.query("SELECT * FROM rekam_medis WHERE id=?", [id], (err, rekam) => {

    if (err) return res.send(err);

    db.query("SELECT * FROM pasien", (err2, pasien) => {

      if (err2) return res.send(err2);

      res.render("rekammedis/edit", {
        data: rekam[0],
        pasien: pasien
      });

    });

  });

});


// =========================
// PROSES UPDATE
// =========================
router.post("/edit/:id", (req, res) => {

  const id = req.params.id;
  const { pasien_id, keluhan, diagnosa, tanggal } = req.body;

  console.log(req.body); // DEBUG

  const sql = `
    UPDATE rekam_medis
    SET pasien_id=?, keluhan=?, diagnosa=?, tanggal=?
    WHERE id=?
  `;

  db.query(sql, [pasien_id, keluhan, diagnosa, tanggal, id], (err) => {

    if (err) return res.send(err);

    res.redirect("/rekammedis");

  });

});


// =========================
// HAPUS
// =========================
router.get("/hapus/:id", (req, res) => {

  db.query("DELETE FROM rekam_medis WHERE id=?", [req.params.id], (err) => {
    if (err) return res.send(err);

    res.redirect("/rekammedis");
  });

});


module.exports = router;