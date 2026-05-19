// app/products/[slug]/page.js
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/app/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — REYN`,
    description: p.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
