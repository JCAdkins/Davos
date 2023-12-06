const getAddress = ({
  housenumber,
  street,
  city,
  state,
  country,
  postcode,
}) => {
  const requestOptions = {
    method: "GET",
  };
  const api_key = import.meta.env.VITE_GEOAPIFY_KEY;
  const tStreet = street.replaceAll(" ", "%");
  const tCity = city.replaceAll(" ", "%");
  const tState = state.replaceAll(" ", "%");
  const tCountry = country.replaceAll(" ", "%");
  const URL = `https://api.geoapify.com/v1/geocode/search?housenumber=${housenumber}&street=${tStreet}&city=${tCity}&state=${tState}&country=${tCountry}&postcode=${postcode}&format=json&apiKey=${api_key}`;
  return fetch(URL, requestOptions);
};

export default getAddress;
