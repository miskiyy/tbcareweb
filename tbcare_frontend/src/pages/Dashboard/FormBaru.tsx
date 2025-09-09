import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ChevronLeftIcon } from "lucide-react";

// Global variables from the environment
const firebaseConfig = JSON.parse(typeof __firebase_config !== "undefined" ? __firebase_config : "{}");
const initialAuthToken = typeof __initial_auth_token !== "undefined" ? __initial_auth_token : null;
const appId = typeof __app_id !== "undefined" ? __app_id : "default-app-id";

const PatientForm = () => {
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    riwayat_tb: false,
    riwayat_tb_paru: false,
    riwayat_tb_ekstrapulmonal: false,
    riwayat_tb_tidak_diketahui: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initFirebase = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const authService = getAuth(app);
        setDb(firestore);

        onAuthStateChanged(authService, (user) => {
          if (user) {
            setUserId(user.uid);
          } else {
            console.log("No user is signed in.");
          }
          setAuthReady(true);
        });

        if (initialAuthToken) {
          await signInWithCustomToken(authService, initialAuthToken);
        } else {
          await signInAnonymously(authService);
        }
      } catch (e) {
        console.error("Firebase initialization error: ", e);
      }
    };
    initFirebase();
  }, [initialAuthToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authReady || !db) {
      setMessage("Firebase is not ready yet. Please wait.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const pasienCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/pasien`);
      await addDoc(pasienCollectionRef, formData);
      setMessage("Data pasien berhasil disimpan!");
      setFormData({
        nik: "",
        nama: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        alamat: "",
        riwayat_tb: false,
        riwayat_tb_paru: false,
        riwayat_tb_ekstrapulmonal: false,
        riwayat_tb_tidak_diketahui: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("Gagal menyimpan data. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (!authReady) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link to="/dashboard" className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-teal-600 dark:text-gray-400 dark:hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Formulir Pasien Baru</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Silakan isi data pasien sesuai dengan informasi yang benar.</p>
          </div>

          {message && <div className={`p-4 mb-6 rounded-lg text-center ${message.includes("berhasil") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* NIK */}
              <div>
                <label htmlFor="nik" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  NIK<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  placeholder="Masukkan Nomor Induk Kependudukan"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Nama */}
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Nama Lengkap<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap pasien"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Jenis Kelamin</label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center">
                    <input type="radio" name="jenis_kelamin" value="Laki-laki" checked={formData.jenis_kelamin === "Laki-laki"} onChange={handleChange} className="form-radio text-teal-600 focus:ring-teal-500" />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name="jenis_kelamin" value="Perempuan" checked={formData.jenis_kelamin === "Perempuan"} onChange={handleChange} className="form-radio text-teal-600 focus:ring-teal-500" />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Perempuan</span>
                  </label>
                </div>
              </div>

              {/* Alamat */}
              <div>
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Alamat
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Masukkan alamat lengkap pasien"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                ></textarea>
              </div>

              {/* Riwayat TB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Riwayat Penyakit Tuberkulosis</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="riwayat_tb"
                      checked={formData.riwayat_tb}
                      onChange={handleChange}
                      className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                    />
                    <span className="text-gray-700 dark:text-gray-200">Pernah didiagnosis TB</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="riwayat_tb_paru"
                      checked={formData.riwayat_tb_paru}
                      onChange={handleChange}
                      className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                    />
                    <span className="text-gray-700 dark:text-gray-200">TB Paru</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="riwayat_tb_ekstrapulmonal"
                      checked={formData.riwayat_tb_ekstrapulmonal}
                      onChange={handleChange}
                      className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                    />
                    <span className="text-gray-700 dark:text-gray-200">TB Ekstrapulmonal</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="riwayat_tb_tidak_diketahui"
                      checked={formData.riwayat_tb_tidak_diketahui}
                      onChange={handleChange}
                      className="form-checkbox w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-teal-500"
                    />
                    <span className="text-gray-700 dark:text-gray-200">TB Tidak Diketahui</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors disabled:bg-gray-400">
                  {loading ? "Menyimpan..." : "Simpan Data Pasien"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
