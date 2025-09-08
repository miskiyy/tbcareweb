import React from "react";
import { motion } from "framer-motion";
import "./Landing.css"; // Menggunakan file CSS yang sama untuk animasi latar belakang

const Download = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Background with gradient, oval, and bubbles */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 to-white/90"></div>
        <div className="absolute bottom-0 w-[150%] h-[150px] left-1/2 -translate-x-1/2 rounded-t-[50%] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-500"></div>
        </div>
        <div className="hidden md:block">
          <div className="absolute top-10 left-10 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute top-1/4 right-10 w-24 h-24 bg-cyan-200 rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute bottom-1/2 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-300 rounded-full opacity-30 animate-float-fast"></div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div className="relative z-10 container mx-auto px-6 py-24 mt-20 text-center flex flex-col items-center" variants={containerVariants} initial="hidden" animate="visible">
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Left: App Screenshot */}
          <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <img src="/images/device/mobile.png" alt="TBCare App Screenshot" className="w-full max-w-lg mx-auto md:mx-0 rounded-3xl shadow-xl border-4 border-white" />
          </motion.div>

          {/* Right: Text and Buttons */}
          <motion.div className="w-full md:w-1/2 text-center md:text-left" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-4">Dapatkan Aplikasi Kami</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
              Uji potensi TBC Anda dengan mudah di mana saja dan kapan saja. Aplikasi TBCare Mobile membantu Anda melakukan pra-skrining dengan teknologi suara batuk yang inovatif.
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full shadow-lg hover:bg-teal-700 transition-colors"
              >
                <img src="https://www.gstatic.com/images/branding/product/2x/play_store_48dp.png" alt="Google Play" className="h-6 w-6 mr-2" />
                Download di Google Play
              </motion.a>
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-300"
              >
                <img src="https://www.gstatic.com/images/branding/product/2x/app_store_48dp.png" alt="App Store" className="h-6 w-6 mr-2" />
                Download di App Store
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Download;
