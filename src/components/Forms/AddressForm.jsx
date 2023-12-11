import { Label, Button, ListGroup } from "flowbite-react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import { useState, useRef, useEffect } from "react";
import getAddress from "../../services/getAddress";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";

const expandStreet = (streetName) => {
  // Define a mapping of common street name abbreviations to their full forms
  const abbreviationMap = {
    aly: "Alley",
    ave: "Avenue",
    blvd: "Boulevard",
    cir: "Circle",
    cswy: "Causeway",
    ct: "Court",
    ctr: "Center",
    st: "Street",
    // Add more mappings as needed
  };

  // Split the input street name into words
  const words = streetName.split(" ");

  // Iterate through the words and expand abbreviations if found
  const expandedWords = words.map((word) => {
    // Check if the word is an abbreviation and has a mapping
    const expandedWord = abbreviationMap[word.toLowerCase()] || word;
    return expandedWord;
  });

  // Join the expanded words back into a street name
  const expandedStreetName = expandedWords.join(" ");
  return expandedStreetName;
};

const AddressForm = ({ houseRequired, onSubmit }) => {
  const myAPIkey = import.meta.env.VITE_GEOAPIFY_KEY;
  const [place, setPlace] = useState();
  const [pickedAddressError, setPickedAddressError] = useState();
  const streetRef = useRef(null);
  const houseRef = useRef(null);
  const cityRef = useRef(null);
  const zipRef = useRef(null);
  const aptRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const [manualAddress, setManualAddress] = useState();
  const [possibleAddresses, setPossibleAddresses] = useState();
  const [pickableAddresses, setPickableAddresses] = useState();
  const [chosenAddress, setChosenAddress] = useState();

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
      if (
        streetRef.current.children[1].children[0].value &&
        cityRef.current.children[1].children[0].value &&
        stateRef.current.children[1].children[0].value &&
        countryRef.current.children[1].children[0].value &&
        zipRef.current.children[1].children[0].value &&
        houseRef.current.children[1].children[0].value
      ) {
        setManualAddress({
          housenumber: houseRef.current.children[1].children[0].value,
          street: expandStreet(streetRef.current.children[1].children[0].value),
          city: cityRef.current.children[1].children[0].value,
          state: stateRef.current.children[1].children[0].value,
          country: countryRef.current.children[1].children[0].value,
          postcode: zipRef.current.children[1].children[0].value,
        });
      } else {
        streetRef.current.children[1].children[0].style.borderColor = "red";
        cityRef.current.children[1].children[0].style.borderColor = "red";
        stateRef.current.children[1].children[0].style.borderColor = "red";
        countryRef.current.children[1].children[0].style.borderColor = "red";
        zipRef.current.children[1].children[0].style.borderColor = "red";

        if (houseRequired)
          houseRef.current.children[1].children[0].style.borderColor = "red";
        return;
      }
    } else {
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
      if (houseRequired && !place.properties.housenumber) {
        houseRef.current.children[1].children[0].style.borderColor = "red";

        return;
      }
    }
    if (place) {
      onSubmit(dataizeMeCapn(place));
    }
  };

  const addSelectedAddress = (address) => {
    if (address) onSubmit(dataizeMeCapn(address));
    else setPickedAddressError(true);
  };

  const dataizeMeCapn = (data) => {
    console.log(data);
    if (data.properties)
      return {
        address: data.properties.address_line1,
        city: data.properties.city,
        state: data.properties.state,
        state_code: data.properties.state_code,
        country: data.properties.country,
        country_code: data.properties.country_code,
        zip: data.properties.postcode,
        coordinates: { lat: data.properties.lat, long: data.properties.lon },
      };
    else
      return {
        address: data.address_line1,
        city: data.city,
        state: data.state,
        state_code: data.state_code,
        country: data.country,
        country_code: data.country_code,
        zip: data.postcode,
        coordinates: { lat: data.lat, long: data.lon },
      };
  };

  const removeDuplicateFromArray = (arr) => {
    arr.forEach((address) => console.log(address.props.children));
    const filteredArr = arr.filter((obj, ind, arr) => {
      // Check if any previous object has the same 'props.children' array
      const hasDuplicate = arr.slice(0, ind).some((prevObj) => {
        return (
          JSON.stringify(prevObj.props.children) ===
          JSON.stringify(obj.props.children)
        );
      });
      // Keep the object in the new array only if it doesn't have duplicate 'vals'
      return !hasDuplicate;
    });
    return filteredArr;
  };

  useEffect(() => {
    if (manualAddress) {
      getAddress(manualAddress)
        .then((response) => response.json())
        .then((result) => {
          setPossibleAddresses();
          setPossibleAddresses(result.results);
        });
    }
  }, [manualAddress]);

  useEffect(() => {
    if (possibleAddresses) {
      const fullMatch = possibleAddresses.find(
        (possibleAddress) => possibleAddress.rank.match_type === "full_match"
      );

      if (
        fullMatch &&
        fullMatch.housenumber == manualAddress.housenumber &&
        fullMatch.street == manualAddress.street &&
        fullMatch.city == manualAddress.city &&
        fullMatch.state == manualAddress.state &&
        fullMatch.country == manualAddress.country &&
        fullMatch.postcode == manualAddress.postcode
      ) {
        const data = {
          address: fullMatch.address_line1,
          city: fullMatch.city,
          state: fullMatch.state,
          state_code: fullMatch.state_code,
          country: fullMatch.country,
          country_code: fullMatch.country_code,
          zip: fullMatch.postcode,
          coordinates: { lat: fullMatch.lat, long: fullMatch.lon },
        };
        onSubmit(data);
      }
      setPickableAddresses(true);
    }
  }, [possibleAddresses]);

  return (
    <GeoapifyContext apiKey={myAPIkey}>
      {!pickableAddresses && (
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
                limit={0}
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
              limit={0}
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
                limit={0}
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
                limit={0}
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
                limit={0}
                debounceDelay={50}
              />
            </div>
            <div ref={countryRef} className="w-1/2">
              <Label htmlFor="country" value="Country:" />
              <GeoapifyGeocoderAutocomplete
                placeholder="Country"
                filterByCountryCode={["us"]}
                placeSelect={placeSelect}
                limit={0}
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
      )}
      {pickableAddresses && (
        <div>
          <div className="w-full h-fit text-black">Found Addresses: </div>
          <ListGroup className="flex flex-col gap-1">
            {removeDuplicateFromArray(
              possibleAddresses.map((address, ind) => {
                return (
                  <ListGroup.Item
                    key={ind}
                    onClick={() => {
                      setPickedAddressError();
                      setChosenAddress(address);
                    }}
                    className="flex bg-gray-300 w-full h-fit first:rounded-t-lg last:rounded-b-lg"
                  >
                    {address.address_line1}, {address.address_line2}
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
          {pickedAddressError && (
            <div className="text-red-400">An address must be selected.</div>
          )}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={() => addSelectedAddress(chosenAddress)}
              className="bg-app_accent-900 w-fit"
            >
              Accept
            </Button>
            <Button
              onClick={() => setPickableAddresses(undefined)}
              className="bg-app_accent-900 w-fit"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </GeoapifyContext>
  );
};

export default AddressForm;
