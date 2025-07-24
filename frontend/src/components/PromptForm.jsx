import { ArrowUp, CommandIcon, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DynamicSectionLoader from "./DynamicSectionLoader";

export default function PromptForm({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim())
      return toast.error("Please enter a prompt to continue.");
    onGenerate(prompt);
  };

  return (
    <>
      <div className=" bg-gray-900 rounded-2xl shadow-md p-6 space-y-4 max-w-xl mx-auto md:w-3xl sm:w-full border  border-gray-700 hover:shadow-pink-900 hover:transition duration-300">
        <label className="text-lg font-semibold text-gray-100 block">
          What would you like to generate?
        </label>

        <textarea
          className="w-full p-4 border border-gray-300 dark:border-gray-700  text-sm text-gray-900 dark:text-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-900 disabled:opacity-50"
          rows={4}
          placeholder="E.g. A modern course selling site with a hero, curriculum, FAQ, testimonials..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <div className="flex justify-center">
          <button
            className="w-full cursor-pointer sm:w-auto inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin ">
                <Loader className="w-5 h-5" />
              </span>
            ) : (
              <p className="flex gap-1 items-center">
                <span>Generate Webpage</span>
                <ArrowUp className="w-4 h-4 " />
              </p>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md max-h-svh">
            <DynamicSectionLoader prompt={prompt} />
          </div>
        </div>
      )}
    </>
  );
}
