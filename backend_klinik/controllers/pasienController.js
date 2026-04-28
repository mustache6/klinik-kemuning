const db = require("../config/db");

// ================== TAMPIL DATA ==================
exports.getAllPasien = (req, res) => {
  const sql = "SELECT * FROM pasien";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error ambil data");
    }

    res.render("pasien/index", {
      pasien: results
    });
  });
};

// ================== FORM TAMBAH ==================
exports.formTambah = (req, res) => {
  res.render("pasien/tambah");
};

// ================== SIMPAN DATA ==================
exports.tambahPasien = (req, res) => {
  const { nama, nik, alamat, no_hp, tanggal_lahir } = req.body;

  const sql = `
    INSERT INTO pasien (nama, nik, alamat, no_hp, tanggal_lahir)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nama, nik, alamat, no_hp, tanggal_lahir], (err) => {
    if (err) {
      console.log(err);
      return res.send("Gagal tambah data");
    }

    res.redirect("/pasien");
  });
};

// ================== FORM EDIT ==================
exports.formEdit = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM pasien WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Error");
    }

    res.render("pasien/edit", {
      pasien: results[0]
    });
  });
};

// ================== UPDATE ==================
exports.updatePasien = (req, res) => {
  const id = req.params.id;
  const { nama, nik, alamat, no_hp, tanggal_lahir } = req.body;

  const sql = `
    UPDATE pasien 
    SET nama=?, nik=?, alamat=?, no_hp=?, tanggal_lahir=? 
    WHERE id=?
  `;

  db.query(sql, [nama, nik, alamat, no_hp, tanggal_lahir, id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Gagal update");
    }

    res.redirect("/pasien");
  });
};

// ================== DELETE ==================
exports.deletePasien = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM pasien WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.send("Gagal hapus");
    }

    res.redirect("/pasien");
  });
};