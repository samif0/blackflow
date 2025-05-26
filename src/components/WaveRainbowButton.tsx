import React, { useState } from 'react';

export default function FinalWaveRainbowButton() {
  const [intensity, setIntensity] = useState('normal');

  return (
    <>
      <style jsx>{`
        @keyframes wave-travel {
          0% {
            background-position: -150% 0;
          }
          50% {
            background-position: 200% 0;
          }
          100% {
            background-position: -150% 0;
          }
        }
        
        @keyframes gentle-breathe {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.1;
            transform: scale(1.02);
          }
        }
        
        @keyframes smoke-pulse {
          0%, 100% {
            filter: blur(30px);
            opacity: 0.5;
          }
          50% {
            filter: blur(35px);
            opacity: 0.7;
          }
        }
        
        .container {
          min-height: 100vh;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 60px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .controls {
          display: flex;
          gap: 15px;
        }
        
        .control-btn {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          font-size: 1px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .control-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .control-btn.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        /* Main button wrapper */
        .wave-button {
          position: relative;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.6s easeInOut;
        }
        
        .wave-button:hover {
          transform: translateY(-2px);
        }
        
        .wave-button:active {
          transform: translateY(0);
        }
        
        /* Outer smoky aura - large and diffuse */
        .smoke-outer {
          position: absolute;
          top: -40px;
          left: -40px;
          right: -40px;
          bottom: -40px;
          background: radial-gradient(
            ellipse at center,
            transparent 15%,
            rgba(255, 0, 128, 0.2) 25%,
            rgba(255, 140, 0, 0.2) 35%,
            rgba(255, 215, 0, 0.2) 45%,
            rgba(0, 255, 0, 0.2) 55%,
            rgba(0, 255, 255, 0.2) 65%,
            rgba(0, 128, 255, 0.2) 75%,
            rgba(128, 0, 255, 0.2) 85%,
            transparent 100%
          );
          border-radius: 30px;
          filter: blur(30px);
          opacity: var(--smoke-outer-opacity, 0.6);
          animation: smoke-pulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        
        /* Mid smoky layer - more concentrated */
        .smoke-mid {
          position: absolute;
          top: -25px;
          left: -25px;
          right: -25px;
          bottom: -25px;
          background: radial-gradient(
            ellipse at center,
            transparent 20%,
            rgba(255, 0, 128, 0.3) 30%,
            rgba(255, 140, 0, 0.3) 40%,
            rgba(255, 215, 0, 0.3) 50%,
            rgba(0, 255, 0, 0.3) 60%,
            rgba(0, 255, 255, 0.3) 70%,
            rgba(0, 128, 255, 0.3) 80%,
            transparent 100%
          );
          border-radius: 22px;
          filter: blur(20px);
          opacity: var(--smoke-mid-opacity, 0.7);
          animation: gentle-breathe 3s ease-in-out infinite;
          pointer-events: none;
        }
        
        /* Inner glow layer - closest to button */
        .glow-inner {
          position: absolute;
          top: -12px;
          left: -12px;
          right: -12px;
          bottom: -12px;
          background: radial-gradient(
            ellipse at center,
            transparent 35%,
            rgba(255, 255, 255, 0.2) 45%,
            rgba(255, 0, 128, 0.3) 55%,
            rgba(0, 255, 255, 0.3) 65%,
            transparent 80%
          );
          border-radius: 16px;
          filter: blur(12px);
          opacity: var(--glow-inner-opacity, 0.8);
          pointer-events: none;
        }
        
        /* Additional soft glow */
        .soft-glow {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: linear-gradient(
            45deg,
            rgba(255, 0, 128, 0.4),
            rgba(255, 140, 0, 0.4),
            rgba(255, 215, 0, 0.4),
            rgba(0, 255, 0, 0.4),
            rgba(0, 255, 255, 0.4),
            rgba(0, 128, 255, 0.4)
          );
          border-radius: 14px;
          filter: blur(10px);
          opacity: 0.5;
          pointer-events: none;
        }
        
        /* Main wave border */
        .wave-border {
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          padding: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 0, 128, 0.3) 5%,
            #ff0080 10%,
            #ff4000 15%,
            #ff8000 20%,
            #ffff00 25%,
            #80ff00 30%,
            #00ff00 35%,
            #00ffff 40%,
            #0080ff 45%,
            #8000ff 50%,
            #ff00ff 55%,
            #ff0080 60%,
            rgba(255, 0, 128, 0.3) 65%,
            transparent 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          mask: linear-gradient(#fff 0 0) content-box, 
                linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, 
                       linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          animation: wave-travel var(--wave-speed, 3s) ease-in-out infinite;
          z-index: 2;
        }
        
        /* Wave highlight */
        .wave-highlight {
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            transparent 45%,
            rgba(255, 255, 255, 0.7) 48%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.7) 52%,
            transparent 55%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: wave-travel var(--wave-speed, 3s) ease-in-out infinite;
          opacity: 0.6;
          z-index: 3;
          pointer-events: none;
        }
        
        /* Button content */
        .button-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8 px;
          padding: 12px 24px;
          background: rgba(0, 0, 0, 0.95);
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          z-index: 4;
        }
        
        /* Intensity variants */
        .subtle {
          --smoke-outer-opacity: 0.4;
          --smoke-mid-opacity: 0.5;
          --glow-inner-opacity: 0.6;
          --wave-speed: 4s;
        }
        
        .normal {
          --smoke-outer-opacity: 0.6;
          --smoke-mid-opacity: 0.7;
          --glow-inner-opacity: 0.8;
          --wave-speed: 3s;
        }
        
        .intense {
          --smoke-outer-opacity: 0.8;
          --smoke-mid-opacity: 0.9;
          --glow-inner-opacity: 1;
          --wave-speed: 2s;
        }
        
        .icon {
          width: 20px;
          height: 20px;
        }
        
        .label {
          color: #666;
          font-size: 12px;
          margin-bottom: 20px;
        }
      `}</style>
        
        <div>
          <button className={`wave-button ${intensity}`}>
            <div className="smoke-outer"></div>
            <div className="smoke-mid"></div>
            <div className="glow-inner"></div>
            <div className="soft-glow"></div>
            <div className="wave-border"></div>
            <div className="wave-highlight"></div>
            <div className="button-content">
              <svg 
                className="icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Sign Up</span>
            </div>
          </button>
        </div>
    </>
  );
}