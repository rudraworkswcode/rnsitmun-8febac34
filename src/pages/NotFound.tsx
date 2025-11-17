import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const RandomBengaluruFact = () => {
  const [currentFact, setCurrentFact] = useState(0);

  const facts = [
    { icon: "🚗", title: "Traffic Fact:", text: "Bengaluru has more traffic signals per km than any other Indian city." },
    { icon: "🌧️", title: "Weather Fact:", text: "Bengaluru's weather is so perfect, people visit just to feel 'pleasant'." },
    { icon: "🏢", title: "Tech Fact:", text: "Every 3rd software engineer in India either works in Bengaluru or dreams of moving here." },
    { icon: "🌳", title: "Garden City Fact:", text: "Bengaluru was once called the 'Garden City' with over 1000 lakes." },
    { icon: "🍛", title: "Food Fact:", text: "Bengaluru has the highest concentration of South Indian breakfast joints." },
    { icon: "🏠", title: "PG Life Fact:", text: "Bengaluru probably has more PGs than any other city. It's like a giant hostel where everyone codes!" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="transition-all duration-1000 ease-in-out">
      <p className="text-blue-200 text-sm leading-relaxed">
        <span className="text-white font-semibold">
          {facts[currentFact].icon} {facts[currentFact].title}
        </span>{" "}
        {facts[currentFact].text}
      </p>
    </div>
  );
};

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-between bg-black relative overflow-hidden">
      {/* ✅ Global Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto flex-grow relative z-10 pt-24 px-6">
        {/* ☕ Coffee SVG */}
        <div className="relative w-96 h-96 mb-8 flex items-center justify-center">
          <svg width="300" height="350" viewBox="0 0 300 350" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6B4423" />
                <stop offset="50%" stopColor="#8B4513" />
                <stop offset="100%" stopColor="#4A2C17" />
              </linearGradient>
              <linearGradient id="steamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="saucerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E8E8E8" />
                <stop offset="100%" stopColor="#C0C0C0" />
              </linearGradient>
            </defs>

            {/* Saucer */}
            <ellipse cx="150" cy="280" rx="80" ry="15" fill="url(#saucerGradient)" />
            <ellipse cx="150" cy="275" rx="80" ry="15" fill="#F0F0F0" />

            {/* Cup Body */}
            <path d="M80 180 L80 250 Q80 270 100 270 L200 270 Q220 270 220 250 L220 180 Z" fill="url(#coffeeGradient)" />
            <ellipse cx="150" cy="180" rx="70" ry="15" fill="#8B4513" />

            {/* Coffee Surface */}
            <ellipse cx="150" cy="180" rx="65" ry="12" fill="#3E2723" />

            {/* Cup Handle */}
            <path d="M220 200 Q250 200 250 230 Q250 260 220 260" stroke="#8B4513" strokeWidth="8" fill="none" />
            <path d="M220 205 Q245 205 245 230 Q245 255 220 255" stroke="#A0522D" strokeWidth="4" fill="none" />

            {/* Steam */}
            <g opacity="0.7">
              <path d="M130 160 Q135 140 130 120 Q125 100 135 80" stroke="url(#steamGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                <animate attributeName="d"
                  values="M130 160 Q135 140 130 120 Q125 100 135 80;M130 160 Q125 140 135 120 Q140 100 130 80;M130 160 Q135 140 130 120 Q125 100 135 80"
                  dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M150 160 Q145 140 155 120 Q160 100 150 80" stroke="url(#steamGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                <animate attributeName="d"
                  values="M150 160 Q145 140 155 120 Q160 100 150 80;M150 160 Q160 140 145 120 Q135 100 150 80;M150 160 Q145 140 155 120 Q160 100 150 80"
                  dur="2.5s" repeatCount="indefinite" />
              </path>
              <path d="M170 160 Q175 140 165 120 Q160 100 175 80" stroke="url(#steamGradient)" strokeWidth="3" fill="none" strokeLinecap="round">
                <animate attributeName="d"
                  values="M170 160 Q175 140 165 120 Q160 100 175 80;M170 160 Q160 140 175 120 Q180 100 170 80;M170 160 Q175 140 165 120 Q160 100 175 80"
                  dur="3.5s" repeatCount="indefinite" />
              </path>
            </g>

            {/* Coffee beans */}
            <g transform="translate(50, 320)">
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="#4A2C17" />
              <path d="M0 -8 Q0 0 0 8" stroke="#2D1A0F" strokeWidth="2" />
            </g>
            <g transform="translate(250, 315) rotate(30)">
              <ellipse cx="0" cy="0" rx="8" ry="12" fill="#4A2C17" />
              <path d="M0 -8 Q0 0 0 8" stroke="#2D1A0F" strokeWidth="2" />
            </g>
            <g transform="translate(220, 300) rotate(-20)">
              <ellipse cx="0" cy="0" rx="6" ry="9" fill="#4A2C17" />
              <path d="M0 -6 Q0 0 0 6" stroke="#2D1A0F" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* 404 heading */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-white relative z-10 animate-gentle-bounce">
            4<span className="text-white drop-shadow-lg">0</span>4
          </h1>
          <div
            className="absolute inset-0 text-9xl font-black blur-lg opacity-60 animate-glow"
            style={{ color: "#050C28" }}
          >
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2
            className="text-3xl font-bold"
            style={{
              background: "linear-gradient(to right, #2563EB, #06B6D4)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Aiyooo! Wrong Route-u!
          </h2>
          <p className="text-gray-300 text-xl">
            Page not found — like{" "}
            <span className="text-orange-400 font-semibold">filter coffee without decoction</span> ☕
          </p>
          <p className="text-gray-400">
            The link you brewed doesn't exist. Let's get back before the froth settles!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <button
            onClick={() => navigate("/")}
            className="group relative text-white font-bold px-10 py-4 rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(to right, #050C28, #0A1654)" }}
          >
            <span className="relative z-10">Back to Home</span>
            <div
              className="absolute inset-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
              style={{ background: "linear-gradient(to right, #0A1654, #050C28)" }}
            ></div>
          </button>

          <button
            onClick={() => navigate("/events")}
            className="relative text-white font-bold px-10 py-4 rounded-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-xl overflow-hidden"
            style={{
              background: "linear-gradient(to right, #2563EB, #06B6D4)",
              border: "none",
            }}
          >
            Browse Events
          </button>
        </div>

        {/* Random Fact */}
        <div
          className="p-6 rounded-xl border backdrop-blur-sm max-w-lg"
          style={{
            background: "linear-gradient(to right, rgba(5, 12, 40, 0.2), rgba(10, 22, 84, 0.2))",
            borderColor: "rgba(5, 12, 40, 0.5)",
          }}
        >
          <RandomBengaluruFact />
        </div>
      </div>

      {/* ✅ Global Footer */}
      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        .animate-gentle-bounce { animation: gentle-bounce 5s ease-in-out infinite; }

        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(0.95); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default NotFound;
