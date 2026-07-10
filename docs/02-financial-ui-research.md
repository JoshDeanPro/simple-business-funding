# Step 2 Audit — Current Financial UI Research

This research document analyzes current UI/UX patterns across leading financial-service providers to establish high-confidence design guidelines for SmallBizLoans.

---

## 1. Comparative Analysis of Financial UI References

| Reference Brand | Primary Color Palette | Typography Scale | Rounded Shape Rules | Photography Style | Main Conversion Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Intuit / QuickBooks** | Deep slate (`#10252B`), growth green (`#28B86B`), cloud gray | Large humanist title, sentence-case headings | Softer buttons (`rounded-full`), `8px` cards | Authentic small business owners in shop/office contexts | Prominent "Get Started" buttons, minimal visual distraction |
| **SoFi** | Midnight blue (`#071A2B`), clear cobalt, modern aqua | Expressive bold sans titles, heavy weights | Round buttons, soft cards (`12px` to `16px`) | Confident people looking at camera, layered overlay elements | Primary cobalt buttons, clear single action focus |
| **Credit Karma** | Warm whites, dark navy, growth green, signal lime | Clean sans display title, sentence case | Soft pill shapes for controls, rounded cards | Bright, optimistic people in real-world scenarios | Clear outcome links, minimal secondary CTAs |
| **NerdWallet** | Hunter green, deep blue, gold, cloud | Substantial editorial headers, dark body | Restrained rounded corners, thin borders | Casual human portraits, clean outlines | Comparison grids, clean list tables |
| **Block Advisors** | Midnight navy, white, bold green accents | Confident, clean, structured sans typography | Generous button rounding, stable square blocks | Tax/advisor human portraits with employees | Direct booking links, clean form selectors |
| **Square Loans** | Pitch black, warm white, light gray, thin lines | Minimalist modern sans typography | Minimal rounding (`4px` to `8px`), square buttons | Tech-forward, high-contrast operational scenes | Inline sliders, dashboard panels |

---

## 2. Repeated Patterns That Work
*   **Transparent-to-Opaque Headers**: Using a transparent header over the dark hero fold, which transitions into a solid white container with dark text upon scrolling. This integrates the hero region and the header as a single, authored scene.
*   **Asymmetrical Hero Layouts**: Avoiding basic centered text columns or standard rectangular grids by using shaped image crops, overlapping overlays, or asymmetrical shapes.
*   **Sentence Case Typography**: Restricting uppercase text to tiny category labels or removing them entirely, allowing sentence case headings to establish a clean and professional reading hierarchy.
*   **Outcome-Focused Needs Selectors**: Prompting the user with a single simple question and five selectable outcome blocks, offering instant inline feedback and direct links.

---

## 3. Repeated Patterns That Feel Generic
*   **Technology Office Photography**: Images showing people sitting around computers or shaking hands in generic glass-walled offices.
*   **Overuse of Cards**: Stacking identical cards with gray borders down the page, which makes the site look like a default template.
*   **Exaggerated Floating Panels**: Floating fake mockups or dashboards that contain no real or useful data.

---

## 4. Visual and UX Recommendations for SmallBizLoans

### Hero Strategy
Redesign the hero with a deep navy background (`bg-midnight-gradient`), outcome-driven headline in 2-3 lines, and a custom cropped photo of a real small business owner. Place the no-guarantee disclaimer separately in smaller, readable text below.

### Page-Transition Strategy
Employ a dynamic header that stays transparent at the top of the homepage and transitions to solid white with dark text when scrolled past the hero fold.

### Form Strategy
Keep the secure multi-step application form clean: wide workspace on the right, compact progress rail on the left, pure white input fields with comfortable rounding, and signal lime reserved only for progress indicators or focus rings.

### Photography Strategy
Use documentary-style photography of local owner-operated businesses (restaurant, retail, salon, workshop) cropped with custom geometric curves (`rounded-[2.5rem] rounded-tr-[5rem] rounded-bl-[5rem]`) to avoid standard rectangular layouts.

### Shape & Rounding Strategy
Use softer rounding (`rounded-full`) for buttons to make them approachable. Use comfortable rounding (`rounded-xl` / `12px`) for forms and selectable inputs. Use minimal rounding (`rounded-none` or `rounded-2xl` for very large cards) on structural sections.

### Motion Strategy
Apply smooth transitions for scrolled states, soft fade-ins for selected choices in the selector, and accordion toggle transitions, ensuring `prefers-reduced-motion` compliance.

---

## 5. Visual-Direction Statement
SmallBizLoans will be presented as a high-confidence, national financial brand using a deep navy, clear cobalt, and warm white color palette, structural page layout asymmetry, and sentence-case typography to establish trust with small business owners.

SmallBizLoans should feel like a current financial brand with a guided application path, not a generic landing page or software dashboard.
