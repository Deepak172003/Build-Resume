import React, { useState, useRef, useEffect } from "react";
import { resumeTemplates } from "../utils/data";
import Tabs from "../components/Tabs";
import { TemplateCard } from "./Cards";
import RenderResume from "./RenderResume"; // ✅ make sure this exists
import { DUMMY_RESUME_DATA } from "../utils/constants"; // ✅ fallback dummy data

// Tab data
const TAB_DATA = [{ label: "Templates", value: "templates" }];

const ThemeSelector = ({ selectedTheme, setSelectedTheme, resumeData, onClose }) => {
  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);

  // Function to update base width
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  // Find initial index
  const initialIndex = resumeTemplates.findIndex((t) => t.id === selectedTheme);
  const [themeState, setThemeState] = useState({
    theme: selectedTheme || (resumeTemplates[0]?.id || ""),
    index: initialIndex >= 0 ? initialIndex : 0,
  });

  const [tabValue, setTabValue] = useState("templates");

  const handleThemeSelect = (id, index) => {
    setThemeState({ theme: id, index });
    setSelectedTheme(id);
  };

  const handleApplyTheme = () => {
    if (themeState.theme) {
      setSelectedTheme(themeState.theme);
    }
    onClose();
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100">
        <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
        <button
          onClick={onClose}
          className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Templates grid */}
        <div className="lg:col-span-2">
          {tabValue === "templates" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resumeTemplates.map((template, idx) => (
                <TemplateCard
                  key={template.id}
                  thumbnailImg={template.thumbnail}
                  isSelected={themeState.index === idx}
                  onSelect={() => handleThemeSelect(template.id, idx)}
                />
              ))}
            </div>
          )}

          {/* Confirm button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleApplyTheme}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              Apply Theme
            </button>
          </div>
        </div>

        {/* Right: Resume Preview */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <div ref={resumeRef}>
            <RenderResume
              templateId={themeState.theme}
              resumeData={resumeData || DUMMY_RESUME_DATA}
              containerWidth={baseWidth} // ✅ fixed typo
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
