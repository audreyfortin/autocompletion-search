import React, { useState, useEffect, useCallback } from "react";
import SuggestionsDropdown from "./SuggestionsDropdown";
import InputField from "../InputField";
import "./index.css";

interface AutocompletionProps {
  query: string;
  onSearch: (value: string) => void;
  suggestions: string[];
  error?: string;
  loading: boolean;
}

const Autocompletion: React.FC<AutocompletionProps> = ({
  query,
  onSearch,
  suggestions,
  error,
  loading,
}) => {
  const [inputValue, setInputValue] = useState<string>(query);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Debounced search effect
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(inputValue);
    }, 300);
    return () => clearTimeout(delay);
  }, [inputValue, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".autocompletion")) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle input change
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setHighlightedIndex(-1);
    setDropdownVisible(value.length > 0); // Show dropdown if input is not empty
  },[]);

  // Handle key down for navigation and selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownVisible) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setDropdownVisible(false);
    onSearch(suggestion);
  };

  // Handle input focus
  const handleFocus = () => {
    if (inputValue.length > 0) setDropdownVisible(true);
  };

  return (
    <div className="autocompletion">
      <InputField
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeHolder="Search for products..."
      />
      {loading && <div className="autocompletion-loading">Loading...</div>}
      {error && <div className="autocompletion-error">{`Error for loading API:${error}`}</div>}
      {isDropdownVisible && suggestions.length > 0 && (
        <SuggestionsDropdown
          suggestions={suggestions}
          highlightedIndex={highlightedIndex}
          onSuggestionClick={handleSuggestionClick}
          onHighlightChange={setHighlightedIndex}
          query={inputValue}
        />
      )}
      {isDropdownVisible && suggestions.length === 0 && !loading && !error && (
        <div className="autocompletion-no-suggestions">No suggestions found</div>
      )}
    </div>
  );
};

export default Autocompletion;
