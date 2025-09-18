import './Select.css'

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string[];
  onChange?: (selectedValues: string[]) => void; // burayı değiştiriyoruz
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "error";
  disabled?: boolean;
  multiple?: boolean;
  errorMessage?: string;
}

function Select({
  label,
  options,
  value = [],
  onChange,
  size = "medium",
  variant = "default",
  disabled = false,
  multiple = true,
  errorMessage,
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onChange) return;

    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    onChange(selectedOptions);
  };

  return (
    <div className={`app-select ${size} ${variant} ${disabled ? "disabled" : ""}`}>
      {label && <label className="select-label">{label}</label>}
      <select
        multiple={multiple}
        value={value}
        onChange={handleChange} // event'i string[]'e çeviriyoruz
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="select-error">{errorMessage}</p>}
    </div>
  );
}

export default Select;
