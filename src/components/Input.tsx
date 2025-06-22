import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  id,
  className = "",
  disabled = false,
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const actualType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const hasToggle = type === "password";

  return (
    <div className="w-full relative">
      {label && (
        <label htmlFor={id} className="text-white ml-0.5 font-semibold text-sm">
          {label}
        </label>
      )}
      <input
        type={actualType}
        placeholder={placeholder}
        value={value}
        spellCheck={false}
        onChange={onChange}
        name={name}
        id={id}
        disabled={disabled}
        className={`
          bg-[#E6E1FA]/64
          rounded-md
          py-3 px-4
          w-full
          border-[1px]
          border-white
          text-white
          font-primary
          placeholder-gray-100
          focus:outline-none
           ring-0 font-bold
          focus:shadow-[0_0_20px_1px_#DBD55B]
          focus:ring-4 focus:ring-[#DBD55B]/50
          transition-all duration-300 ease-in-out
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${hasToggle ? "pr-10" : ""}
          ${className}
        `}
        {...rest}
      />

      {hasToggle && (
        <div
          className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center justify-center cursor-pointer"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
