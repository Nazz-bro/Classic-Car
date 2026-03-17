import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id TEXT PRIMARY KEY,
    name TEXT,
    brand TEXT,
    year INTEGER,
    description TEXT,
    image TEXT,
    engine TEXT,
    origin TEXT,
    transmission TEXT,
    topSpeed TEXT,
    history TEXT
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    carId TEXT,
    carName TEXT,
    fullName TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    message TEXT,
    type TEXT,
    status TEXT DEFAULT 'new',
    createdAt TEXT
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    createdAt TEXT
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  // Cars API
  app.get("/api/cars", (req, res) => {
    const cars = db.prepare("SELECT * FROM cars").all();
    res.json(cars.map((c: any) => ({
      ...c,
      specs: {
        engine: c.engine,
        origin: c.origin,
        transmission: c.transmission,
        topSpeed: c.topSpeed
      }
    })));
  });

  app.get("/api/cars/:id", (req, res) => {
    const car: any = db.prepare("SELECT * FROM cars WHERE id = ?").get(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.json({
      ...car,
      specs: {
        engine: car.engine,
        origin: car.origin,
        transmission: car.transmission,
        topSpeed: car.topSpeed
      }
    });
  });

  // Inquiries API
  app.post("/api/inquiries", (req, res) => {
    const inquiry = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare(`
      INSERT INTO inquiries (id, carId, carName, fullName, email, phone, city, message, type, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, inquiry.carId, inquiry.carName, inquiry.fullName, inquiry.email, inquiry.phone, inquiry.city, inquiry.message, inquiry.type, new Date().toISOString());
    res.json({ id, ...inquiry });
  });

  app.post("/api/contacts", (req, res) => {
    const contact = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    db.prepare(`
      INSERT INTO contacts (id, name, email, subject, message, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, contact.name, contact.email, contact.subject, contact.message, new Date().toISOString());
    res.json({ id, ...contact });
  });

  app.get("/api/dealer", (req, res) => {
    res.json({
      name: "Vintage Gallery Concierge",
      phone: "+1 (555) 123-4567",
      email: "concierge@vintagegallery.com",
      address: "123 Heritage Drive, London, UK",
      experience: "25+ Years",
      verified: true
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
