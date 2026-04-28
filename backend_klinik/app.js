require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();


// ==========================
// VIEW ENGINE
// ==========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ==========================
// MIDDLEWARE
// ==========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ==========================
// STATIC FILE (PENTING UNTUK LOGO)
// ==========================
app.use(express.static(path.join(__dirname, "public")));


// ==========================
// SESSION
// ==========================
app.use(
  session({
    secret: "klinik-kemuning-secret",
    resave: false,
    saveUninitialized: true,
  })
);


// ==========================
// IMPORT ROUTES
// ==========================
const authRoutes = require("./routes/auth");
const pasienRoutes = require("./routes/pasienRoutes");
const obatRoutes = require("./routes/obatRoutes");
const rekamMedisRoutes = require("./routes/rekammedisRoutes");


// ==========================
// ROUTES
// ==========================

// AUTH
app.use("/auth", authRoutes);

// CRUD
app.use("/pasien", pasienRoutes);
app.use("/obat", obatRoutes);
app.use("/rekammedis", rekamMedisRoutes);


// ==========================
// DASHBOARD (HALAMAN UTAMA)
// ==========================
app.get("/", (req, res) => {

  // cek login
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  res.render("admin_dashboard", {
    user: req.session.user
  });

});


// ==========================
// HANDLE ERROR 404
// ==========================
app.use((req, res) => {
  res.status(404).send("404 - Halaman tidak ditemukan");
});


// ==========================
// JALANKAN SERVER
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});