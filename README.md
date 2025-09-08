"# tbcareweb" 
---
Notes aja krn ak sk lupa
## 🔹 1. Bikin Akun Google Cloud

* Daftar / login: [Google Cloud Console](https://console.cloud.google.com/)
* Baru daftar biasanya dapat **free credit \$300 (≈ Rp 4,5 juta)** buat 90 hari → bisa dipakai untuk coba semua layanan tanpa bayar.

👉 Jadi kamu **belum perlu langsung langganan** kecuali kreditnya habis.

---

## 🔹 2. Layanan yang Perlu Kamu Aktifkan

Untuk project kamu, cukup ini aja:

1. **Firebase** (free tier cukup):

   * [Firebase Console](https://console.firebase.google.com/)
   * Aktifkan **Firebase Hosting** (buat React frontend).
   * Aktifkan **Firebase Storage** (buat simpan file audio dari Raspi).
   * Kalau mau metadata ringan bisa juga aktifkan **Firestore**.

2. **Cloud Run** (backend FastAPI + model):

   * Layanan serverless buat jalanin aplikasi FastAPI.
   * Pricing: free tier 2 juta requests/bulan → cukup buat project riset.
   * Docs: [Deploy FastAPI on Cloud Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-python-service)

3. **Cloud SQL** (MySQL/Postgres relational database):

   * Pricing: mulai dari **\$0.01/jam (\~Rp 150/jam)** tergantung instance.
   * Docs: [Cloud SQL Quickstart](https://cloud.google.com/sql/docs/mysql/quickstart)

---

## 🔹 3. Flow Rekomendasi

* **React frontend** → deploy di **Firebase Hosting** (gratis quota).
* **FastAPI backend** (plus model ML) → deploy ke **Cloud Run**.
* **Database SQL** → pakai **Cloud SQL (Postgres/MySQL)**.
* **File Audio** → simpan di **Firebase Storage**, FastAPI hanya simpan URL.
* **(Opsional)** Firestore → untuk metadata ringan atau caching.

---

## 🔹 4. Langganan yang Perlu

* **Google Cloud Free Tier** dulu aja (pakai \$300 kredit).
* Setelah itu:

  * **Cloud Run** → bayar per request (murah banget, free quota ada).
  * **Cloud SQL** → ini yang agak mahal (mulai \~\$7/bulan kalau standby terus).
  * **Firebase Hosting + Storage** → ada **free tier lumayan besar**, cukup kalau traffic belum ribuan user.

👉 Jadi **paling butuh biaya rutin itu Cloud SQL**. Kalau masih riset, bisa pakai **Postgres gratis di Supabase/Neon** dulu, nanti pindah ke Cloud SQL pas production.

---

## 🔹 5. Next Step Buat Kamu

1. Buat project di [Google Cloud Console](https://console.cloud.google.com/).
2. Aktifkan **Firebase Hosting** → deploy React.
3. Aktifkan **Cloud Run** → deploy FastAPI pakai Docker.
4. Pilih mau pake **Cloud SQL** (bayar) atau dulu coba **Supabase (gratis)** buat relational database.

---

Mau aku bikinin **2 versi roadmap** buat kamu?

* **Versi hemat (pakai gratisan full)** → Firebase + Supabase + Cloud Run free tier.
* **Versi production (pakai GCP full)** → Firebase + Cloud SQL + Cloud Run.

Biar kamu bisa milih sesuai kebutuhan & budget 👀
