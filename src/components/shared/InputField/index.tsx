import React from "react";
import './index.css';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  placeHolder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, onKeyDown, onFocus, placeHolder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      placeholder={placeHolder}
      className="input-field"
    />
  );
};

export default InputField;
