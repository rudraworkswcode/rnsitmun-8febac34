import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* 🔵 Softer Blue Bike SVG */
const BlueBikeSVG = ({ size = 150, opacity = 0.7 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(59, 130, 246, 0.75)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        filter: `drop-shadow(0 0 3px rgba(59,130,246,0.25))`,
        opacity,
      }}
    >
      <circle cx="5.5" cy="17.5" r="4.5" />
      <circle cx="18.5" cy="17.5" r="4.5" />
      <path d="M5.5 17.5L9 8H14" />
      <path d="M18.5 17.5L14 8" />
      <path d="M12 8h2.5" />
    </svg>
  );
};

export default function EventBanner() {
  const [motionOffset, setMotionOffset] = useState(0);

  /* 🌊 Infinite looping motion */
  useEffect(() => {
    let raf: number;
    let x = 0;

    const animate = () => {
      x += 0.8;

      if (x > 3000) x = 0; // reset for infinite loop

      setMotionOffset(x);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* 🚲 Correct Left + Right balanced bikes */
  const nearLayer = [
    // Left side (true left)
    { top: "10%", left: "-15%", size: 210, opacity: 0.35, rotation: -6, depth: 1.6 },
    { top: "60%", left: "-10%", size: 200, opacity: 0.33, rotation: -5, depth: 1.55 },

    // Right side
    { top: "25%", left: "90%", size: 190, opacity: 0.32, rotation: 6, depth: 1.5 },
    { top: "50%", left: "95%", size: 185, opacity: 0.31, rotation: 4, depth: 1.7 },
  ];

  const midLayer = [
    // Left
    { top: "15%", left: "-8%", size: 170, opacity: 0.27, rotation: -3, depth: 1.2 },
    { top: "75%", left: "-5%", size: 165, opacity: 0.25, rotation: -4, depth: 1.1 },
    { top: "40%", left: "-12%", size: 180, opacity: 0.28, rotation: -2, depth: 1.25 },

    // Right
    { top: "10%", left: "75%", size: 160, opacity: 0.24, rotation: 4, depth: 1.3 },
    { top: "35%", left: "82%", size: 170, opacity: 0.26, rotation: 3, depth: 1.15 },
    { top: "70%", left: "88%", size: 180, opacity: 0.25, rotation: 2, depth: 1.2 },
  ];

  const farLayer = [
    // Left subtle
    { top: "20%", left: "-20%", size: 140, opacity: 0.18, rotation: -2, depth: 0.8 },
    { top: "80%", left: "-15%", size: 135, opacity: 0.17, rotation: -3, depth: 0.75 },
    { top: "5%", left: "-10%", size: 150, opacity: 0.19, rotation: -1, depth: 0.85 },

    // Right subtle
    { top: "15%", left: "95%", size: 130, opacity: 0.15, rotation: 3, depth: 0.7 },
    { top: "50%", left: "100%", size: 145, opacity: 0.17, rotation: 1, depth: 0.8 },
  ];

  const bikes = [...nearLayer, ...midLayer, ...farLayer];

  return (
    <section className="relative overflow-hidden py-20 bg-[#020617]">

      {/* 🚲 Background Bike Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bikes.map((bike, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: bike.top,
              left: bike.left,
              transform: `
                translateX(${(motionOffset * bike.depth) % 3000}px)
                translateY(${Math.sin((motionOffset * 0.01 + i) * 0.5) * 2}px)
                rotate(${bike.rotation + motionOffset * 0.005 * bike.depth}deg)
              `,
              willChange: "transform",
            }}
          >
            <BlueBikeSVG size={bike.size} opacity={bike.opacity} />
          </div>
        ))}
      </div>

      {/* 🌟 Main Card Content (Unchanged) */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8">

        <Card className="max-w-4xl mx-auto bg-black/50 border-white/10 backdrop-blur-xl shadow-xl rounded-3xl">
          <CardContent className="p-8 sm:p-10">

            <p className="text-primary/70 text-xs uppercase tracking-[0.25em]">
              Active Mobility Drive
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
              Bring Your <span className="text-primary">Bicycle</span>
            </h2>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <img src="/Pendaluru_logo.png" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase">In Collaboration With</p>
                <p className="text-white font-semibold text-lg">Pedaluru – Cycling for namm’uru</p>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed mt-6 mb-6">
              RNSIT, in collaboration with Pedaluru — Bengaluru’s active mobility initiative — 
              is hosting an Active Mobility Awareness Drive.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                <Calendar className="text-primary" />
                <p className="text-white">18 Nov, 2025</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                <MapPin className="text-primary" />
                <p className="text-white">Basketball Court, RNSIT</p>
              </div>
            </div>

            <ul className="text-white/80 space-y-2 mb-6">
              <li>• Park bicycle between 9 AM – 3:30 PM</li>
              <li>• Short campus rally</li>
              <li>• Mobility surveys</li>
              <li>• Pedaluru campaign info</li>
            </ul>

            <Button
              asChild
              size="lg"
              className="bg-primary px-8 py-4 rounded-xl text-white font-medium"
            >
              <a href="https://chat.whatsapp.com/HbqgudRpu6TBoJFhQKJgcR?mode=wwt" target="_blank">
                Join WhatsApp Group
              </a>
            </Button>

          </CardContent>
        </Card>

      </div>

    </section>
  );
}
