import React from "react";
import { shimmerStyle } from "../assets/dummystyle";
import { Check } from "react-feather";


const StepProgress = ({ progress = 0 }) => {
  return (
    <>
      <style>{shimmerStyle}</style>

      <div className="relative w-full h-4 bg-white/5 backdrop-blur-2xl overflow-hidden rounded-full border border-white/10">
        {/* MAIN PROGRESS BAR */}
        <div
          className="relative h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-600 animate-pulse"
          style={{ width: `${progress}%` }}
        >
          {/* ANIMATED BUBBLES */}
          <div className="absolute inset-0 opacity-80">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg"
                style={{
                  left: `${(i + 1) * 12}%`,
                  animationDelay: `${i * 0.25}s`,
                  transform: "translateY(-50%)",
                }}
              />
            ))}
          </div>

          {/* PARTICLE EFFECTS */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SHIMMER EFFECT */}
      {progress > 0 && (
        <div
          className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
          style={{ left: `${Math.max(0, progress - 4)}%` }}
        />
      )}

      {/* SUCCESS ICON */}
      <div className="flex items-center gap-2 mt-2">
        {progress === 100 && (
          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>

      {/* PROGRESS STATUS */}
      <div className="flex justify-between items-center mt-3">
        <div className="text-xs font-bold text-white/60">
          {progress < 25
            ? "Getting Started"
            : progress < 50
            ? "Making Progress"
            : progress < 75
            ? "Almost There"
            : "Nearly Completed"}
        </div>
      </div>
    </>
  );
};

export default StepProgress;
