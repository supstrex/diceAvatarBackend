import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function generate(req, res) {

  if (!configuration.apiKey) {
    res.status(500).send({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  const gender = req.body.gender || '';
  const style = req.body.style || '';
  const hd = req.body.hd || '';
  const hair = req.body.hair || '';

  const prompt = `avatar for a ${gender} in ${style} ${hd} style  ${hair ? "with" + hair + "hair": ''}`

  if (gender.trim().length === 0 || style.trim().length === 0 ) {
    res.status(400).send({
      error: {
        message: "Please enter a valid description for your avatar",
      },
    });
    return;
  }

  try {
    const response = await openai.createImage({
      prompt,
      n: 4,
      size: "512x512",
    });
    console.log(response.data);
    const image_urls = response.data.data;
    res.status(200).send(image_urls);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).send({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

export default {
  generate,
};
