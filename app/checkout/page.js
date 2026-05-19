// app/checkout/page.js
"use client";

/**
 * REYN — Checkout
 *
 * Ghanaian-first form logic:
 *  · Delivery toggle: Doorstep (GPS required) vs. Self-Pickup
 *  · Ghana Post GPS / Digital Address field
 *  · Payment: MoMo or Cash on Delivery — both manual, no gateway
 *  · "Confirm" composes a rich WhatsApp message and opens wa.me
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { buildOrderWaUrl } from "@/lib/products";
import s from "./checkout.module.css";

// In production, pull from cart context / server state
const CART = {
  name:     "The Silk Archive Slip",
  size:     "M",
  finish:   "Noir",
  priceGhs: 1450,
  deliveryGhs: 50,
};

export default function CheckoutPage() {
  const [delivery, setDelivery] = useState("doorstep");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+233 ");
  const [gps, setGps] = useState("");
  const [street, setStreet] = useState("");
  const [payment, setPayment] = useState("");

  const isPickup = delivery === "pickup";
  const deliveryFee = isPickup ? 0 : CART.deliveryGhs;
  const total = CART.priceGhs + deliveryFee;

  const waUrl = useMemo(() =>
    buildOrderWaUrl({
      name: CART.name, size: CART.size, finish: CART.finish,
      firstName, lastName, email, phone,
      delivery, gps, street, payment, total,
    }),
    [firstName, lastName, email, phone, delivery, gps, street, payment, total]
  );

  const handleConfirm = (e) => {
    e.preventDefault();
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={s.page}>
      <div className={s.inner}>

        {/* Breadcrumb */}
        <nav className={s.breadcrumb} aria-label="Navigation">
          <Link href="/" className={s.breadBack}>← Return to Curation</Link>
        </nav>

        <h1 className={s.pageTitle}>
          <em>Secure</em> Checkout
        </h1>

        <div className={s.cols}>

          {/* ═══════ LEFT — Form ═══════ */}
          <form className={s.form} onSubmit={handleConfirm} noValidate>

            {/* ── 1. Delivery ── */}
            <fieldset className={s.section}>
              <legend className={s.sectionLegend}>
                <span className={s.sectionNum}>01</span>
                Delivery Details
              </legend>

              {/* Toggle */}
              <div className={s.toggle} role="radiogroup" aria-label="Delivery method">
                {[
                  { id: "doorstep", label: "Doorstep Delivery" },
                  { id: "pickup",   label: "Self-Pickup" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={delivery === id}
                    className={s.toggleBtn}
                    data-active={delivery === id || undefined}
                    onClick={() => setDelivery(id)}
                  >
                    <span className={s.toggleDot} data-active={delivery === id || undefined} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Name row */}
              <div className={s.row}>
                <Field label="First Name" id="fn">
                  <input id="fn" className={s.input} type="text"
                    placeholder="First name" autoComplete="given-name"
                    value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </Field>
                <Field label="Last Name" id="ln">
                  <input id="ln" className={s.input} type="text"
                    placeholder="Last name" autoComplete="family-name"
                    value={lastName} onChange={e => setLastName(e.target.value)} required />
                </Field>
              </div>

              <Field label="Email Address" id="em" hint="For order confirmation">
                <input id="em" className={s.input} type="email"
                  placeholder="your@email.com" autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </Field>

              <Field label="Phone Number (WhatsApp preferred)" id="ph">
                <input id="ph" className={s.input} type="tel"
                  placeholder="+233 XX XXX XXXX" autoComplete="tel"
                  value={phone} onChange={e => setPhone(e.target.value)} required />
              </Field>

              {/* GPS — doorstep only */}
              {!isPickup && (
                <>
                  <Field
                    label={<><PinIcon /> Ghana Post GPS / Digital Address</>}
                    id="gps"
                    hint="Required for accurate doorstep delivery in Accra."
                  >
                    <input id="gps" className={s.input} type="text"
                      placeholder="e.g. GA-123-4567"
                      value={gps} onChange={e => setGps(e.target.value)} required />
                  </Field>

                  <Field label="Street Address (Optional)" id="st">
                    <input id="st" className={s.input} type="text"
                      placeholder="Additional directions"
                      value={street} onChange={e => setStreet(e.target.value)} />
                  </Field>
                </>
              )}

              {/* Self-pickup note */}
              {isPickup && (
                <div className={s.infoBlock}>
                  <InfoIcon />
                  <p>
                    Pickup location and collection window confirmed via WhatsApp
                    after order placement.
                  </p>
                </div>
              )}
            </fieldset>

            {/* ── 2. Payment ── */}
            <fieldset className={s.section}>
              <legend className={s.sectionLegend}>
                <span className={s.sectionNum}>02</span>
                Payment Preference
              </legend>

              <p className={s.paymentIntro}>
                No payment gateway. Select a method — our team finalises
                details with you via WhatsApp.
              </p>

              {/* MoMo */}
              <PayOption
                id="momo" label="Mobile Money (MoMo)"
                icon={<MoMoIcon />}
                active={payment === "momo"}
                onClick={() => setPayment("momo")}
              />
              {payment === "momo" && (
                <div className={s.payDetail}>
                  We will send you our MoMo number and amount via WhatsApp.
                  Share your transaction ID once transferred to confirm your order.
                </div>
              )}

              {/* Cash on Delivery */}
              <PayOption
                id="cod" label="Cash on Delivery"
                icon={<CashIcon />}
                active={payment === "cod"}
                onClick={() => setPayment("cod")}
              />
              {payment === "cod" && (
                <div className={s.payDetail}>
                  Available within Greater Accra. Payment made to our rider on
                  delivery. A small handling fee may apply — confirmed via WhatsApp.
                </div>
              )}
            </fieldset>

            {/* ── Submit ── */}
            <button type="submit" className={s.submitBtn}>
              <WaIcon />
              Confirm Availability &amp; Chat
            </button>
            <p className={s.submitNote}>
              You'll be taken to WhatsApp to finalise with our curation team.
            </p>
          </form>

          {/* ═══════ RIGHT — Summary ═══════ */}
          <aside className={s.summary}>
            <h2 className={s.summaryTitle}>Order Summary</h2>
            <div className={s.summaryDivider} />

            <div className={s.summaryItem}>
              {/* Placeholder thumbnail */}
              <div className={s.thumb} aria-hidden="true" />
              <div className={s.summaryInfo}>
                <p className={s.summaryName}>{CART.name}</p>
                <p className={s.summaryMeta}>Size {CART.size} · {CART.finish}</p>
                <p className={s.summaryMeta}>Qty 1</p>
              </div>
              <p className={s.summaryPrice}>
                GHS {CART.priceGhs.toLocaleString("en-GH")}
              </p>
            </div>

            <div className={s.summaryDivider} />

            <div className={s.summaryRow}>
              <span>Subtotal</span>
              <span>GHS {CART.priceGhs.toLocaleString("en-GH")}</span>
            </div>
            <div className={s.summaryRow}>
              <span>Estimated Delivery</span>
              <span>{isPickup ? "—" : `GHS ${CART.deliveryGhs}`}</span>
            </div>

            <div className={s.summaryDivider} />

            <div className={s.summaryTotal}>
              <span>Total</span>
              <span>GHS {total.toLocaleString("en-GH")}</span>
            </div>

            <p className={s.summaryNote}>
              Confirming this order opens WhatsApp for manual payment and
              availability verification.
            </p>
          </aside>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className={s.stickyBar}>
        <button className={s.stickyBtn} onClick={handleConfirm} type="button">
          <WaIcon />
          Confirm Availability &amp; Chat
        </button>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Field({ label, id, hint, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{
        fontFamily: "var(--f-body)", fontSize: "0.52rem",
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--parch-soft)", display: "flex", alignItems: "center", gap: 5
      }}>{label}</label>
      {children}
      {hint && <span style={{
        fontSize: "0.52rem", color: "var(--parch-mute)", lineHeight: 1.5
      }}>{hint}</span>}
    </div>
  );
}

function PayOption({ id, label, icon, active, onClick }) {
  const s2 = {
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px 16px",
    border: `1px solid ${active ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.06)"}`,
    background: active ? "rgba(201,168,76,0.06)" : "transparent",
    cursor: "pointer", marginBottom: 8,
    transition: "border-color 0.25s, background 0.25s",
    fontFamily: "var(--f-body)", fontSize: "0.6rem",
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: active ? "var(--parchment)" : "var(--parch-soft)",
  };
  const dot = {
    width: 14, height: 14, borderRadius: "50%",
    border: `1px solid ${active ? "var(--gold)" : "var(--parch-mute)"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, marginLeft: "auto",
  };
  const inner = {
    width: 6, height: 6, borderRadius: "50%",
    background: "var(--gold)", opacity: active ? 1 : 0,
    transition: "opacity 0.2s",
  };
  return (
    <button type="button" role="radio" aria-checked={active}
      aria-label={label} style={s2} onClick={onClick}>
      {icon}
      {label}
      <span style={dot}><span style={inner} /></span>
    </button>
  );
}

/* ── Inline SVGs ── */

function WaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"
      width="14" height="14" fill="currentColor" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      <path d="M16.003 2.667C8.639 2.667 2.667 8.636 2.667 16c0 2.361.636 4.573 1.74 6.484L2.667 29.333l7.072-1.714A13.266 13.266 0 0 0 16.003 29.333C23.364 29.333 29.333 23.361 29.333 16S23.364 2.667 16.003 2.667zm0 2.4c5.838 0 10.597 4.756 10.597 10.597s-4.759 10.597-10.597 10.597a10.564 10.564 0 0 1-5.387-1.473l-.387-.235-4.2 1.018 1.065-3.988-.26-.41A10.563 10.563 0 0 1 5.405 16c0-5.841 4.759-10.933 10.598-10.933zm-3.058 5.546c-.214 0-.56.08-.853.398-.293.319-1.12 1.093-1.12 2.666 0 1.573 1.147 3.093 1.307 3.307.16.213 2.24 3.52 5.493 4.787 2.72 1.08 3.28.853 3.867.8.587-.053 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.253-.16.213-.32.24-.64.08-.32-.16-1.347-.497-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.707-1.733-.973-2.373-.253-.613-.507-.533-.707-.547l-.614-.013z"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

function MoMoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>
    </svg>
  );
}
