# 🗂️ Outbox

![Live Status](https://img.shields.io/badge/Status-Live-success)
**Live Demo:** [https://outbox.shreyasvavley.workers.dev/](https://outbox.shreyasvavley.workers.dev/)

**A high-fidelity, schema-driven resume engine with real-time automated canvas constraints.**

Outbox is a modern resume builder designed for developers and designers who want total control over their data without sacrificing layout precision. Instead of fighting with WYSIWYG editors, you provide strict JSON-like structured data in the Editor, and the Canvas takes care of pixel-perfect A4 constraints, typography scaling, and print formatting.

---

## ✨ Features

- 🏗️ **Schema-Driven Editor:** A clean, form-based editor split cleanly from the rendering logic. Supports Basics, Experience, Education, Skills, Projects, and Certificates.
- 🚀 **Anti-Gravity Auto-Fit Engine:** Built-in `ResizeObserver` algorithms automatically calculate overflow on the physical A4 document and dynamically scale down font sizes and line spacing to ensure your resume always perfectly fits onto a single page without bleeding over the margins.
- 🎨 **Dynamic Theme System:** Instantly toggle between beautifully crafted CSS-variable themes like **Classic Light**, **Dark Minimal**, and **Midnight Obsidian**.
- 🛠️ **Fine-Tuned Design Controls:** Manually override the Base Font Size, Margin Size (in mm), Line Spacing, and Heading Scale.
- 🏅 **Zero-API Certificate Fetcher:** Paste a certificate URL (Credly, Coursera, etc.) and our built-in backend scraper instantly pulls the OpenGraph metadata (Name and Issuer) to generate the block without requiring expensive third-party API keys.
- 🖨️ **Print-Ready PDF Export:** One-click pixel-perfect export. All UI elements (buttons, editor panel) are stripped away using `@media print`, leaving only the pure A4 document for perfect PDF generation.

---

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Fast, decentralized atomic updates)
- **Styling:** Vanilla CSS & CSS Variables (for maximum runtime performance and strict typography control)
- **Backend:** Next.js Edge API Routes + [Cheerio](https://cheerio.js.org/) (for lightweight HTML parsing)

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShreyasVavley/OUTBOX.git
   cd OUTBOX
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(Note: The `package-lock.json` has been intentionally removed to allow clean cross-platform builds without native-binary cache issues).*

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the App:** Navigate to [http://localhost:3000](http://localhost:3000) to see the builder.

---

## ☁️ Deploying to Cloudflare Pages

Outbox is pre-configured to run perfectly on Cloudflare Pages using the Edge runtime. 

1. Push your repository to GitHub.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
3. Click **Create Application** -> **Pages** -> **Connect to Git**.
4. Select the `OUTBOX` repository.
5. Cloudflare will automatically detect the **Next.js** framework preset. Click **Save and Deploy**.

*(Because the API route uses `export const runtime = 'edge'`, Cloudflare will deploy the certificate scraper globally to its edge network.)*

---

## 📝 License

This project is licensed under the MIT License.
