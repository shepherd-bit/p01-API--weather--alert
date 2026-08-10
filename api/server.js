import app from './src/app.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in development mode on http://localhost:${PORT}`);
});