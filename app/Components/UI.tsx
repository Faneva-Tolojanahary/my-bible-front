"use client";

import React, { type ReactNode, type RefObject, useEffect, useRef, useState } from "react";

export type ResourceIconName =
  | "leaf"
  | "mine"
  | "chart"
  | "legal"
  | "industry"
  | "tourism"
  | "folder"
  | "report"
  | "document"
  | "book"
  | "refresh"
  | "search"
  | "offers"
  | "contacts"
  | "customs";

export function ResourceIcon({
  name,
  color,
  size = 22,
}: {
  name: ResourceIconName;
  color: string;
  size?: number;
}) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {name === "leaf" && <path d="M18.5 5.5c-6 .5-10 4.1-11.5 10.5 3.1-.6 5.7-2 7.7-4.1M9.3 17.3c.2-2.8 1.2-5.2 2.9-7.3 1.8-2.2 4-3.7 6.3-4.5 0 5.9-3.5 11-9.2 11.8Z" {...common} />}
      {name === "mine" && (
        <>
          <path d="M5 18h14" {...common} />
          <path d="m7 18 5-11 5 11" {...common} />
          <path d="m9.5 11 5 4" {...common} />
        </>
      )}
      {name === "chart" && (
        <>
          <path d="M5 18V6" {...common} />
          <path d="M11 18v-7" {...common} />
          <path d="M17 18V9" {...common} />
          <path d="M4 18h16" {...common} />
        </>
      )}
      {name === "legal" && (
        <>
          <path d="M12 5v14" {...common} />
          <path d="M7 9h10" {...common} />
          <path d="m7 9-2.5 4a2.3 2.3 0 0 0 2 1.1h1a2.3 2.3 0 0 0 2-1.1L7 9Z" {...common} />
          <path d="m17 9-2.5 4a2.3 2.3 0 0 0 2 1.1h1a2.3 2.3 0 0 0 2-1.1L17 9Z" {...common} />
        </>
      )}
      {name === "industry" && (
        <>
          <path d="M4 18h16" {...common} />
          <path d="M6 18V9l5 3V9l5 3v6" {...common} />
          <path d="M8 18v-3" {...common} />
          <path d="M13 18v-2.5" {...common} />
        </>
      )}
      {name === "tourism" && (
        <>
          <path d="M6 18c1.7-3.9 4.5-6.6 8.4-8.1" {...common} />
          <path d="M13.5 6.2c2.8.2 4.7 1.3 5.8 3.3-2.1.5-4 .7-5.8.4" {...common} />
          <path d="M7.5 18h9" {...common} />
        </>
      )}
      {name === "folder" && (
        <>
          <path d="M3.5 8.5h6l1.6 1.8h9.4v7.2a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5Z" {...common} />
          <path d="M3.5 8.5V7A1.5 1.5 0 0 1 5 5.5h4l1.4 1.7h3.6" {...common} />
        </>
      )}
      {name === "report" && (
        <>
          <path d="M7 4.5h7l3 3V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z" {...common} />
          <path d="M14 4.5V8h3" {...common} />
          <path d="M8.5 12h5" {...common} />
          <path d="M8.5 15h7" {...common} />
        </>
      )}
      {name === "document" && (
        <>
          <path d="M7 4.5h7l3 3V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z" {...common} />
          <path d="M14 4.5V8h3" {...common} />
        </>
      )}
      {name === "book" && (
        <>
          <path d="M6 5.5h10.5A1.5 1.5 0 0 1 18 7v11.5H7.5A2.5 2.5 0 0 0 5 21V8a2.5 2.5 0 0 1 1-2.5Z" {...common} />
          <path d="M7.5 18.5H18" {...common} />
        </>
      )}
      {name === "refresh" && (
        <>
          <path d="M18.5 9A6.5 6.5 0 0 0 7.3 6.5" {...common} />
          <path d="M7.5 3.8v3.4h3.4" {...common} />
          <path d="M5.5 15A6.5 6.5 0 0 0 16.7 17.5" {...common} />
          <path d="M16.5 20.2v-3.4h-3.4" {...common} />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="10.5" cy="10.5" r="5.5" {...common} />
          <path d="m15 15 4 4" {...common} />
        </>
      )}
      {name === "offers" && (
        <>
          <path d="M7 5.5h10A1.5 1.5 0 0 1 18.5 7v10A1.5 1.5 0 0 1 17 18.5H7A1.5 1.5 0 0 1 5.5 17V7A1.5 1.5 0 0 1 7 5.5Z" {...common} />
          <path d="M8.5 9.5h7" {...common} />
          <path d="M8.5 13h7" {...common} />
          <path d="M8.5 16.5H13" {...common} />
        </>
      )}
      {name === "contacts" && (
        <>
          <circle cx="9" cy="9" r="2.5" {...common} />
          <circle cx="16.5" cy="8.5" r="2" {...common} />
          <path d="M5.5 18c.7-2.2 2-3.5 3.9-3.9 2.2.3 3.6 1.7 4.3 3.9" {...common} />
          <path d="M14.2 17.8c.4-1.5 1.3-2.5 2.8-3" {...common} />
        </>
      )}
      {name === "customs" && (
        <>
          <path d="M7 19V8.5L12 5l5 3.5V19" {...common} />
          <path d="M5 19h14" {...common} />
          <path d="M10 11.5h4" {...common} />
          <path d="M10 14.5h4" {...common} />
        </>
      )}
    </svg>
  );
}

export function IconFrame({
  name,
  color,
  inverse = false,
  size = 22,
}: {
  name: ResourceIconName;
  color: string;
  inverse?: boolean;
  size?: number;
}) {
  return (
    <div
      className={`w-12 h-12 rounded-none flex items-center justify-center transition-all ${
        inverse
          ? "border border-gray-200 bg-white/70"
          : "border border-gray-200 bg-[#F7F8F7]"
      }`}
    >
      <ResourceIcon name={name} color={color} size={size} />
    </div>
  );
}

function useReveal<T extends HTMLElement>(): readonly [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
