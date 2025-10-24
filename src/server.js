const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const offersRoutes = require('./routes/offers');
const postulationsRoutes = require('./routes/postulations');
const profilesRoutes = require('./routes/profiles');
const validationRoutes = require('./routes/validations');
const matchRoutes = require('./routes/match');
const searchOffersRoutes = require('./routes/searchOffers');
const searchProfilesRoutes = require('./routes/searchProfiles');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/ofertas', offersRoutes);
app.use('/api/postulations', postulationsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/validations', validationRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/searchOffers', searchOffersRoutes);
app.use('/api/searchProfiles', searchProfilesRoutes);
app.use('/api/admin', adminRoutes);

// Endpoint de prueba
app.get("/ping", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: result });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3005;

console.log("ENV CHECK:");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ OK" : "❌ MISSING");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ OK" : "❌ MISSING");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
