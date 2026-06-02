function Button({
  text,
  onClick,
  className = "bg-gray-100",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-black box-border border border-transparent rounded-xl focus:ring-1 focus:ring-gray-300 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none transition-colors duration-200 ${className} hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
