const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/replan', async (req, res) => {
    const { itinerary, userMessage } = req.body;
    console.log('Re-planning request:', userMessage);

    const prompt = `You are an expert travel planner. The user has an existing travel itinerary and wants to modify it.

CURRENT ITINERARY:
${JSON.stringify(itinerary, null, 2)}

USER REQUEST:
"${userMessage}"

STRICT RULES:
- Understand what the user wants to change (a specific day, activity, food, accommodation, budget, style, etc.)
- Make ONLY the requested changes, keep everything else exactly the same
- Keep the exact same JSON structure as the input
- All cost values must still be in the format "Rs.XXXX" or numeric string
- The sum of all estimatedDailyTotal values must NOT exceed the original total budget of Rs.${itinerary.budget}
- Return the COMPLETE updated itinerary as a valid JSON object
- No extra text, no markdown, no code fences — JSON only

Return ONLY the updated JSON:`;

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content: 'You are a travel planning expert. Modify existing itineraries based on user requests. Always respond with valid JSON only. No markdown, no code fences, no extra text whatsoever.'
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
        console.log('Replan response received, length:', rawText.length);

        let cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.error('No JSON found in replan response');
            return res.status(500).json({ error: 'Failed to parse AI response' });
        }

        const updatedItinerary = JSON.parse(jsonMatch[0]);
        res.json({
            success: true,
            itinerary: updatedItinerary,
            message: 'Itinerary updated successfully!'
        });

    } catch (error) {
        console.error('Replan Error:', error.message);
        res.status(500).json({ error: 'Failed to replan', details: error.message });
    }
});

module.exports = router;