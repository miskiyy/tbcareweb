import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Simulate a sign-up process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email && password && password.length >= 6) {
      console.log("Sign up successful!");
      // Redirect atau tampilkan pesan sukses
    } else {
      setError("Sign up failed. Please check your email and password.");
    }
    setLoading(false);
  };

  const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7.306 4.5 3.328 7.218 1.5 12c1.828 4.782 5.806 7.5 10.5 7.5s8.672-2.718 10.5-7.5c-1.828-4.782-5.806-7.5-10.5-7.5zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
    </svg>
  );

  const EyeCloseIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 4.502c-4.499 0-8.243 2.718-10.5 7.498 2.257 4.782 6.001 7.498 10.5 7.498s8.243-2.716 10.5-7.498c-2.257-4.78-6.001-7.498-10.5-7.498zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM12 7.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z" />
    </svg>
  );

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Back to homepage
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign Up for TBCare</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar sekarang untuk mulai menggunakan platform kami.</p>
          </div>
          <div>
            <form onSubmit={handleSignUp}>
              <div className="space-y-5">
                {/* Nama Lengkap */}
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Nama Lengkap<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                {/* Rumah Sakit */}
                <div>
                  <label htmlFor="rumah_sakit" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Rumah Sakit<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rumah_sakit"
                    name="rumah_sakit"
                    placeholder="Nama rumah sakit tempat Anda bekerja"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      placeholder="Masukkan password Anda"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                      {showPassword ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                    </span>
                  </div>
                </div>
                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Dengan membuat akun, Anda menyetujui
                    <span className="text-teal-600 dark:text-teal-400 font-semibold"> Syarat dan Ketentuan</span>, dan
                    <span className="text-teal-600 dark:text-teal-400 font-semibold"> Kebijakan Privasi</span> kami.
                  </p>
                </div>
                {/* Button */}
                <div>
                  <button type="submit" disabled={loading} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full bg-teal-500 shadow-lg hover:bg-teal-600 disabled:bg-gray-400">
                    {loading ? "Memuat..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
            {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Sudah punya akun? {""}
                <Link to="/signin" className="text-orange-500 hover:text-orange-600 dark:text-orange-400 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
