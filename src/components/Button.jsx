function Button({ text, onClick, className = "bg-gray-100", type = "button" }) {
  return (
    <button
      type="button"
      className={` text-black box-border border border-transparent rounded-xl  focus:ring-1 focus:ring-gray-300 shadow-xs font-medium leading-5 text-sm  focus:outline-none transition-colors duration-200 ${className} hover:bg-gray-200 p-1.5`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
