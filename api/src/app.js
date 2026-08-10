import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base health check route
app.get('/', (req, res) => {
  res.json({ message: "Weather Alert Backend is running smoothly!" });
});

// Hooking up the weather endpoints
app.use('/api/weather', weatherRoutes);

export default app;