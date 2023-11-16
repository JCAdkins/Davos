//const apiStacksKey = import.meta.env.VITE_APISTACKS_KEY;
const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;

const validateCard = async (data) => {
  const cardNumber = data.number;
  //const apiStacksUrl = `https://cors-anywhere.herokuapp.com/https://api.apistacks.com/v1/validatecard?api_key=${apiStacksKey}&cardnumber=${cardNumber}`;
  const rapidApiUrl = `https://card-validator-and-generator.p.rapidapi.com/validate?number=${cardNumber}`;

  const apiStacksHeaders = { "Content-Type": "application/json" };

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
      throw console.log(response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors
    console.error("Error:", error.message);
  }
};

export default validateCard;
