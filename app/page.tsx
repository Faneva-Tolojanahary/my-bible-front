"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "./Components/UI";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
type Testament = {
  id: string;
  tag: string;
  subtitle: string;
  livres: number;
  divisions: string;
  link: String;
};

// ── Data ───────────────────────────────────────────────────────────────────
const testaments: Testament[] = [
  {
    id: "taloha",
    tag: "Testamenta Taloha",
    subtitle: "Ny Teny masina izay nanomboka ny zavatra rehetra",
    livres: 39,
    divisions: "Torah, Mpaminany, Soratra",
    link: "old-testament"
  },
  {
    id: "vaovao",
    tag: "Testamenta Vaovao",
    subtitle: "Ny fiainana sy ny famonjena ao amin'i Jesosy",
    livres: 27,
    divisions: "Filazantsara, Taratasy, Apokalipsy",
    link: "new-testament"
  },
];


// ── Component ──────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative bg-black" style={{ minHeight: "60svh" }}>
        {/* Subtle beige pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #D4A574 0px, #D4A574 2px, transparent 2px, transparent 8px)",
        }} />
        
        <motion.div
          style={{ y: heroY, minHeight: "60svh", paddingTop: "8rem", paddingBottom: "4rem" }}
          className="relative max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col justify-center"
        >
          <Reveal delay={0}>
            <div className="border-l-4 border-[#D4A574] pl-6">
              <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-6">
                Soratra Masina
              </h1>
              
              <p className="text-sm text-gray-500 mt-6 uppercase tracking-widest">
                Testamenta roa · Teny iray · Finoana iray
              </p>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* ── TESTAMENT CARDS ── */}
      <section className="px-6 md:px-10 py-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testaments.map((t, i) => (
            <Reveal key={t.id} delay={i * 150}>
              <div className="group bg-black border-2 border-[#D4A574]/30 hover:border-[#D4A574] transition-all duration-300">
                {/* Card content */}
                <div className="p-8">
                  {/* Tag */}
                  <div className="mb-6">
                    <span className="text-xs tracking-[0.3em] font-light text-[#D4A574] uppercase">
                      {t.tag}
                    </span>
                    <div className="w-12 h-px bg-[#D4A574]/50 mt-3" />
                  </div>

                  {/* Subtitle */}
                  <p className="text-2xl font-light leading-relaxed mb-8 text-gray-200">
                    {t.subtitle}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                        Boky
                      </p>
                      <p className="text-4xl font-light text-[#D4A574]">
                        {t.livres}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                          Fizarana
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {t.divisions}
                      </p>
                    </div>
                  </div>

                  {/* Malagasy inspirational phrase */}
                  <div className="border-t border-[#D4A574]/20 pt-6 mb-6">
                    <p className="text-xs italic text-gray-500">
                      {t.id === "taloha" 
                        ? "Ny lalàna sy ny mpaminany dia mitory ny hasarobidin'Andriamanitra"
                        : "Ny filazantsara dia herin'Andriamanitra hamonjy ny mino"
                      }
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    className="inline-flex items-center gap-3 text-sm tracking-widest uppercase text-gray-400 hover:text-[#D4A574] transition-colors group"
                    href={`/books/${t.link}`}
                  >
                    <span>Hijery ny boky</span>
                    <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom quote section */}
        <div className="mt-20 text-center border-t border-[#D4A574]/20 pt-12">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
            Tenin'ny fahendrena
          </p>
          <p className="text-xl md:text-2xl font-light text-[#D4A574] italic max-w-2xl mx-auto">
            "Aoka ny Teniko ho eo am-bavanao sy eo am-ponao mandrakariva"
          </p>
          <p className="text-xs text-gray-600 mt-4">- Deoteronomia 11:18</p>
        </div>
      </section>

    </div>
  );
}