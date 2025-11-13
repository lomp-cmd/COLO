// api/colorize.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = await req.json();

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "de2171b2a8604ec18b3d86dc87ccf76ff9120f9b9a0b37e2c12f49e6ab5a0aeb", // Beispielmodell
        input: { image: imageUrl }
      }),
    });

    const prediction = await response.json();
    return res.status(200).json(prediction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
