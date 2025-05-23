import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './Routing/AiRequest.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0' ,() => console.log(`✅ API działa na http://localhost:${PORT}`));
app.get('/', (req, res) => {
  res.send('API działa!');
});