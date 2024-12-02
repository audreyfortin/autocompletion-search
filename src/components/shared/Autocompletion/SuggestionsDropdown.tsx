import React from "react";

interface SuggestionsDropdownProps {
  suggestions: string[];
  highlightedIndex: number;
  onSuggestionClick: (suggestion: string) => void;
  onHighlightChange: (index: number) => void;
  query: string;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  suggestions,
  highlightedIndex,
  onSuggestionClick,
  onHighlightChange,
  query,
}) => {
  
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <ul className="autocompletion-suggestions">
      {suggestions.length > 0 && (
        suggestions.map((suggestion, index) => (
          <li
            key={suggestion}
            className={`suggestion-item ${index === highlightedIndex ? "active" : ""}`}
            onClick={() => onSuggestionClick(suggestion)}
            onMouseEnter={() => onHighlightChange(index)} // Highlight suggestion on hover
          >
            {highlightMatch(suggestion, query)}
          </li>
        ))
      )}
    </ul>
  );
};

export default SuggestionsDropdown;
