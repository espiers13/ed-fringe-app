function Button({ text, onClick, className = "", type = "button" }) {
  return (
    <button
      type="button"
      className={` text-black bg-gray-100 box-border border border-transparent rounded-xl hover:bg-gray-200 focus:ring-1 focus:ring-gray-300 shadow-xs font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
