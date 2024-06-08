import { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function SearchAPI_InputBox({ coordinatesFromAPI }) {
  const [address, setAddress] = useState("");

  async function handleLocationSelect(value) {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    coordinatesFromAPI(latLng);
    console.log(results);
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleLocationSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="w-full">
          <input
            {...getInputProps({
              placeholder: "Enter your location...",
              className:
                "location-search-input w-full rounded text-LIGHT-COLOR bg-000E14 p-2",
            })}
          />
          <div className="autocomplete-dropdown-container relative w-full">
            {loading && <div className="text-stone-100">Loading...</div>}
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const style = {
                cursor: "pointer",
                backgroundColor: "#000E14",
                color: "#F8F8F8",
                width: "100%",
                position: "relative",
              };

              return (
                <div
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span className=" hover:text-F8F8F8 block w-full rounded bg-000E14 p-1 hover:bg-blue-950">
                    {suggestion.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
