// app/components/Nav.js
"use client";
import Link from "next/link";
import { useState } from "react";
import s from "./Nav.module.css";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={s.bar}>
      {/* Vertical collection tag — left edge */}
      <span className={s.tag} aria-hidden="true">CURATED FOR ACCRA</span>

      {/* Wordmark */}
      <Link href="/" className={s.mark}>REYN</Link>

      {/* Right actions */}
      <nav className={s.right}>
        <Link href="/collections" className={s.link}>Collections</Link>
        <Link href="/archive"     className={s.link}>Archive</Link>
        <Link href="/editorial"   className={s.link}>Editorial</Link>
        <Link href="/cart"        className={s.bag} aria-label="Bag">
          {/* Bag outline */}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </Link>
      </nav>
    </header>
  );
}
