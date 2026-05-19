// app/not-found.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className={s.page}>
      <div className={s.container}>
        {/* Large 404 number */}
        <h1 className={s.code}>404</h1>

        {/* Message */}
        <h2 className={s.title}>Page Not Found</h2>
        <p className={s.text}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation options */}
        <div className={s.actions}>
          <button className={s.backBtn} onClick={() => router.back()}>
            ← Go Back
          </button>
          <Link href="/" className={s.homeBtn}>
            Return to Curation
          </Link>
        </div>

        {/* Suggestion */}
        <p className={s.hint}>
          Or explore our <Link href="/" className={s.link}>collection</Link> to find something you love.
        </p>
      </div>
    </main>
  );
}
