export default function Card({ title, description }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100">
      <h3 className="text-lg font-bold text-[#0B759D] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
