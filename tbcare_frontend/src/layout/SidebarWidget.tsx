export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-teal-400 px-4 py-5 text-center shadow-lg`}
    >
      <h3 className="mb-2 font-semibold text-white">Ada pertanyaan?</h3>
      <p className="mb-4 text-white-200 text-theme-sm">Hubungi kami jika Anda bingung atau butuh bantuan.</p>
      <a
        href="https://wa.me/628123456789" // Ganti dengan nomor WhatsApp Anda
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-3 font-medium text-white rounded-full bg-teal-700 text-theme-sm hover:bg-teal-600 transition-colors"
      >
        Hubungi Kami
      </a>
    </div>
  );
}
