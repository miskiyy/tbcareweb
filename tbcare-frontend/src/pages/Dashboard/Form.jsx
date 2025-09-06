import { useState } from "react";

export default function Form() {
  const [activeTab, setActiveTab] = useState("pasien");

  const handleSubmitPasien = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Pasien Baru:", data);
    // TODO: kirim ke Firestore / FastAPI
  };

  const handleSubmitPemeriksaan = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Pemeriksaan Baru:", data);
    // TODO: kirim ke Firestore / FastAPI
  };

  return (
    <div className="p-6">
      {/* Tab Switch */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab("pasien")} className={`px-4 py-2 rounded ${activeTab === "pasien" ? "bg-cyan-600 text-white" : "bg-gray-200"}`}>
          Pasien Baru
        </button>
        <button onClick={() => setActiveTab("pemeriksaan")} className={`px-4 py-2 rounded ${activeTab === "pemeriksaan" ? "bg-cyan-600 text-white" : "bg-gray-200"}`}>
          Pemeriksaan
        </button>
      </div>

      {/* Form Pasien Baru */}
      {activeTab === "pasien" && (
        <form onSubmit={handleSubmitPasien} className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow">
          <input name="nik" placeholder="NIK" className="border p-2 rounded" required />
          <input name="nama" placeholder="Nama Lengkap" className="border p-2 rounded" required />
          <input type="date" name="tanggal_lahir" className="border p-2 rounded" />
          <select name="jenis_kelamin" className="border p-2 rounded">
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <textarea name="alamat" placeholder="Alamat" className="border p-2 rounded col-span-2" />

          {/* Riwayat TB */}
          <label className="col-span-2 font-semibold">Riwayat TB</label>
          <div className="flex gap-4 col-span-2">
            <label>
              <input type="checkbox" name="riwayat_tb" /> TB Sebelumnya
            </label>
            <label>
              <input type="checkbox" name="riwayat_tb_paru" /> TB Paru
            </label>
            <label>
              <input type="checkbox" name="riwayat_tb_ekstrapulmonal" /> TB Ekstrapulmonal
            </label>
            <label>
              <input type="checkbox" name="riwayat_tb_tidak_diketahui" /> Tidak Diketahui
            </label>
          </div>

          <button type="submit" className="col-span-2 bg-cyan-600 text-white px-4 py-2 rounded">
            Simpan Pasien
          </button>
        </form>
      )}

      {/* Form Pemeriksaan */}
      {activeTab === "pemeriksaan" && (
        <form onSubmit={handleSubmitPemeriksaan} className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow">
          <input type="number" name="id_pasien" placeholder="ID Pasien" className="border p-2 rounded" required />
          <input type="number" name="id_dokter" placeholder="ID Dokter" className="border p-2 rounded" required />
          <input type="datetime-local" name="tanggal_pemeriksaan" className="border p-2 rounded" />

          {/* Data Fisik */}
          <input type="number" step="0.01" name="tinggi_badan" placeholder="Tinggi (cm)" className="border p-2 rounded" />
          <input type="number" step="0.01" name="berat_badan" placeholder="Berat (kg)" className="border p-2 rounded" />
          <input type="number" name="detak_jantung" placeholder="Detak Jantung" className="border p-2 rounded" />
          <input type="number" step="0.01" name="suhu_tubuh" placeholder="Suhu Tubuh (°C)" className="border p-2 rounded" />

          {/* Gejala */}
          <input type="number" name="durasi_batuk" placeholder="Durasi Batuk (hari)" className="border p-2 rounded" />
          <label>
            <input type="checkbox" name="hemoptisis" /> Hemoptisis
          </label>
          <label>
            <input type="checkbox" name="penurunan_berat_badan" /> Penurunan BB
          </label>
          <label>
            <input type="checkbox" name="demam" /> Demam
          </label>
          <label>
            <input type="checkbox" name="keringat_malam" /> Keringat Malam
          </label>
          <label>
            <input type="checkbox" name="merokok_7_hari_terakhir" /> Merokok 7 Hari Terakhir
          </label>

          {/* Diagnosis */}
          <input name="diagnosis_dokter" placeholder="Diagnosis Dokter" className="border p-2 rounded col-span-2" />
          <input name="diagnosis_ml_final" placeholder="Diagnosis ML" className="border p-2 rounded col-span-2" />

          <button type="submit" className="col-span-2 bg-cyan-600 text-white px-4 py-2 rounded">
            Simpan Pemeriksaan
          </button>
        </form>
      )}
    </div>
  );
}
