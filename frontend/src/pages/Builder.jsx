import { useState } from "react";
import axios from "axios";
import PromptForm from "../components/PromptForm";
import GrapesEditor from "../components/GrapesEditor";
import ClarifierModal from "../components/ClarifierModal";
import toast from "react-hot-toast";

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

      const data = await response.data;

      setHtml(data.html);
      if (data.missing_fields) {
        setClarify({ show: true, questions: data.suggest_questions });
      } else {
        setHtml(data.html);
      }
    } catch (error) {
      toast.error("Something went wrong. Check the console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      {!html && (
        <header className="bg-white shadow-md px-6 py-4">
          <h1 className="text-2xl font-semibold text-blue-800">
            Build your website with AI
          </h1>
        </header>
      )}

      {!html && (
        <main className="p-6 flex-1 bg-gray-50">
          <PromptForm onGenerate={handleGenerate} loading={loading} />
        </main>
      )}
      {html && <GrapesEditor html={html} />}

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
