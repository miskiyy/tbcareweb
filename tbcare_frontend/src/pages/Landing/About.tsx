import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Landing.css";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const images = [
    { src: "/images/berita1.png", alt: "berita 1" },
    { src: "/images/berita2.png", alt: "berita 2" },
    { src: "/images/berita3.png", alt: "berita 3" },
    { src: "/images/berita4.png", alt: "Mberita 4" },
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

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

  const teamMembers = [
    { name: "Nathania", role: "Project Manager", img: "/images/team/nathania.png" },
    { name: "Miskiyah", role: "Website & Design", img: "/images/team/smiski.png" },
    { name: "Faisal", role: "AI & Data", img: "/images/team/faisal.png" },
    { name: "Rizki", role: "Mobile App", img: "/images/team/rizki.png" },
    { name: "Stanis", role: "Hardware & IoT", img: "/images/team/stanis.png" },
  ];

  const handleNext = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const getCardVariants = (index) => {
    const total = teamMembers.length;
    const offset = (index - currentTeamIndex + total) % total;

    if (offset === 0) return "center";
    if (offset === 1) return "right";
    if (offset === total - 1) return "left";
    return "hidden";
  };

  const cardVariants = {
    center: {
      x: "0%",
      scale: 1.05,
      opacity: 1,
      zIndex: 30,
      rotate: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    left: {
      x: "-100%",
      scale: 0.9,
      opacity: 0.7,
      zIndex: 20,
      rotate: -5,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    right: {
      x: "100%",
      scale: 0.9,
      opacity: 0.7,
      zIndex: 20,
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hidden: {
      x: "0%",
      scale: 0.8,
      opacity: 0,
      zIndex: 10,
    },
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background z-0 pointer-events-none"></div>
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none animate-pan"></div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/80 to-white/90"></div>
        <div className="absolute bottom-0 w-[150%] h-[250px] left-1/2 -translate-x-1/2 rounded-t-[50%] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-500"></div>
        </div>
        {/* Bubble Decorations */}
        <div className="hidden md:block">
          <div className="absolute top-10 left-10 w-16 h-16 bg-teal-200 rounded-full opacity-30 animate-float-slow"></div>
          <div className="absolute top-1/4 right-10 w-24 h-24 bg-cyan-200 rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute bottom-1/2 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-teal-300 rounded-full opacity-30 animate-float-fast"></div>
        </div>
      </div>

      <motion.div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Intro */}
        <section className="text-center mb-20 max-w-4xl mt-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-6">About TBCare</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Project ini didanai oleh <b>Belmawa - Dikti - Kemendiktisaintek RI</b> dan digarap oleh tim <b>PKM-KC Institut Teknologi Sepuluh Nopember</b>.
          </p>
        </section>

        {/* Proposal */}
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-teal-600 mb-6">Sistem Peringatan Dini Tuberkulosis Berdasarkan Suara Batuk dengan Menggunakan Model Deep Learning Sebagai Upaya Eliminasi Tuberkulosis 2030</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              <b>TBCare</b> adalah sebuah sistem inovatif yang dikembangkan untuk menjawab tantangan Tuberkulosis di Indonesia. TBCare memanfaatkan teknologi kecerdasan buatan dengan <b>menganalisis suara batuk</b> sebagai alat pra-skrining
              yang cepat, non-invasif, dan mudah diakses.
              <br />
              <br />
              Misi TBCare adalah menghadirkan teknologi pra-skrining Tuberkulosis yang dapat mendukung upaya <b>Indonesia Eliminasi Tuberkulosis 2030</b> dan menciptakan masa depan Indonesia yang lebih sehat.
            </p>
          </div>
          {/* Stacked Image Carousel */}
          <div className="relative w-full h-80 md:h-96">
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.alt}
                  className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
                  style={{
                    transformOrigin: "center center",
                    transform: `translate(-${(currentImageIndex - index) * 10}px, ${(currentImageIndex - index) * 10}px) rotate(${(currentImageIndex - index) * 5}deg) scale(${1 - Math.abs(currentImageIndex - index) * 0.1})`,
                    zIndex: images.length - Math.abs(currentImageIndex - index),
                    opacity: 1 - Math.abs(currentImageIndex - index) * 0.2,
                  }}
                  animate={{
                    x: (index - currentImageIndex) * 20,
                    y: (index - currentImageIndex) * 10,
                    opacity: 1 - Math.abs(index - currentImageIndex) * 0.2,
                    scale: 1 - Math.abs(index - currentImageIndex) * 0.1,
                    zIndex: images.length - Math.abs(index - currentImageIndex),
                    rotate: (index - currentImageIndex) * 5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/50 rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/50 rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Quote */}
        <motion.div
          className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-3xl shadow-xl p-10 md:p-16 text-center max-w-5xl mb-24"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-1xl md:text-3xl font-semibold leading-relaxed">“Teknologi hadir bukan hanya untuk mempermudah, tapi juga untuk menyelamatkan nyawa. Bersama TBCare, mari wujudkan Indonesia bebas Tuberkulosis 2030.”</p>
        </motion.div>

        {/* Full Width Image */}
        {/* <section className="w-full mb-24">
          <div className="w-full h-[400px] md:h-[300px] overflow-hidden rounded-3xl shadow-lg">
            <img src="/images/filler.png" alt="Full Width Banner" className="w-full" />
          </div>
        </section> */}

        {/* Our Team Section */}
        <motion.section className="w-full max-w-6xl mb-24 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
          <h3 className="text-5xl font-bold text-teal-500 mb-14">Our Team</h3>
          <div className="relative flex justify-center items-center w-full min-h-[380px]">
            <AnimatePresence initial={false}>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="absolute w-[85%] md:w-[28%]"
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={getCardVariants(index)}
                  exit={{ opacity: 0, scale: 0.8, y: -40 }}
                  variants={cardVariants}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center py-6 px-4">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-teal-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img src={member.img} alt={`Team Member ${member.name}`} className="w-full h-full object-contain" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-700 mb-1">{member.name}</h4>
                    <p className="text-teal-500 font-medium mb-2">{member.role}</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-semibold shadow">TBCare Team</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={handlePrev} className="absolute left-4 md:-left-12 p-3 bg-white/80 rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors z-40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={handleNext} className="absolute right-4 md:-right-12 p-3 bg-white/80 rounded-full shadow-lg text-gray-800 hover:bg-white transition-colors z-40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.section>

        {/* Instagram Section */}
        <motion.section
          className="w-full max-w-6xl p-6 md:p-12 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-orange-500 mb-4">Ikuti Perjalanan Kami!</h3>
            <p className="text-gray-600 mb-6">Dapatkan informasi terbaru mengenai perkembangan TBCare, riset, dan berita seputar teknologi kesehatan langsung dari kami.</p>
            <motion.a
              href="https://instagram.com/tbcare.its"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Follow us on Instagram
            </motion.a>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-80 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <img src="/images/ig.png" alt="Preview Instagram" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;
