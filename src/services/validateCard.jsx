const apiVerveUrlKey = import.meta.env.VITE_APIVERVE_KEY;

const validateCard = async (data) => {
  const cardNumber = data.number;
  const apiVerveUrl = `https://api.apiverve.com/v1/cardvalidator?number=${cardNumber}`;

  const apiVerveOptions = {
    method: "GET",
    headers: {
      "x-api-key": apiVerveUrlKey,
    },
  };

  try {
    const response = await fetch(apiVerveUrl, apiVerveOptions);

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
