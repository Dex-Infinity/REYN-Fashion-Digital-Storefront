// app/layout.js
import "./globals.css";
import Nav from "./components/Nav";
import FloatingWA from "./components/FloatingWA";

export const metadata = {
  title: "REYN — Curated for Accra",
  description: "Internationally sourced. Locally perfected.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <FloatingWA />
      </body>
    </html>
  );
}
