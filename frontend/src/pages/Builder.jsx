import { useState } from "react";
import axios from "axios";
import PromptForm from "../components/PromptForm";
import GrapesEditor from "../components/GrapesEditor";
import ClarifierModal from "../components/ClarifierModal";
import toast from "react-hot-toast";
import { CommandIcon } from "lucide-react";

const BACKEND = import.meta.env.VITE_APP_BACKEND_URL;

const Builder = () => {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [clarify, setClarify] = useState({ show: false, questions: [] });

  const handleGenerate = async (userPrompt) => {
    setLoading(true);
    setHtml("");

    try {
      const response = await axios.post(`${BACKEND}/api/generate`, {
        prompt: userPrompt,
      });

      const data = response.data;

      if (data?.missing_fields) {
        setClarify({ show: true, questions: data.suggest_questions || [] });
      }

      if (data?.html) {
        setHtml(data.html);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-950 ">
      {!html ? (
        <div className="container mx-auto px-6 sm:px-6 py-12 flex flex-col items-center">
          <div className="flex animate-pulse w-fit  max-w-full items-center gap-2 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md mb-6">
            <CommandIcon className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-200 font-medium">
              AI-Powered Web Creation Studio
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight leading-tight text-center sm:text-left px-2">
              <span className="text-pink-300">Design stunning websites</span>
              <br />
              <span className="text-white">without writing code</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl text-center sm:text-left px-2">
              Experience the future of web development with our{" "}
              <span className="text-white font-semibold">
                AI-driven visual builder
              </span>
              . Launch polished, responsive websites in minutes—no technical
              skills required.
            </p>

            <div className="mt-6 ">
              <button className="bg-pink-900  cursor-pointer hover:transition ease-in hover:bg-pink-800 transition-all px-6 py-3 rounded-full text-base font-medium text-white shadow-md hover:shadow-lg">
                Build website now
              </button>
            </div>
          </div>

          <div className="mt-12 rounded-xl shadow">
            <PromptForm onGenerate={handleGenerate} loading={loading} />
          </div>
        </div>
      ) : (
        <GrapesEditor html={html} />
      )}

      {clarify.show && (
        <ClarifierModal
          questions={clarify.questions}
          onClose={() => setClarify({ show: false, questions: [] })}
        />
      )}
    </div>
  );
};

export default Builder;
