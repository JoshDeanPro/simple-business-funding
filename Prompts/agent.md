# Prompt: Agent Entry Point and Core Coding Directives

This is the first prompt you must review and follow upon entering this codebase. It outlines the architectural boundaries and coding constraints.

---

## 1. Core Directive: Keep Minimal
*   **Minimal Code Footprint**: Write clean, standard code. Avoid adding complex wrappers or duplicate styling utilities.
*   **Minimal Dependencies**: Do not add new NPM packages or frameworks unless absolutely necessary and approved. Rely on Vite, React 19, and Tailwind CSS v4.
*   **Minimal Surfaces**: Keep section layouts open and editorial. Avoid placing every paragraph inside a card or bordered panel.
*   **Minimal Backend**: Maintain the static public frontend. Do not add database storage, session accounts, user logins, CRMs, or external newsletter APIs.

---

## 2. Shared Brand Identity Guidelines
*   **Color System**: Midnight Navy (`#071A2B`) for dark bands, Clear Cobalt (`#1769E0`) for primary action buttons, Signal Lime (`#B9F34A`) for highlight accents and focus details.
*   **Visual Elements**: Keep button corners rounded-full for interactive friendly buttons, inputs rounded-xl (12px), and section bands square.
*   **Typography**: All page headings must use sentence case (e.g., "All library articles"). Do not use tracked uppercase eyebrows.

---

## 3. Form Submission Pipeline Rules
*   **Required Fields**: Preserve all 37 application fields in `src/routes/apply.tsx` and all contact fields in `src/routes/contact.tsx`.
*   **Synchronous Email Send**: Await the Cloudflare Worker Email API (`env.EMAIL.send`) to confirm mail delivery before returning success to the user.
*   **Local Testing**: Local endpoint testing commands and mock submissions are documented under `Prompts/Tools/01_MOCK_LEAD_SUBMITTER.md`.

---

## 4. Visual Verification ("Don't Forget" checklist)
*   [ ] Does the homepage navigation bar transition from transparent to solid white upon scroll?
*   [ ] Does the footer contain the correct legal disclaimer and support links?
*   [ ] Are all headings formatted in sentence case?
*   [ ] Did the typescript compiler run successfully with zero errors?
