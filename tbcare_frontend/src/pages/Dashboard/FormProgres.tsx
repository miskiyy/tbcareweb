import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { ChevronLeftIcon } from "lucide-react";
import { auth, db } from "../../services/firebase";

const appId = "default-app-id"; // ganti sesuai kebutuhan

const ProgressForm = () => {
  const { pasienId } = useParams();
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [pasienData, setPasienData] = useState(null);
  const [formData, setFormData] = useState({
    tanggal_pemeriksaan: new Date().toISOString().split("T")[0],
    tinggi_badan: "",
    berat_badan: "",
    detak_jantung: "",
    suhu_tubuh: "",
    durasi_batuk: "",
    hemoptisis: false,
    penurunan_berat_badan: false,
    demam: false,
    keringat_malam: false,
    merokok_7_hari_terakhir: false,
    diagnosis_dokter: "",
    diagnosis_ml_final: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setAuthReady(true);
        // Ambil data pasien setelah user terotentikasi
        if (pasienId) {
          const docRef = doc(db, `artifacts/${appId}/users/${user.uid}/pasien`, pasienId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPasienData(docSnap.data());
          } else {
            setMessage("Data pasien tidak ditemukan.");
          }
        }
      } else {
        setAuthReady(false);
      }
    });
    return () => unsubscribe();
  }, [pasienId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authReady || !db || !pasienId) {
      setMessage("Firebase or pasien data is not ready yet. Please wait.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const pemeriksaanCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pemeriksaan`);
      const newPemeriksaan = {
        ...formData,
        id_pasien: pasienId,
        id_dokter: userId,
        tanggal_pemeriksaan: new Date(),
      };
      await addDoc(pemeriksaanCollectionRef, newPemeriksaan);
      setMessage("Data pemeriksaan berhasil disimpan!");
      setFormData({
        tanggal_pemeriksaan: new Date().toISOString().split("T")[0],
        tinggi_badan: "",
        berat_badan: "",
        detak_jantung: "",
        suhu_tubuh: "",
        durasi_batuk: "",
        hemoptisis: false,
        penurunan_berat_badan: false,
        demam: false,
        keringat_malam: false,
        merokok_7_hari_terakhir: false,
        diagnosis_dokter: "",
        diagnosis_ml_final: "",
      });
    } catch (e) {
      setMessage("Gagal menyimpan data. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!authReady || !pasienData) {
    return <div className="text-center py-10">Memuat data...</div>;
  }

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to={`/dashboard/data/pasien/${pasienId}`} className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-gray-300">
          <ChevronLeftIcon className="size-5" />
          Kembali ke Detail Pasien
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Formulir Pemeriksaan Pasien</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Isi formulir berikut untuk mencatat pemeriksaan baru.</p>
          </div>

          {message && <div className={`p-4 mb-6 rounded-lg text-center ${message.includes("berhasil") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</div>}

          <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Informasi Pasien</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Nama:</strong> {pasienData.nama}
              </p>
              <p>
                <strong>NIK:</strong> {pasienData.nik}
              </p>
              <p>
                <strong>Tanggal Lahir:</strong> {pasienData.tanggal_lahir}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Data Fisik */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Data Fisik</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tinggi_badan" className="block text-xs text-gray-500 mb-1">
                      Tinggi Badan (cm)
                    </label>
                    <input
                      type="number"
                      id="tinggi_badan"
                      name="tinggi_badan"
                      value={formData.tinggi_badan}
                      onChange={handleChange}
                      placeholder="Tinggi"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="berat_badan" className="block text-xs text-gray-500 mb-1">
                      Berat Badan (kg)
                    </label>
                    <input
                      type="number"
                      id="berat_badan"
                      name="berat_badan"
                      value={formData.berat_badan}
                      onChange={handleChange}
                      placeholder="Berat"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="detak_jantung" className="block text-xs text-gray-500 mb-1">
                      Detak Jantung (bpm)
                    </label>
                    <input
                      type="number"
                      id="detak_jantung"
                      name="detak_jantung"
                      value={formData.detak_jantung}
                      onChange={handleChange}
                      placeholder="Detak"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="suhu_tubuh" className="block text-xs text-gray-500 mb-1">
                      Suhu Tubuh (°C)
                    </label>
                    <input
                      type="number"
                      id="suhu_tubuh"
                      name="suhu_tubuh"
                      value={formData.suhu_tubuh}
                      onChange={handleChange}
                      placeholder="Suhu"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Gejala */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Gejala yang Dilaporkan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="durasi_batuk" className="block text-xs text-gray-500 mb-1">
                      Durasi Batuk (hari)
                    </label>
                    <input
                      type="number"
                      id="durasi_batuk"
                      name="durasi_batuk"
                      value={formData.durasi_batuk}
                      onChange={handleChange}
                      placeholder="Durasi"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="hemoptisis"
                        checked={formData.hemoptisis}
                        onChange={handleChange}
                        className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                      />
                      <span className="text-gray-700 dark:text-gray-200">Hemoptisis (batuk darah)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="penurunan_berat_badan"
                        checked={formData.penurunan_berat_badan}
                        onChange={handleChange}
                        className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                      />
                      <span className="text-gray-700 dark:text-gray-200">Penurunan Berat Badan</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="demam"
                        checked={formData.demam}
                        onChange={handleChange}
                        className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                      />
                      <span className="text-gray-700 dark:text-gray-200">Demam</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="keringat_malam"
                        checked={formData.keringat_malam}
                        onChange={handleChange}
                        className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                      />
                      <span className="text-gray-700 dark:text-gray-200">Keringat Malam</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Riwayat Gaya Hidup */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Riwayat Gaya Hidup</label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="merokok_7_hari_terakhir"
                    checked={formData.merokok_7_hari_terakhir}
                    onChange={handleChange}
                    className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Merokok dalam 7 hari terakhir</span>
                </label>
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Diagnosis</label>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="diagnosis_dokter" className="block text-xs text-gray-500 mb-1">
                      Diagnosis Dokter
                    </label>
                    <input
                      type="text"
                      id="diagnosis_dokter"
                      name="diagnosis_dokter"
                      value={formData.diagnosis_dokter}
                      onChange={handleChange}
                      placeholder="Diagnosis berdasarkan pemeriksaan dokter"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="diagnosis_ml_final" className="block text-xs text-gray-500 mb-1">
                      Diagnosis ML Final
                    </label>
                    <input
                      type="text"
                      id="diagnosis_ml_final"
                      name="diagnosis_ml_final"
                      value={formData.diagnosis_ml_final}
                      onChange={handleChange}
                      placeholder="Diagnosis dari model ML (jika ada)"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors disabled:bg-gray-400">
                  {loading ? "Menyimpan..." : "Simpan Pemeriksaan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgressForm;
