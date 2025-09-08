import fetch from 'node-fetch';

export default async function handler(req, res) {
    const placeId = "ChIJVeLlTadXei4RfpT-bpUgjpU";
    const fields = "reviews";
    const key = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result?.reviews) {
            res.status(200).json(data.result.reviews);
        } else {
            res.status(500).json({ error: "No reviews found", raw: data });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data from Google API" });
    }
}
