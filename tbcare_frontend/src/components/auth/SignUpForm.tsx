import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to homepage
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-teal-600 text-title-sm dark:text-white/90 sm:text-title-md">Sign Up for TBCare</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daftar sekarang untuk mulai menggunakan platform kami.</p>
          </div>
          <div>
            <form>
              <div className="space-y-5">
                {/* Nama Lengkap */}
                <div>
                  <Label htmlFor="nama">
                    Nama Lengkap<span className="text-red-500">*</span>
                  </Label>
                  <Input type="text" id="nama" name="nama" placeholder="Masukkan nama lengkap Anda" />
                </div>
                {/* Email */}
                <div>
                  <Label htmlFor="email">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input type="email" id="email" name="email" placeholder="Masukkan email Anda" />
                </div>
                {/* Rumah Sakit */}
                <div>
                  <Label htmlFor="rumah_sakit">
                    Rumah Sakit<span className="text-red-500">*</span>
                  </Label>
                  <Input type="text" id="rumah_sakit" name="rumah_sakit" placeholder="Nama rumah sakit tempat Anda bekerja" />
                </div>
                {/* Password */}
                <div>
                  <Label htmlFor="password">
                    Password<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input id="password" name="password" placeholder="Masukkan password Anda" type={showPassword ? "text" : "password"} />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 dark:fill-gray-400 size-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 4.5C7.306 4.5 3.328 7.218 1.5 12c1.828 4.782 5.806 7.5 10.5 7.5s8.672-2.718 10.5-7.5c-1.828-4.782-5.806-7.5-10.5-7.5zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 dark:fill-gray-400 size-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.99 4.502c-4.499 0-8.243 2.718-10.5 7.498 2.257 4.782 6.001 7.498 10.5 7.498s8.243-2.716 10.5-7.498c-2.257-4.78-6.001-7.498-10.5-7.498zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM12 7.5c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <Checkbox className="mt-1 w-5 h-5" checked={isChecked} onChange={setIsChecked} />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Dengan membuat akun, Anda menyetujui
                    <span className="text-teal-600 dark:text-teal-400 font-semibold"> Syarat dan Ketentuan</span>, dan
                    <span className="text-teal-600 dark:text-teal-400 font-semibold"> Kebijakan Privasi</span> kami.
                  </p>
                </div>
                {/* Button */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-full bg-teal-500 shadow-lg hover:bg-teal-600">Sign Up</button>
                </div>
              </div>
            </form>
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
