import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // If you're using ESM

import dotenv from 'dotenv';
dotenv.config();

console.log('Loaded API Key:', process.env.VITE_GOOGLE_MAPS_API_KEY);


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/reviews', async (req, res) => {
    const placeId = "ChIJVeLlTadXei4RfpT-bpUgjpU";
    const fields = "reviews";
    const key = process.env.VITE_GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("✅ Google API response:");
        console.dir(data, { depth: null });
        console.log('Loaded API Key:', process.env.VITE_GOOGLE_MAPS_API_KEY);

        if (data.result?.reviews) {
            res.json(data.result.reviews);
        } else {
            res.status(500).json({ error: "No reviews found", raw: data });
        }
    } catch (err) {
        console.error("❌ Error while fetching from Google API:", err);
        res.status(500).json({ error: "Failed to fetch data from Google API" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
