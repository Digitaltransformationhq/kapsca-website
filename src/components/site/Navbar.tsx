"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "./Logo";
import { useScrollNav } from "./scroll-nav";
import { useConsultation } from "./consultation";

const LINKS = [
  { label: "Home", id: "top" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Team", id: "team" },
  { label: "Contact", id: "contact" },
];

export function Navbar() {
  const { active, go } = useScrollNav();
  const openConsult = useConsultation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    go(id);
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
    >
      <div className="container-kaps">
        {/* Floating glass bar */}
        <nav
          className={`relative flex h-16 items-center justify-between rounded-2xl border border-navy-900/10 bg-white pl-4 pr-2 transition-all duration-500 sm:pl-5 ${
            scrolled
              ? "shadow-[0_16px_50px_-18px_rgba(10,23,40,0.35)]"
              : "shadow-[0_10px_40px_-22px_rgba(10,23,40,0.25)]"
          }`}
        >
          {/* Subtle top glass highlight */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <button
            onClick={() => navigate("top")}
            aria-label="KAPS & Co. home"
            className="flex shrink-0 items-center self-center"
          >
            <Logo tone="dark" />
          </button>

          {/* Center links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => navigate(l.id)}
                    className={`relative block rounded-full px-4 py-2 text-sm font-500 transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-navy-500 hover:text-navy-700"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActive"
                        className="absolute inset-0 rounded-full bg-accent-500 shadow-[0_6px_18px_-6px_rgba(78,167,46,0.7)]"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={openConsult}
              className="group hidden items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-600 text-white shadow-[0_8px_22px_-12px_rgba(78,167,46,0.55)] transition-all hover:bg-accent-600 sm:inline-flex"
            >
              Book an Appointment
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
              >
                <path
                  d="M3 8h9M8 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-700 lg:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                    open ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-5 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu — floating glass card */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 overflow-hidden rounded-3xl border border-navy-900/10 bg-white/95 p-3 shadow-[0_20px_60px_-22px_rgba(10,23,40,0.35)] backdrop-blur-2xl lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => navigate(l.id)}
                      className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-500 transition-colors ${
                        active === l.id
                          ? "bg-accent-500 text-white"
                          : "text-navy-600 hover:bg-navy-900/5 hover:text-navy-900"
                      }`}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
                <li className="mt-1 grid grid-cols-1 gap-2 px-1 pt-1">
                  <a
                    href="tel:+919725339233"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-navy-900/15 px-5 py-3 text-center text-sm font-500 text-navy-600"
                  >
                    +91 97253 39233
                  </a>
                  <button
                    onClick={() => {
                      setOpen(false);
                      openConsult();
                    }}
                    className="rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-600 text-white"
                  >
                    Book an Appointment
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
