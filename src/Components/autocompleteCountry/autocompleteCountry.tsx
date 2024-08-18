import { useState } from 'react';
import './autocompleteCountryStyles.scss';

interface AutocompleteCountryProps {
  allCountries: string[] | [];
  countryRef?: React.RefObject<HTMLInputElement>;
  onChange?: (value: string) => void;
}

function AutocompleteCountry({
  allCountries,
  countryRef,
  onChange,
}: AutocompleteCountryProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (onChange) {
      onChange(value);
    }

    if (value.length > 0) {
      const filteredCountries = allCountries.filter((country: string) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCountries);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (country: string) => {
    setQuery(country);
    setSuggestions([]);

    if (onChange) {
      onChange(country);
    }
  };

  return (
    <div className="countries-container">
      <label htmlFor="userCountry">Country</label>
      <input
        ref={countryRef}
        type="text"
        id="userCountry"
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
        name="userCountry"
        className="form__input-country"
      />
      {suggestions.length > 0 && (
        <ul className="countries-list">
          {suggestions.map((country, index) => (
            <button
              className="countries-list__item"
              key={index}
              onClick={() => handleSuggestionClick(country)}
            >
              {country}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteCountry;
