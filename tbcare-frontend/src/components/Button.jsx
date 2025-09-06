export default function Button({ children, onClick, type = "button", variant = "primary" }) {
  const baseStyle = "px-6 py-2 rounded-lg font-medium transition shadow-md";
  const variants = {
    primary: "bg-[#1FBABF] text-white hover:bg-[#17979B]",
    secondary: "bg-[#0B759D] text-white hover:bg-[#095C7A]",
    accent: "bg-[#F8A549] text-white hover:bg-[#E19430]",
    support: "bg-[#60D3AA] text-white hover:bg-[#4EBB94]",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
}
