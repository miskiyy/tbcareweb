import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import Chart from "react-apexcharts";
import { auth, db } from "../../services/firebase";

const appId = "default-app-id"; // ganti sesuai kebutuhan

const Data = () => {
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [pemeriksaanData, setPemeriksaanData] = useState([]);
  const [pasienMap, setPasienMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const chartData = {
    series: [
      { name: "TBC", data: [440, 350, 410, 500, 200, 410, 360] },
      { name: "Non-TBC", data: [230, 150, 180, 280, 150, 250, 300] },
    ],
    options: {
      chart: { type: "bar", height: 350 },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] },
      yaxis: { title: { text: "Jumlah Pasien" } },
      fill: { opacity: 1 },
      colors: ["#00B0FF", "#4C8092"],
      tooltip: { y: { formatter: (val) => val + " pasien" } },
    },
  };

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthReady(true);
      } else {
        setAuthReady(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db || !userId) return;

    setLoading(true);
    const pasienCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pasien`);
    const pemeriksaanCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pemeriksaan`);

    const unsubPasien = onSnapshot(pasienCollectionRef, (snapshot) => {
      const tempPasienMap = {};
      snapshot.forEach((doc) => {
        tempPasienMap[doc.id] = doc.data();
      });
      setPasienMap(tempPasienMap);
    });

    const unsubPemeriksaan = onSnapshot(pemeriksaanCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPemeriksaanData(data);
      setLoading(false);
    });

    return () => {
      unsubPasien();
      unsubPemeriksaan();
    };
  }, [db, userId]);

  if (!authReady || loading) {
    return <div className="text-center py-10">Memuat data...</div>;
  }

  const filteredData = pemeriksaanData.filter((item) => {
    const pasien = pasienMap[item.id_pasien];
    if (!pasien) return false;
    const nameMatch = pasien.nama?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch;
  });

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-6">Weekly Activity</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Data</h3>
        <div className="relative">
          <input type="text" placeholder="Cari pasien..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500" />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hasil Pre-Test</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((pemeriksaan, index) => (
                <tr key={pemeriksaan.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pemeriksaan.tanggal_pemeriksaan && pemeriksaan.tanggal_pemeriksaan.toDate ? new Date(pemeriksaan.tanggal_pemeriksaan.toDate()).toLocaleDateString() : "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pasienMap[pemeriksaan.id_pasien]?.nama || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pemeriksaan.diagnosis_ml_final || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pemeriksaan.diagnosis_dokter || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/dashboard/data/pasien/${pemeriksaan.id_pasien}`} className="text-teal-600 hover:text-teal-900 font-semibold">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Data;
