const db = require("../config/db");

// tampil data
exports.getAllObat = (req, res) => {
  db.query("SELECT * FROM obat", (err, results) => {
    if (err) return res.send("Error");

    res.render("obat/index", { obat: results });
  });
};

// form tambah
exports.formTambah = (req, res) => {
  res.render("obat/tambah");
};

// simpan
exports.tambahObat = (req, res) => {
  const { nama_obat, stok, harga } = req.body;

  const sql = "INSERT INTO obat (nama_obat, stok, harga) VALUES (?, ?, ?)";

  db.query(sql, [nama_obat, stok, harga], (err) => {
    if (err) return res.send("Gagal tambah");

    res.redirect("/obat");
  });
};

// form edit
exports.formEdit = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM obat WHERE id=?", [id], (err, results) => {
    res.render("obat/edit", { obat: results[0] });
  });
};

// update
exports.updateObat = (req, res) => {
  const id = req.params.id;
  const { nama_obat, stok, harga } = req.body;

  const sql = "UPDATE obat SET nama_obat=?, stok=?, harga=? WHERE id=?";

  db.query(sql, [nama_obat, stok, harga, id], () => {
    res.redirect("/obat");
  });
};

// delete
exports.deleteObat = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM obat WHERE id=?", [id], () => {
    res.redirect("/obat");
  });
};