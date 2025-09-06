import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Contoh pake NewsAPI
    fetch(`https://newsapi.org/v2/everything?q=tuberculosis&apiKey=YOUR_API_KEY`)
      .then((res) => res.json())
      .then((data) => setArticles(data.articles.slice(0, 4))); // ambil 4 berita
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Halo, Dr.X</h2>

      <div className="grid grid-cols-2 gap-4">
        {articles.map((a, i) => (
          <div key={i} className="bg-white shadow rounded p-4">
            <img src={a.urlToImage} alt="" className="rounded mb-2" />
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-600">{a.source.name}</p>
            <a href={a.url} target="_blank" rel="noreferrer" className="text-cyan-700 underline">
              Baca Selengkapnya
            </a>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Cara Penggunaan Alat</h2>
      <ul className="space-y-2">
        <li>🔌 Hubungkan perangkat dengan catu daya.</li>
        <li>🎙️ Pastikan status recording aktif sebelum digunakan.</li>
        <li>📡 Data otomatis dikirim ke server & cloud.</li>
      </ul>
    </div>
  );
}
