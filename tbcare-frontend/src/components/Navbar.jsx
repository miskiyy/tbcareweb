import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#1FBABF] text-white shadow-md">
      <h1 className="text-xl font-bold">TB Detector</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-[#F8A549]">
          Home
        </Link>
        <Link to="/about" className="hover:text-[#F8A549]">
          About Us
        </Link>
        <Link to="/login" className="hover:text-[#F8A549]">
          Login
        </Link>
      </div>
    </nav>
  );
}
