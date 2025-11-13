import Replicate from "replicate";
import formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: { bodyParser: false }
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send(err);

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const filePath = files.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    const output = await replicate.run(
      "lllyasviel/paintschainer:latest",
      {
        input: { image: fileBuffer }
      }
    );

    res.status(200).json({ output_url: output });
  });
};
