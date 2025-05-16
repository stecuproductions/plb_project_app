import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './Routing/AiRequest.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API działa na http://localhost:${PORT}`));
app.get('/', (req, res) => {
  res.send('API działa!');
});