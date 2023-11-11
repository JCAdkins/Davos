import { Label, Button } from "flowbite-react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import { useState, useRef, useEffect } from "react";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";

const AddressForm = ({ onSubmit }) => {
  const myAPIkey = import.meta.env.VITE_GEOAPIFY_KEY;
  const [place, setPlace] = useState();
  const streetRef = useRef(null);
  const houseRef = useRef(null);
  const cityRef = useRef(null);
  const zipRef = useRef(null);
  const aptRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);

  const placeSelect = (place) => {
    streetRef.current.children[1].children[0].value = place.properties.street;
    houseRef.current.children[1].children[0].value = place.properties
      .housenumber
      ? place.properties.housenumber
      : "";
    cityRef.current.children[1].children[0].value = place.properties.city;
    stateRef.current.children[1].children[0].value = place.properties.state;
    zipRef.current.children[1].children[0].value = place.properties.postcode
      ? place.properties.postcode
      : "";
    countryRef.current.children[1].children[0].value = place.properties.country;
    setPlace(place);
  };

  useEffect(() => {
    if (streetRef.current)
      streetRef.current.children[1].children[0].autoComplete = "off";
  }, [streetRef.current]);

  const submitAddress = () => {
    if (!place) {
      streetRef.current.children[1].children[0].style.borderColor = "red";
      cityRef.current.children[1].children[0].style.borderColor = "red";
      stateRef.current.children[1].children[0].style.borderColor = "red";
      countryRef.current.children[1].children[0].style.borderColor = "red";
      zipRef.current.children[1].children[0].style.borderColor = "red";
      return;
    }
    if (!place.properties.street) {
      streetRef.current.children[1].children[0].style.borderColor = "red";
      return;
    }
    if (!place.properties.city) {
      cityRef.current.children[1].children[0].style.borderColor = "red";
      return;
    }
    if (!place.properties.state) {
      stateRef.current.childre[1].children[0].style.borderColor = "red";
      return;
    }
    if (!place.properties.country) {
      countryRef.current.children[1].children[0].style.borderColor = "red";
      return;
    }
    if (!place.properties.postcode) {
      zipRef.current.children[1].children[0].style.borderColor = "red";
      return;
    }
    const data = {
      address: place.properties.address_line1,
      city: place.properties.city,
      state: place.properties.state,
      state_code: place.properties.state_code,
      country: place.properties.country,
      country_code: place.properties.country_code,
      zip: place.properties.postcode,
      coordinates: { lat: place.properties.lat, long: place.properties.lon },
    };
    onSubmit(data);
  };

  return (
    <GeoapifyContext apiKey={myAPIkey}>
      <div className="flex flex-col w-full text-black gap-2">
        <div className="flex justify-evenly gap-2">
          <div ref={streetRef} className="w-full">
            <Label htmlFor="street" value="Street:" />
            <GeoapifyGeocoderAutocomplete
              placeholder="W Example Street"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
          <div ref={houseRef} className="w-1/3">
            <Label htmlFor="house-number" value="House:" />
            <GeoapifyGeocoderAutocomplete
              type="housenumber"
              placeholder="1234"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
        </div>
        <div ref={aptRef}>
          <Label htmlFor="apt/suite" value="Apartment/Suite (optional)" />
          <GeoapifyGeocoderAutocomplete
            placeholder="Apt/Suite"
            filterByCountryCode={["us"]}
            placeSelect={placeSelect}
            limit={4}
            debounceDelay={50}
          />
        </div>
        <div className="flex justify-evenly gap-2">
          <div ref={cityRef} className="w-full">
            <Label htmlFor="city" value="City:" />
            <GeoapifyGeocoderAutocomplete
              type="city"
              placeholder="City"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
          <div ref={zipRef} className="w-1/3">
            <Label htmlFor="zip-code" value="ZIP code:" />
            <GeoapifyGeocoderAutocomplete
              type="zip"
              placeholder="54321"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
        </div>
        <div className="flex justify-evenly gap-2">
          <div ref={stateRef} className="w-1/2">
            <Label htmlFor="state" value="State:" />
            <GeoapifyGeocoderAutocomplete
              type="state"
              placeholder="State"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
          <div ref={countryRef} className="w-1/2">
            <Label htmlFor="country" value="Country:" />
            <GeoapifyGeocoderAutocomplete
              placeholder="Country"
              filterByCountryCode={["us"]}
              placeSelect={placeSelect}
              limit={4}
              debounceDelay={50}
            />
          </div>
        </div>
        <Button
          onClick={submitAddress}
          className="bg-app_accent-900 mt-4 w-full"
        >
          Submit
        </Button>
      </div>
    </GeoapifyContext>
  );
};

export default AddressForm;
