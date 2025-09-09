import React, { useState, useEffect } from "react";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "AIzaSyDc5dG6jIJ_RsgAiq4HYODitqz9dH_P1qc"; // Google API Key kamu
      const cx = "4607bfa11506a49ca"; // CX dari Programmable Search Engine
      const query = "tuberculosis";

      const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        const formatted = data.items.map((item) => ({
          title: item.title,
          description: item.snippet,
          url: item.link,
          urlToImage: item.pagemap?.cse_image?.[0]?.src || null,
          publishedAt: null, // Google Search biasanya ga ada tanggal publish
          source: { name: new URL(item.link).hostname },
        }));

        setNews(formatted.slice(0, 4)); // ambil 4 berita (1 besar + 3 kecil)
      } catch (e) {
        setError("Failed to fetch news from Google Custom Search.");
        console.error("Error fetching news:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-teal-50 to-teal-100 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-10">Halo, Dr. X 👋</h2>

      {/* TBNews Section */}
      <section className="mb-14">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-teal-500 inline-block pb-1">📰 TBNews</h3>
        {loading && <p className="text-center text-gray-500">Memuat berita...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Berita besar di kiri */}
          {news[0] && (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="relative w-full">
                <img src={news[0].urlToImage || "https://placehold.co/800x450/E2E8F0/1E293B?text=No+Image"} alt={news[0].title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-sm text-gray-500">
                    {news[0].source.name} •{" "}
                    {new Date(news[0].publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <h4 className="font-bold text-2xl text-gray-900 mt-2 line-clamp-2">{news[0].title}</h4>
                  <p className="text-gray-600 mt-3 line-clamp-3">{news[0].description}</p>
                </div>
                <a href={news[0].url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 font-semibold text-sm mt-4 inline-block">
                  Baca Selengkapnya →
                </a>
              </div>
            </div>
          )}

          {/* 3 berita kecil di kanan */}
          <div className="grid grid-rows-3 gap-6 h-full">
            {news.slice(1, 4).map((article, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden flex">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <img src={article.urlToImage || "https://placehold.co/200x200/E2E8F0/1E293B?text=No+Image"} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs text-gray-500">
                      {article.source.name} •{" "}
                      {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h4 className="font-semibold text-md text-gray-800 mt-1 line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.description}</p>
                  </div>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 font-semibold text-xs mt-2 inline-block">
                    Baca →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Penggunaan Alat Section */}
      <section>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-teal-500 inline-block pb-1">⚙️ Cara Penggunaan Alat</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Steps */}
          <div className="space-y-6">
            {[
              "Perangkat dihubungkan dengan catu daya. Perangkat akan hidup secara otomatis tanpa perlu menekan tombol tertentu.",
              "Pada display akan tampak status fitur recording dan send wav dan juga ditampilkan informasi alamat server dan Edge IP yang terhubung dengan perangkat.",
              "Status recording dipastikan dalam kondisi active. Perekaman suara batuk dilakukan dengan menekan tombol berwarna biru sebanyak satu kali.",
              "Untuk data rekaman yang dikirim menuju server, perangkat Cough Analyzer dihubungkan dengan alamat server. Status send wav dipastikan dalam kondisi active",
              "Untuk data rekaman yang diakses secara langsung pada perangkat (status send wav dalam kondisi inactive), data rekaman tersimpan dalam memory perangkat dan dapat diakses dengan menghubungkan USB cable dan mengakses data dari perangkat lain.",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-bold shadow-md">{index + 1}</div>
                <p className="text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          {/* Illustration */}
          <div className="flex justify-center">
            <img src="/images/device.png" alt="Cough Analyzer Device" className="w-full max-w-sm drop-shadow-lg" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
