const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSizes = {
    small: '256x256',
    medium: '512x512',
    large: '1024x1024',
  };
  try {
    const response = await openai.createImage({
      promt: 'Polar bear on ice skates',
      n: 1,
      size: imageSizes[size],
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: 'Image could not be generated',
    });
  }
};

module.exports = { generateImage };
