"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "scale-up" | "fade";
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 750,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if element is already in viewport on mount
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransformClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return "opacity-0 translate-y-10";
        case "fade-down":
          return "opacity-0 -translate-y-10";
        case "fade-left":
          return "opacity-0 -translate-x-10";
        case "fade-right":
          return "opacity-0 translate-x-10";
        case "zoom-in":
          return "opacity-0 scale-90";
        case "scale-up":
          return "opacity-0 scale-95 translate-y-6";
        case "fade":
        default:
          return "opacity-0";
      }
    }
    return "opacity-100 translate-y-0 translate-x-0 scale-100";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
