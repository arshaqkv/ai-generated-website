export default function ClarifierModal({ questions, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4 text-white">We need more info</h2>

        <ul className="list-disc pl-6 mb-4 text-gray-200 space-y-2">
          {questions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>

        <button
          className="bg-pink-800 cursor-pointer text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
