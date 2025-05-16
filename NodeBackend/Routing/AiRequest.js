import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const basePrompt = `Użytkownik opisał swoją dietę. Na podstawie tego opisu oceń ją i zwróć TYLKO czysty JSON w następującym formacie:
{
  "overallScore": "(0–10)",
  "nutritionBalance": {
    "protein": "(0–100)", 
    "carbs": "(0–100)", 
    "fats": "(0–100)", 
    "fiber": "(0–100)"
  },
  "recommendations": ["rekomendacje"],
  "suggestedFoods": ["produkty"]
}
Jeśli opis jest zbyt krótki lub nie zawiera konkretów, zwróć pusty obiekt: {}. Nutritional balance 

Opis diety:\n`;

router.post('/getDietReview', async (req, res) => {
  const { description } = req.body;
  if (!description || description.length < 10) {
    return res.json({});
  }
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: basePrompt + description }
      ],
    });

    const text = completion.choices[0].message.content;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonText = text.slice(jsonStart, jsonEnd + 1);
    
    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'AI error or invalid JSON.' });
  }
});

export default router;
