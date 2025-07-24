import React, { useEffect, useState } from "react";
import { extractSectionsFromPrompt } from "../utils/extractSection";
import { Loader } from "lucide-react";

const shimmer =
  "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse";

const DynamicSectionLoader = ({ prompt }) => {
  const [sections, setSections] = useState([]);
  const [loaded, setLoaded] = useState([]);

  useEffect(() => {
    const extracted = extractSectionsFromPrompt(prompt);
    setSections(extracted);
    setLoaded([]);

    let i = 0;
    const interval = setInterval(() => {
      setLoaded((prev) => [...prev, extracted[i]]);
      i++;
      if (i >= extracted.length) {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [prompt]);

  return (
    <div className="bg-gray-950 text-white max-h-[500px] overflow-y-auto rounded-lg p-6 w-full max-w-xl mx-auto border border-gray-800 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-pink-400">
        Generating your site... Please wait ⏳
      </h2>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div
            key={section}
            className={`rounded-lg p-4 ${
              loaded.includes(section)
                ? "bg-gray-900 border border-green-500"
                : "bg-gray-800 border border-gray-700"
            } transition-all duration-300`}
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-300">
                {idx + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
              </p>
              {loaded.includes(section) ? (
                <span className="text-green-400 font-bold animate-pulse">
                  ✔
                </span>
              ) : (
                <Loader className="w-4 h-4 text-gray-400 animate-spin" />
              )}
            </div>

            <div className="space-y-2">
              {loaded.includes(section) ? (
                <p className="text-sm text-gray-400">
                  Section generated successfully.
                </p>
              ) : (
                <>
                  <div className={`h-4 rounded ${shimmer}`} />
                  <div className={`h-4 w-3/4 rounded ${shimmer}`} />
                  <div className={`h-3 w-1/2 rounded ${shimmer}`} />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicSectionLoader;
