'use client';

import React from 'react';

interface LoadingAnimationProps {
  className?: string;
}

export default function LoadingAnimation({ className = "w-48 h-32" }: LoadingAnimationProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 255 150" 
      className={className}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(230, 85, 85, 0.2))' }}
    >
      <style>
        {`
          .geometric-path {
            fill: none;
            stroke: #e65555;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          
          .path-animated {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw-path 5s ease-in-out infinite;
          }
          
          .path-animated:nth-child(1) { animation-delay: 0s; }
          .path-animated:nth-child(2) { animation-delay: 0.2s; }
          .path-animated:nth-child(3) { animation-delay: 0.4s; }
          .path-animated:nth-child(4) { animation-delay: 0.6s; }
          .path-animated:nth-child(5) { animation-delay: 0.8s; }
          .path-animated:nth-child(6) { animation-delay: 1s; }
          .path-animated:nth-child(7) { animation-delay: 1.2s; }
          .path-animated:nth-child(8) { animation-delay: 1.4s; }
          .path-animated:nth-child(9) { animation-delay: 1.6s; }
          .path-animated:nth-child(10) { animation-delay: 1.8s; }
          .path-animated:nth-child(11) { animation-delay: 2s; }
          .path-animated:nth-child(12) { animation-delay: 2.2s; }
          
          @keyframes draw-path {
            0% {
              stroke-dashoffset: 1000;
              stroke: #e65555;
            }
            25% {
              stroke-dashoffset: 0;
              stroke: #e65555;
            }
            50% {
              stroke-dashoffset: 0;
              stroke: #f87171;
            }
            75% {
              stroke-dashoffset: 0;
              stroke: #e65555;
            }
            100% {
              stroke-dashoffset: 1000;
              stroke: #dc2626;
            }
          }
        `}
      </style>
      
      {/* 幾何学模様のパス群 */}
      <g transform="translate(957, 1496) scale(1 1) rotate(210 145 125)">
        <path className="geometric-path path-animated" d="M1851.9,1007.8l-71.9,0l-0.1,0l35.9-62.3l0.1-0.1L1851.9,1007.8 M1828,966.4l-48,41.5 M1851.9,1007.8l-48.1-41.4"/>
      </g>
      
      <path className="geometric-path path-animated" d="M189.7,75l-62.3-36l0.1-0.1L189.8,3l0,0.1L189.7,75 M142.8,48l0-18 M174.4,11.8l15.6,9 M189.9,57.2l-15.6,9"/>
      <path className="geometric-path path-animated" d="M169,39l13.1,22.7L169,39 M169,39h-26.2H169 M169,39l13.1-22.6L169,39"/>
      
      <g transform="translate(957, 1496) scale(1 1) rotate(210 145 125)">
        <path className="geometric-path path-animated" d="M1887.8,945.5l-35.9,62.3l-0.1,0.1l-36-62.3l0-0.1L1887.8,945.5 M1840,945.5l11.9,62.3 M1887.8,945.5l-59.9,20.9"/>
      </g>
      
      <g transform="translate(2105, 1281) scale(1 1) rotate(30 145 125)">
        <path className="geometric-path path-animated" d="M-2304.8,2.4l-35.9-62.3l0.1,0l71.9,0l0,0.1L-2304.8,2.4 M-2332,-44.4l9-15.6 M-2286.5,-60l9,15.6 M-2295.8,-12.9l-18,0"/>
        <path className="geometric-path path-animated" d="M-2304.8,-39.1l0,26.2L-2304.8,-39.1 M-2304.8,-39.1l-22.7-13.1L-2304.8,-39.1 M-2304.8,-39.1l22.7-13L-2304.8,-39.1"/>
      </g>
      
      <g transform="translate(957, 1496) scale(1 1) rotate(210 145 125)">
        <path className="geometric-path path-animated" d="M1887.7,945.5l-71.9,0l0-0.1l36-62.3l0.1,0.1L1887.7,945.5 M1851.9,883.2l-11.9,62.3 M1827.9,924.6l59.9,20.9"/>
      </g>
      
      <g transform="translate(2105, 1281) scale(1 1) rotate(30 145 125)">
        <path className="geometric-path path-animated" d="M-2304.8,2.3l36-62.3l0.1,0.1l35.9,62.3l-0.1,0L-2304.8,2.3 M-2277.9,-44.6l18,0 M-2241.7,-13l-9,15.6 M-2287.1,2.6l-9-15.6"/>
        <path className="geometric-path path-animated" d="M-2268.9,-18.3l-22.7,13.1L-2268.9,-18.3 M-2268.9,-18.3v-26.2V-18.3 M-2268.9,-18.3l22.6,13.1L-2268.9,-18.3"/>
      </g>
      
      <g transform="translate(957, 1496) scale(1 1) rotate(210 145 125)">
        <path className="geometric-path path-animated" d="M1851.9,883.3l-36,62.3l-0.1-0.1l-35.9-62.3l0.1,0L1851.9,883.3 M1779.9,883.1l48,41.5 M1803.8,924.6l48.1-41.4"/>
      </g>
      
      <g transform="translate(2105, 1281) scale(1 1) rotate(30 145 125)">
        <path className="geometric-path path-animated" d="M-2304.9,2.3l71.9,0l0.1,0l-35.9,62.3l-0.1,0.1L-2304.9,2.3 M-2259.8,49.3l-18,0 M-2250.7,2.2l9,15.6 M-2296,17.8l9-15.6"/>
        <path className="geometric-path path-animated" d="M-2268.8,33.5l22.7-13.1L-2268.8,33.5 M-2268.8,33.5v26.2V33.5 M-2268.8,33.5l-22.6-13.1L-2268.8,33.5"/>
      </g>
    </svg>
  );
}
