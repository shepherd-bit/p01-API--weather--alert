import express from 'express';
import { searchCity, getForecast } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/search', searchCity);
router.get('/forecast', getForecast);

export default router;