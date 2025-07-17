import { useState } from "react";
import { toast } from "react-hot-toast";

export default function PromptForm({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return toast.error("Enter a prompt");
    onGenerate(prompt);
  };

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <label className="block font-medium mb-2">Describe your website</label>
      <textarea
        className="w-full p-3 border rounded resize-none focus:ring focus:outline-none"
        rows={4}
        placeholder="e.g., A modern course selling site with a hero, curriculum, FAQ, testimonials..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />
      <div className="flex justify-center">
        <button
          className="mt-3 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-800 hover:cursor-pointer disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <p className=" animate-pulse">Generating webpage...</p> : <p>Generate Webpage</p> }
        </button>
      </div>
    </div>
  );
}
