import { type ChangeEvent } from 'react'
import './TextInput.css'

interface TextInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    size?: "small" | "medium" | "large";
    variant?: "default" | "primary" | "error";
    disabled?: boolean;
    errorMessage?: string;
    type?: string;
}

function TextInput({ label, placeholder="", value, onChange, size="medium", variant="default", disabled=false, errorMessage, type="text" }: TextInputProps ) {
  return (
    <div className={`app-input ${size} ${variant} ${disabled ? "disabled" : ""}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {errorMessage && <p className="input-error">{errorMessage}</p>}
    </div>
  )
}

export default TextInput