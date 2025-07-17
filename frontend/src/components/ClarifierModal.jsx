export default function ClarifierModal({ questions, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">We need more info</h2>
        <ul className="list-disc pl-6 mb-4 text-gray-700">
          {questions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
