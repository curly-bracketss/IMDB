import React from "react";

/**
 * CircularBubblesLoader (Compact Dark Theme)
 * Adjusted slightly bigger to match typical SVG icon sizes (~24px).
 */
export default function CircularBubblesLoader({
  size = 24, // slightly larger than 16px to fit svg icon areas
  count = 6,
  bubbleSize = 6,
  speed = 0.9,
  color = "#9ca3af", // gray-400 bubbles
  trackWidth = 1,
}) {
  const radius = size / 2 - bubbleSize / 2 - trackWidth;

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
        aria-label="loading"
        role="status"
      >
        {/* Rotating ring */}
        <div
          className="absolute inset-0"
          style={{
            animation: `spin ${speed}s linear infinite`,
          }}
        >
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.cos(angle) * radius + size / 2 - bubbleSize / 2;
            const y = Math.sin(angle) * radius + size / 2 - bubbleSize / 2;
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: x,
                  top: y,
                  width: bubbleSize,
                  height: bubbleSize,
                  background: color,
                  opacity: 0.9,
                  animation: `pulse 1s ease-in-out ${(i / count) * 0.4}s infinite`,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(0.8); opacity: .6; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/**
 * Example usage inside Post.jsx:
 *
 * {loading ? <CircularBubblesLoader /> : <svg ... />}
 */
