// app/components/FloatingWA.js
"use client";
import { WA_NUMBER } from "@/lib/products";
import s from "./FloatingWA.module.css";

export default function FloatingWA() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hello REYN, I'd like to learn more about your current collection."
  )}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
       className={s.fab} aria-label="Chat with REYN on WhatsApp">
      {/* Outer gold ring — the signature touch */}
      <span className={s.ring} aria-hidden="true" />
      <WaIcon />
    </a>
  );
}

function WaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
      width="22" height="22" fill="white" aria-hidden="true">
      <path d="M16.003 2.667C8.639 2.667 2.667 8.636 2.667 16c0 2.361.636 4.573 1.74 6.484L2.667 29.333l7.072-1.714A13.266 13.266 0 0 0 16.003 29.333C23.364 29.333 29.333 23.361 29.333 16S23.364 2.667 16.003 2.667zm0 2.4c5.838 0 10.597 4.756 10.597 10.597s-4.759 10.597-10.597 10.597a10.564 10.564 0 0 1-5.387-1.473l-.387-.235-4.2 1.018 1.065-3.988-.26-.41A10.563 10.563 0 0 1 5.405 16c0-5.841 4.759-10.933 10.598-10.933zm-3.058 5.546c-.214 0-.56.08-.853.398-.293.319-1.12 1.093-1.12 2.666 0 1.573 1.147 3.093 1.307 3.307.16.213 2.24 3.52 5.493 4.787 2.72 1.08 3.28.853 3.867.8.587-.053 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.347-.497-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.707-1.733-.973-2.373-.253-.613-.507-.533-.707-.547l-.614-.013z"/>
    </svg>
  );
}
