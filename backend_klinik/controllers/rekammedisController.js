const db = require("../config/db");

// tampil
exports.getAll = (req, res) => {
  const sql = `
    SELECT rm.*, p.nama 
    FROM rekam_medis rm
    JOIN pasien p ON rm.pasien_id = p.id
  `;

  db.query(sql, (err, results) => {
    res.render("rekammedis/index", { data: results });
  });
};

// form tambah
exports.formTambah = (req, res) => {
  db.query("SELECT * FROM pasien", (err, pasien) => {
    res.render("rekammedis/tambah", { pasien });
  });
};

// simpan
exports.tambah = (req, res) => {
  const { pasien_id, keluhan, diagnosa, tanggal } = req.body;

  const sql = `
    INSERT INTO rekam_medis (pasien_id, keluhan, diagnosa, tanggal)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [pasien_id, keluhan, diagnosa, tanggal], () => {
    res.redirect("/rekammedis");
  });
};

// hapus
exports.hapus = (req, res) => {
  db.query("DELETE FROM rekam_medis WHERE id=?", [req.params.id], () => {
    res.redirect("/rekammedis");
  });
};