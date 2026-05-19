// lib/products.js

export const WA_NUMBER = "0554106732"; // ← swap in the real number

/**
 * Each finish carries:
 *  hex        — swatch colour
 *  pageTone   — CSS custom-prop value injected onto <html> to tint the whole page
 */
export const products = [
  {
    slug: "obsidian-trench",
    collection: "Archival Collection · 004",
    name: "The Obsidian Trench",
    price: 8450,
    material: "Heavyweight Bonded Silk",
    fabricOrigin: "Woven in Lyon, finished in Milan.",
    description:
      "Structured with architectural precision. The silhouette sits at the intersection of classic military tailoring and modern fluid drape — hidden plackets, exaggerated lapels, custom matte-black alloy hardware.",
    detailHeading: "Every seam has intention.",
    detailBody:
      "Tonal binding reinforces each edge. The half-canvas interior molds to the wearer across seasons, creating a bespoke fit that is uniquely yours over time.",
    finishes: [
      { label: "Noir",  hex: "#111111", pageTone: "15 14 14" },
      { label: "Slate", hex: "#6e7f8d", pageTone: "18 20 22" },
      { label: "Chalk", hex: "#ddd8ce", pageTone: "22 21 19" },
    ],
  },
  {
    slug: "silk-archive-slip",
    collection: "Archival Collection · 001",
    name: "The Silk Archive Slip",
    price: 1450,
    material: "100% Grade-6A Mulberry Silk",
    fabricOrigin: "Stone-washed in Suzhou, China.",
    description:
      "Cut on the bias from weightless mulberry silk. The slip moves with the body while a weighted hem maintains a precise, architectural fall. Bias seams only — no perpendicular cuts disturb the drape.",
    detailHeading: "The fabric speaks first.",
    detailBody:
      "Grade-6A mulberry silk develops a luminous patina with wear. Pre-washed without chemical softeners — the hand is entirely natural and improves across washings.",
    finishes: [
      { label: "Noir",  hex: "#111111", pageTone: "15 14 14" },
      { label: "Ivory", hex: "#f0ead8", pageTone: "23 22 19" },
      { label: "Blush", hex: "#c49a8c", pageTone: "21 17 16" },
    ],
  },
  {
    slug: "draped-silk-blouse",
    collection: "Current Collection",
    name: "Draped Silk Blouse",
    price: 280,
    material: "100% Mulberry Silk",
    fabricOrigin: "Woven in Como, Italy.",
    description:
      "The cowl neck falls in fluid cascades. Long sleeves with buttoned cuffs balance the drape — understated yet unmistakable in a room.",
    detailHeading: "The cowl is weighted.",
    detailBody:
      "A concealed satin ribbon inside the cowl ensures the drape lands precisely with every wear. French seams throughout.",
    finishes: [
      { label: "Taupe", hex: "#a8917e", pageTone: "19 17 15" },
      { label: "Noir",  hex: "#111111", pageTone: "15 14 14" },
      { label: "Ivory", hex: "#f0ead8", pageTone: "23 22 19" },
    ],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug) ?? null;

export const buildWaUrl = (productName, finish) => {
  const text = encodeURIComponent(
    `Hello, I'd like to confirm the availability of *${productName}* in *${finish}*. ` +
    `Please advise on sizing and next steps.`
  );
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
};

export const buildOrderWaUrl = (order) => {
  const lines = [
    `Hello REYN 👋`,
    ``,
    `I'd like to place the following order:`,
    ``,
    `*Item:* ${order.name}`,
    `*Size:* ${order.size} | *Finish:* ${order.finish}`,
    `*Qty:* 1`,
    ``,
    `*Name:* ${order.firstName} ${order.lastName}`,
    `*Phone:* ${order.phone}`,
    order.email ? `*Email:* ${order.email}` : null,
    ``,
    order.delivery === "doorstep"
      ? `*Delivery:* Doorstep — GPS: ${order.gps}${order.street ? `, ${order.street}` : ``}`
      : `*Delivery:* Self-Pickup`,
    `*Payment:* ${order.payment === "momo" ? "Mobile Money (MoMo)" : "Cash on Delivery"}`,
    ``,
    `*Total:* GHS ${order.total.toLocaleString("en-GH")}`,
    ``,
    `Please confirm availability. Thank you.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
};
