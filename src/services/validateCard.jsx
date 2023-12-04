//const apiStacksKey = import.meta.env.VITE_APISTACKS_KEY;
const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;

const validateCard = async (data) => {
  const cardNumber = data.number;
  const rapidApiUrl = `https://card-validator-and-generator.p.rapidapi.com/validate?number=${cardNumber}`;

  const rapidApiOptions = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "card-validator-and-generator.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(rapidApiUrl, rapidApiOptions);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
    return { error: error.message };
  }
};

export default validateCard;
