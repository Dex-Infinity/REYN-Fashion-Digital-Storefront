# REYN — Fashion Digital Storefront

**Internationally Sourced. Locally Perfected.**

A luxury fashion e-commerce platform for curated, high-end clothing. Built for Accra with WhatsApp-first checkout, dynamic product tinting, and Ghana-specific delivery options.

---

## 🎨 Features

- **Dynamic Page Tinting** — Selecting a product finish updates the entire page's color temperature via CSS custom properties
- **Luxury Editorial Design** — Dark background with parchment text, Playfair italic headers, and gold accents
- **WhatsApp-First Checkout** — All orders flow through WhatsApp (wa.me) with rich pre-composed messages
- **Ghana-Optimized** — GPS/Digital Address support for doorstep delivery, MoMo and Cash on Delivery payment options
- **Responsive Grid** — Product curation and collection views adapt beautifully to mobile
- **Custom 404 Page** — Elegant error handling with navigation back options
- **Static Pre-Rendering** — Products pre-built at deploy time for instant page loads

---

## 🛠 Tech Stack

- **Framework** — Next.js 14 (App Router)
- **UI Library** — React 18
- **Styling** — CSS Modules (no frameworks)
- **Fonts** — Playfair Display (serif italic) + DM Mono (monospace)
- **State** — React hooks (`useState`, `useMemo`, `useEffect`)
- **Deployment** — Vercel recommended

---

## 📁 Project Structure

```
reyn-v2/
├── app/
│   ├── layout.js                 # Root layout (Nav, FloatingWA)
│   ├── page.js                   # Home page (product grid)
│   ├── page.module.css           # Home page styles
│   ├── globals.css               # Global design tokens & typography
│   ├── not-found.js              # Custom 404 page
│   ├── not-found.module.css      # 404 styles
│   ├── products/
│   │   └── [slug]/
│   │       └── page.js           # Dynamic product detail page
│   ├── checkout/
│   │   ├── page.js               # Checkout form (Ghana-specific)
│   │   └── checkout.module.css
│   ├── components/
│   │   ├── Nav.js                # Header with navigation
│   │   ├── Nav.module.css
│   │   ├── ProductDetail.js      # Product view with finish selector & tinting
│   │   ├── ProductDetail.module.css
│   │   ├── FloatingWA.js         # Floating WhatsApp button
│   │   └── FloatingWA.module.css
├── lib/
│   └── products.js               # Product data & utility functions
├── jsconfig.json                 # Path aliases (@/* → ./)
├── next.config.js
├── package.json
└── .gitignore                    # Excludes node_modules, .next
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Development server runs at `http://localhost:3000`

### Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with product grid |
| `/products/[slug]` | Dynamic product detail pages (e.g., `/products/obsidian-trench`) |
| `/checkout` | Order form with Ghana-specific delivery & payment |
| `404` | Custom error page |

### Product Slugs

- `obsidian-trench` — The Obsidian Trench (GHS 8,450)
- `silk-archive-slip` — The Silk Archive Slip (GHS 1,450)
- `draped-silk-blouse` — Draped Silk Blouse (GHS 280)

---

## 🎯 Key Components

### Product Data (`lib/products.js`)
Static array of luxury products with metadata:
- Name, price, material, fabric origin
- Collection labels
- Multiple finishes (color options) with hex values and page tone RGB offsets

### ProductDetail (`app/components/ProductDetail.js`)
- Finish selector (swatches)
- Dynamic page tinting effect
- Material & collection info
- WhatsApp order CTA buttons
- Sticky bottom action bar

### Checkout (`app/checkout/page.js`)
Form-based order interface:
- Delivery method toggle (doorstep vs. self-pickup)
- GPS/Digital Address field (doorstep only)
- Customer info (name, phone, email)
- Payment method (MoMo / Cash on Delivery)
- WhatsApp submission

### Nav (`app/components/Nav.js`)
Header with:
- REYN wordmark (links to home)
- Navigation links (Collections, Archive, Editorial, Cart)
- Bag/Cart icon

---

## 🎨 Design System

### Colors (CSS Custom Properties)
- `--bg` — Page background (shifts with finish selection)
- `--parchment` — Primary text (`#e8e0ce`)
- `--gold` — Accent color (`#c9a84c`)
- `--wa` — WhatsApp green (`#25D366`)

### Fonts
- **Display** — Playfair Display (italic for titles)
- **Body** — DM Mono (monospace for data)

### Motion
- `--fast: 0.25s`
- `--slow: 0.6s`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (custom bounce)

---

## 🔧 Configuration

### WhatsApp Number
Update the number in `lib/products.js`:
```javascript
export const WA_NUMBER = "233XXXXXXXXX"; // Replace with real number
```

### Cart Data
Currently hardcoded in `app/checkout/page.js`. Connect to a cart context or server state for multi-product orders.

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Deploy via Vercel Dashboard or CLI
vercel
```

### Environment Variables
None required for basic deployment. WhatsApp links work out-of-the-box.

---

## 📦 Build & Run

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## ✨ Future Enhancements

- [ ] Shopping cart context/state
- [ ] Real product images (replace placeholders)
- [ ] 3D product viewer integration
- [ ] Inventory & availability API
- [ ] Order tracking via WhatsApp
- [ ] Multiple language support
- [ ] Analytics & conversion tracking

---

## 📄 License

Proprietary — REYN Fashion

---

## 🤝 Contact

For inquiries, chat on WhatsApp or visit the collection.

**Built for Accra. Curated for excellence.**
