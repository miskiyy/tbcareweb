import React from "react";
import { motion } from "framer-motion";
import "./Landing.css";

const Home = () => {
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

  const toolItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background z-0 pointer-events-none"></div>

      {/* Background with gradient, oval, and bubbles */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {/* Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 to-white/90"></div>

        {/* Oval Shape */}
        <div className="absolute bottom-0 w-[150%] h-[250px] left-1/2 -translate-x-1/2 rounded-t-[50%] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-500"></div>
        </div>

        {/* Bubble Decorations */}
        <div className="hidden md:block">
          <div className="absolute top-10 left-10 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute top-1/4 right-10 w-24 h-24 bg-cyan-200 rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute bottom-1/2 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-300 rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-cyan-100 rounded-full opacity-20 blur-xl animate-float-slow"></div>
          <div className="absolute top-[80%] left-[80%] w-24 h-24 bg-orange-200 rounded-full opacity-40 animate-float-fast"></div>
        </div>

        {/* versi kecil untuk mobile */}
        <div className="md:hidden">
          <div className="absolute top-12 left-6 w-10 h-10 bg-teal-200 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute top-1/3 right-6 w-14 h-14 bg-cyan-200 rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-orange-200 rounded-full opacity-40 animate-float-slow"></div>
        </div>
      </div>

      {/* Main Content Section */}
      <motion.div className="relative z-10 container mx-auto px-4 py-16 pt-32 text-center flex items-center justify-between" variants={containerVariants} initial="hidden" animate="visible">
        {/* Left Image */}
        <motion.img src="/images/monster.png" alt="Monster" className="hidden md:block w-1/4 max-w-sm" whileHover={{ scale: 1.05, rotate: 3, y: -5 }} transition={{ type: "spring", stiffness: 200 }} />

        {/* Text Content */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] max-w-xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600 leading-tight max-w-2xl text-center">
            Know Your Cough,
            <br />
            Get The Right Treatment
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-lg text-center">Sistem pintar untuk mendeteksi potensi TBC dari suara batuk, membantu pasien & dokter mendapatkan solusi lebih cepat dan tepat.</p>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="mt-8 px-8 py-3 bg-orange-400 text-white font-semibold rounded-full shadow-lg hover:bg-orange-500 transition">
            Log In
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.img src="/images/device.png" alt="Device" className="hidden md:block w-1/3 max-w-sm" whileHover={{ scale: 1.05, rotate: -3, y: -5 }} transition={{ type: "spring", stiffness: 200 }} />
      </motion.div>

      {/* Scroll Banner Section */}
      <div className="w-full relative z-20 overflow-visible py-6">
        <div className="relative w-[200%] left-1/2 -translate-x-1/2 rotate-[-3deg]">
          <div className="h-24 bg-[url('/images/banner.png')] bg-repeat-x animate-scrollBanner" style={{ backgroundSize: "auto 100%" }}></div>
        </div>
      </div>

      {/* Our Tools Section */}
      <div className="relative z-20 container mx-auto px-6 py-20">
        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-teal-500" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          Our Systems
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Hardware */}
          <motion.div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition" variants={toolItemVariants}>
            <motion.img whileHover={{ scale: 1.1 }} src="/images/device/Hardware.png" alt="Hardware" className="h-32 mb-6" />
            <h3 className="text-xl font-bold text-teal-600 mb-4">Hardware</h3>
            <p className="text-gray-600">
              Perangkat khusus yang digunakan untuk merekam dan menganalisis suara batuk pasien. Hardware ini dilengkapi sensor audio dengan sensitivitas tinggi untuk mendeteksi pola yang relevan dengan indikasi TBC.
            </p>
          </motion.div>

          {/* Web */}
          <motion.div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition" variants={toolItemVariants}>
            <motion.img whileHover={{ scale: 1.1 }} src="/images/device/Web.png" alt="Web Dashboard" className="h-32 mb-6" />
            <h3 className="text-xl font-bold text-teal-600 mb-4">Web</h3>
            <p className="text-gray-600">Platform berbasis web untuk dokter dan tenaga medis dalam mengelola data pasien, melihat hasil analisis, serta memantau riwayat kesehatan secara real-time dengan tampilan dashboard interaktif.</p>
          </motion.div>

          {/* Mobile App */}
          <motion.div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition" variants={toolItemVariants}>
            <motion.img whileHover={{ scale: 1.1 }} src="/images/device/mobile.png" alt="Mobile App" className="h-32 mb-6" />
            <h3 className="text-xl font-bold text-teal-600 mb-4">Mobile App</h3>
            <p className="text-gray-600">Aplikasi mobile yang memudahkan pasien melakukan self-check, mengunggah rekaman batuk, serta mendapatkan rekomendasi awal sebelum melakukan pemeriksaan lanjutan ke tenaga medis.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
