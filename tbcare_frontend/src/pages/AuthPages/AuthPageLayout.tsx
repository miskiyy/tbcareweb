import React from "react";
import { Link } from "react-router-dom";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-teal-50 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            {/* Ini bisa diganti dengan SVG atau div dengan gradasi jika tidak ada GridShape component */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500 opacity-20 blur-3xl"></div>
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img width={231} height={48} src="/images/logo.png" alt="TBCare Logo" />
              </Link>
              <p className="text-center text-teal-400 dark:text-white/60">Sistem Peringatan Dini Tuberkulosis Berdasarkan Suara Batuk</p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          {/* Ini adalah placeholder untuk ThemeTogglerTwo */}
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
