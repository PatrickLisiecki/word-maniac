const axios = require("axios");

export default async function checkWord(word: string) {
  const options = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_RAPID_API_HOST}/words/${word}/definitions`,
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
