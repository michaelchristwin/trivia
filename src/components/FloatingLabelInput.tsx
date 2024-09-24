import { useState, InputHTMLAttributes } from "react";

interface FloatingLabelInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div className="relative mb-4">
      <input
        className="peer w-full border-b-2 border-gray-300 bg-transparent pt-4 pb-1 font-sans text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        {...props}
      />
      {/* Floating label using placeholder */}
      <label
        htmlFor={id}
        className={`absolute left-0 top-4 font-sans text-sm text-gray-500 transition-all duration-300 ${
          isFocused || value
            ? "-translate-y-4 text-xs text-blue-500"
            : "peer-placeholder-shown:translate-y-0"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
