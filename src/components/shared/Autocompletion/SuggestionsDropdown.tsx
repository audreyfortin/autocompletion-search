import React from "react";

interface SuggestionsDropdownProps {
  suggestions: string[];
  highlightedIndex: number;
  onSuggestionClick: (suggestion: string) => void;
  onHighlightChange: (index: number) => void;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  suggestions,
  highlightedIndex,
  onSuggestionClick,
  onHighlightChange,
}) => {
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
            {suggestion}
          </li>
        ))
      )}
    </ul>
  );
};

export default SuggestionsDropdown;