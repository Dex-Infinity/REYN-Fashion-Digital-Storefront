// app/page.js
import Link from "next/link";
import { products } from "@/lib/products";
import s from "./page.module.css";

export const metadata = {
  title: "REYN — Curated for Accra",
  description: "Internationally sourced. Locally perfected.",
};

export default function HomePage() {
  return (
    <main className={s.page}>
      {/* Hero section */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <h1 className={s.heroTitle}>
            Internationally Sourced.
            <br />
            Locally Perfected.
          </h1>
          <p className={s.heroSubtitle}>
            Curated luxury fashion for Accra — each piece authenticated,
            inspected, and prepared for the discerning wearer.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className={s.grid}>
        <div className={s.gridInner}>
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className={s.card}>
              {/* Image placeholder */}
              <div
                className={s.cardImage}
                style={{ "--swatch": product.finishes[0].hex }}
              >
                <span className={s.cardGrain} aria-hidden="true" />
                <span className={s.cardAccent} aria-hidden="true" />
              </div>

              {/* Metadata */}
              <span className={s.cardCollection}>{product.collection}</span>
              <h2 className={s.cardName}>{product.name}</h2>
              <p className={s.cardPrice}>GH₵ {product.price.toLocaleString("en-GH")}</p>
              <p className={s.cardMaterial}>{product.material}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className={s.footer}>
        <div className={s.footerInner}>
          <h2 className={s.footerTitle}>The Reyn Standard</h2>
          <p className={s.footerText}>
            Every piece meets the highest international standards for material,
            construction, and finish. We authenticate, inspect, and hand-prepare
            each order for delivery across Accra.
          </p>
          <Link href="/checkout" className={s.footerCta}>
            Start Your Order →
          </Link>
        </div>
      </section>
    </main>
  );
}
