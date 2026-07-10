# Step 1 Audit — Site Architecture and Information Architecture

## 1. Current Route Inventory
The repository is built with **Vite + TanStack Start (React + TypeScript)**. The routing structure is defined inside `src/routes/` as:
1.  **`/`**: [src/routes/index.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/index.tsx) — Homepage
2.  **`/apply`**: [src/routes/apply.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/apply.tsx) — Business funding application workflow
3.  **`/faq`**: [src/routes/faq.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/faq.tsx) — Frequently Asked Questions / Help Center
4.  **`/blog`**: [src/routes/blog.index.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/blog.index.tsx) — Resources and articles library index
5.  **`/blog/$slug`**: [src/routes/blog.$slug.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/blog.$slug.tsx) — Single editorial guide page
6.  **`/contact`**: [src/routes/contact.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/contact.tsx) — Direct coordinator assistance form
7.  **`/privacy`**: [src/routes/privacy.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/privacy.tsx) — Privacy policy document
8.  **`/terms`**: [src/routes/terms.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/terms.tsx) — Terms of use document

---

## 2. Current Component Inventory
Shared layout and helper components inside `src/components/` and `src/components/ui/`:
*   **`src/components/site-layout.tsx`**: Shared shell including dynamic `<header>` navigation and `<footer>` links/disclaimers.
*   **`src/components/ui/`**: 47 custom components including `accordion.tsx`, `alert-dialog.tsx`, `button.tsx`, `progress.tsx`, `select.tsx`, `textarea.tsx`, `checkbox.tsx`, `radio-group.tsx`, etc.
*   **`src/lib/seo.ts`**: SEO helper functions for page schema creation.

---

## 3. Current Backend/Form Inventory
The website operates exactly two form endpoints powered by TanStack Start server handler POST functions executing on Cloudflare Workers:
1.  **Application Form (`/apply`)**: Collects 37 business, ownership, and profile data fields, processes attachments (bank statements/contracts), and triggers a lead notification email via `sendLeadEmail` to the recipient (`jnyco@icloud.com`) using Cloudflare Email Routing.
2.  **Contact Form (`/contact`)**: Collects user messages and coordinates emails directly to the coordinator.

---

## 4. Main Visual and UX Failures
*   **Hero Congestion**: The first screen has historically been crowded with conflicting components (launcher choice tiles, disclosures, checklists, and multiple buttons) which distracts from the core call to action.
*   **Awkward Copy**: Bureaucratic phrasing such as "secure cash reserve breathing room" and "coordinate your file" sounds overly technical.
*   **Border-Container Overuse**: Many sections are styled inside separate white panels with gray borders, making the page resemble a stack of card templates.
*   **Inconsistent Header Transitions**: Lack of dynamic header transitions on the homepage hero creates a sharp visual disconnect at the top.

---

## 5. Final sitemap & Purpose of Each Route
*   **Home (`/`)**: Connects small business owners with funding options through outcome-focused copy and a guided path.
*   **Apply (`/apply`)**: Guides applicants through a secure, structured 6-step form.
*   **FAQ (`/faq`)**: A help center presenting categorised accordions and support details.
*   **Resources (`/blog`)**: An educational index sharing editorial guides.
*   **Contact (`/contact`)**: A direct channel for users to message and call.
*   **Legal (`/privacy`, `/terms`)**: Legible, plain-text compliance documents.

---

## 6. Homepage content order
1.  **Integrated Hero**: Headline, supporting message, cobalt CTA button, outlined preparation action, and a reassurance label, layered with an asymmetrical curved documentary photo.
2.  **Compact Needs Selector**: Simple question, five interactive choices, and a quick redirect.
3.  **Practical Outcomes**: Structured asymmetric outcome grid.
4.  **Application Process**: Connected timeline tracking 3 stages.
5.  **Preparation Checklist**: Documents prepare checklist.
6.  **How SmallBizLoans Helps**: Lower-placed role explanation block.
7.  **Human Contact Desk**: Inline card containing support details.
8.  **FAQ Preview**: Accordion presenting 3 core answers.
9.  **Closing Action**: A final high-contrast blue CTA banner.

---

## 7. Shared-Component Plan
*   **Maintain**: Custom dynamic header transitions (transparency detection) in `site-layout.tsx`.
*   **Upgrade**: Set input fields and form elements to sentence case globally.
*   **Remove Obsolete Elements**: Clean out leftover old briefcase icon blocks and styling containers.

---

## 8. Risks to Avoid
*   **Do not modify form fields or submission logic**: Keep the exact API keys, schemas, and file upload parameters intact to avoid breaking worker integrations.
*   **Do not use loud lime banner colors for large buttons**: Restrict lime to checkmarks and small labels.

---

## 9. Implementation Sequence
1.  **Step 2**: Financial UI Research (Confirm visual principles and spacing).
2.  **Step 3**: Design System (Refine CSS typography, variables, active rings, and buttons).
3.  **Step 4**: Messaging & Conversion (Update hero copy, labels, and role sentences).
4.  **Step 5**: Homepage Rebuild (Re-compose layout, hero masks, and launcher size).
5.  **Step 6**: Application Page (Refine stepper, left rail, inputs, and borders).
6.  **Step 7**: Supporting Pages (FAQ categorisation, resources rows, and direct contact grids).
7.  **Step 8**: Responsive QA (Inspect on mobile, tablet, and desktop).
8.  **Step 9**: Form Integration (Ensure server submission behaves correctly).
9.  **Step 10**: Push to main.
