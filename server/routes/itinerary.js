const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/generate-itinerary', async (req, res) => {
  const { destination, days, budget, travelers, style } = req.body;
  console.log('Request received for:', destination, days, 'days');

  const prompt = `You are an expert travel planner specializing in Indian and South Asian tourism.

Generate a detailed day-by-day travel itinerary for:
- Destination: ${destination}
- Duration: ${days} days
- TOTAL TRIP BUDGET: ₹${budget} (this is the TOTAL budget for the ENTIRE trip, not per day)
- Per day budget: ₹${Math.round(budget / days)} (the sum of all daily estimated totals MUST NOT exceed ₹${budget})
- Number of travelers: ${travelers}
- Travel style: ${style}

STRICT BUDGET RULE: The sum of all "estimatedDailyTotal" values across all days MUST be less than or equal to ₹${budget}. Plan accordingly.

Return ONLY a valid JSON object, no extra text, no markdown, no code fences:
{
  "destination": "${destination}",
  "duration": ${days},
  "budget": "${budget}",
  "summary": "2-3 sentence overview of the trip. IMPORTANT: refer to ₹${budget} as the TOTAL trip budget, never as a daily budget.",
  "tips": ["tip1", "tip2", "tip3"],
  "days": [
    {
      "day": 1,
      "theme": "Theme of the day",
      "morning": {
        "activity": "Activity name",
        "locationName": "Exact place name for Google Maps e.g. Boudhanath Stupa Kathmandu",
        "description": "Brief description",
        "duration": "2 hours",
        "cost": "₹200"
      },
      "afternoon": {
        "activity": "Activity name",
        "locationName": "Exact place name for Google Maps",
        "description": "Brief description",
        "duration": "3 hours",
        "cost": "₹500"
      },
      "evening": {
        "activity": "Activity name",
        "locationName": "Exact place name for Google Maps",
        "description": "Brief description",
        "duration": "2 hours",
        "cost": "₹300"
      },
      "food": {
        "breakfast": "Specific restaurant or stall name with dish (e.g. Cafe Sunrise - Masala Omelette)",
        "lunch": "Specific restaurant or stall name with dish (e.g. Momos Corner - Veg Momos)",
        "dinner": "Specific restaurant or stall name with dish (e.g. OR2K Restaurant - Dal Bhat Thali)"
      },
      "accommodation": {
        "name": "Exact hotel name",
        "type": "Budget/Mid-range/Luxury",
        "estimatedCost": "₹1500 per night",
        "location": "City or area name e.g. Kathmandu"
      },
      "estimatedDailyTotal": "₹2500"
    }
  ],
  "transport": {
    "toDestination": "How to reach from major cities",
    "local": "Local transport options and costs",
    "mode": "flight OR train OR bus OR road",
    "originCity": "Most common origin city to reach ${destination}",
    "destinationCity": "${destination}"
  },
  "closing": {
    "wishMessage": "A warm 2-3 sentence closing wish for the traveler",
    "thingsToPack": ["Valid ID/Passport", "First Aid Kit", "Prescribed Medicines", "Sunscreen SPF 50+", "Insect Repellent", "Rain Jacket/Umbrella", "Comfortable Walking Shoes", "Power Bank", "Universal Adapter", "Reusable Water Bottle", "Cash & Cards", "Emergency Contacts List"]
  }
}`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: 'You are a travel planning expert. Always respond with valid JSON only. No markdown, no code fences, no extra text.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const rawText = completion.choices[0].message.content;
    console.log('Groq response received, length:', rawText.length);

    let cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error('No JSON found in response');
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    const itinerary = JSON.parse(jsonMatch[0]);
    res.json({ success: true, itinerary });

  } catch (error) {
    console.error('Groq Error:', error.message);
    res.status(500).json({ error: 'Failed to generate itinerary', details: error.message });
  }
});

module.exports = router;