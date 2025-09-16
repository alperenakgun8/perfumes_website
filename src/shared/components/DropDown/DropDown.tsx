import type { ChangeEvent } from "react";
import './DorpDown.css'

interface DropDownOption {
  value: string;
  label: string;
}

interface DropDownProps {
  label?: string;
  options: DropDownOption[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "error";
  disabled?: boolean;
  errorMessage?: string;
}

function DropDown({
  label,
  options,
  value,
  onChange,
  size = "medium",
  variant = "default",
  disabled = false,
  errorMessage,
}: DropDownProps) {
  return (
    <div
      className={`app-dropdown ${size} ${variant} ${
        disabled ? "disabled" : ""
      }`}
    >
      {label && <label className="dropdown-label">{label}</label>}
      <select value={value} onChange={onChange} disabled={disabled}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="dropdown-error">{errorMessage}</p>}
    </div>
  );
}

export default DropDown;
