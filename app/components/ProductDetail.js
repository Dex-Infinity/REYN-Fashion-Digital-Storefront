// app/components/ProductDetail.js
"use client";

/**
 * REYN — ProductDetail
 *
 * Design signature: selecting a finish rewrites CSS custom properties on
 * <html> so the entire page background temperature shifts — Noir deepens
 * everything, Chalk warms it to near-cream. The page literally *wears*
 * the garment colour.
 *
 * WhatsApp URL is always derived from {productName + activeFinish.label},
 * rebuilt on every finish change via useMemo.
 */

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { buildWaUrl } from "@/lib/products";
import s from "./ProductDetail.module.css";

export default function ProductDetail({ product }) {
  const [finish, setFinish]     = useState(product.finishes[0]);
  const [revealed, setRevealed] = useState(false);

  // Page entrance animation trigger
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ── THE TINTING EFFECT ──
  // Writes pageTone ("r g b") into CSS vars on <html> so --bg shifts globally.
  useEffect(() => {
    const [r, g, b] = finish.pageTone.split(" ");
    const root = document.documentElement;
    root.style.setProperty("--page-r", r);
    root.style.setProperty("--page-g", g);
    root.style.setProperty("--page-b", b);
    return () => {
      // Reset to default when leaving the page
      root.style.removeProperty("--page-r");
      root.style.removeProperty("--page-g");
      root.style.removeProperty("--page-b");
    };
  }, [finish]);

  const waUrl = useMemo(
    () => buildWaUrl(product.name, finish.label),
    [product.name, finish.label]
  );

  const price = `GH₵ ${product.price.toLocaleString("en-GH")}`;

  return (
    <>
      {/* ══ HERO PRODUCT BLOCK ══ */}
      <article className={`${s.hero} ${revealed ? s.in : ""}`}>

        {/* LEFT — image + accents */}
        <div className={s.imageCol}>

          {/* Collection label — diagonal */}
          <span className={s.colLabel} aria-label={product.collection}>
            {product.collection}
          </span>

          {/* Product image placeholder — replace with <Image> */}
          <div
            className={s.imageFrame}
            style={{ "--swatch": finish.hex }}
            aria-label={`${product.name} — ${finish.label}`}
          >
            {/* Diagonal crop line */}
            <span className={s.cropLine} aria-hidden="true" />

            {/* Colour temperature overlay — subtle tint that shifts with finish */}
            <span
              className={s.tintOverlay}
              style={{ background: finish.hex }}
              aria-hidden="true"
            />

            {/* Fabric origin tag */}
            <span className={s.originTag}>{product.fabricOrigin}</span>
          </div>

          {/* 3D view stub */}
          <button
            className={s.view3d}
            onClick={() => alert("3D viewer — wire your renderer here.")}
            aria-label="View in 3D"
          >
            <SpinIcon /> View in 3D
          </button>
        </div>

        {/* RIGHT — product info */}
        <div className={s.infoCol}>

          {/* Oversized collection number — decorative */}
          <span className={s.bigNum} aria-hidden="true">
            {product.collection.match(/\d+/)?.[0] ?? ""}
          </span>

          <h1 className={s.name}>{product.name}</h1>
          <p className={s.price}>{price}</p>

          <div className={s.dividerGold} aria-hidden="true" />

          <p className={s.desc}>{product.description}</p>

          {/* ── Finish selector ── */}
          <div className={s.finishBlock}>
            <div className={s.finishMeta}>
              <span className={s.finishKey}>SELECT FINISH</span>
              <span className={s.finishVal}>{finish.label}</span>
            </div>

            <div className={s.swatches} role="radiogroup" aria-label="Select finish">
              {product.finishes.map((f) => {
                const active = f.label === finish.label;
                return (
                  <button
                    key={f.label}
                    role="radio"
                    aria-checked={active}
                    aria-label={f.label}
                    className={s.swatch}
                    style={{ "--c": f.hex }}
                    data-active={active || undefined}
                    onClick={() => setFinish(f)}
                  >
                    {/* Inner dot */}
                    <span className={s.swatchDot} />
                    {/* Gold active ring drawn via CSS */}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Material */}
          <p className={s.material}>
            <span className={s.matKey}>MATERIAL —</span> {product.material}
          </p>

          {/* Reyn Standard */}
          <div className={s.standard}>
            <ShieldIcon />
            <div>
              <p className={s.stdTitle}>The Reyn Standard</p>
              <p className={s.stdBody}>
                Internationally sourced. Authenticated, inspected, and prepared
                for premium delivery across Accra.
              </p>
            </div>
          </div>

          {/* Desktop CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.ctaBtn}
            aria-label={`Confirm ${product.name} in ${finish.label} via WhatsApp`}
          >
            <WaIcon />
            Confirm Availability &amp; Chat
          </a>

          <p className={s.ctaNote}>
            Availability confirmed manually · Payment via MoMo or Cash on Delivery
          </p>
        </div>
      </article>

      {/* ══ EDITORIAL DETAIL SECTION ══ */}
      <section className={s.detail}>
        <div
          className={s.detailImage}
          style={{ "--swatch": finish.hex }}
          aria-hidden="true"
        >
          <span className={s.detailGrain} aria-hidden="true" />
        </div>
        <div className={s.detailText}>
          <h2 className={s.detailHeading}>{product.detailHeading}</h2>
          <p className={s.detailBody}>{product.detailBody}</p>
          <Link href="/checkout" className={s.orderLink}>
            Place Order →
          </Link>
        </div>
      </section>

      {/* ══ STICKY BOTTOM BAR ══ */}
      <div className={s.stickyBar} role="region" aria-label="Quick action">
        <span className={s.stickyMeta}>{product.name} · {finish.label}</span>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={s.stickyBtn}
        >
          <WaIcon />
          Confirm Availability &amp; Chat
        </a>
      </div>
    </>
  );
}

/* ── Icon micro-components ── */

function WaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
      width="14" height="14" fill="currentColor" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      <path d="M16.003 2.667C8.639 2.667 2.667 8.636 2.667 16c0 2.361.636 4.573 1.74 6.484L2.667 29.333l7.072-1.714A13.266 13.266 0 0 0 16.003 29.333C23.364 29.333 29.333 23.361 29.333 16S23.364 2.667 16.003 2.667zm0 2.4c5.838 0 10.597 4.756 10.597 10.597s-4.759 10.597-10.597 10.597a10.564 10.564 0 0 1-5.387-1.473l-.387-.235-4.2 1.018 1.065-3.988-.26-.41A10.563 10.563 0 0 1 5.405 16c0-5.841 4.759-10.933 10.598-10.933zm-3.058 5.546c-.214 0-.56.08-.853.398-.293.319-1.12 1.093-1.12 2.666 0 1.573 1.147 3.093 1.307 3.307.16.213 2.24 3.52 5.493 4.787 2.72 1.08 3.28.853 3.867.8.587-.053 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.347-.497-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.707-1.733-.973-2.373-.253-.613-.507-.533-.707-.547l-.614-.013z"/>
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
      <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="var(--gold)" strokeWidth="1.4" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
