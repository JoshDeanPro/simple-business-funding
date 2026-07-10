# Step 3 Audit — Brand and Design System Specification

This specification documents the shared tokens, components, surface types, and interaction guidelines for the SmallBizLoans rebuild.

---

## 1. Chosen Color System & Semantic Roles

We have consolidated the styling tokens in [src/styles.css](file:///Users/joshua/Desktop/SmallBizLoanz/src/styles.css):

| Color Token | Variable Name | Hex Value | Primary Semantic Role |
| :--- | :--- | :--- | :--- |
| **Midnight Navy** | `--midnight-navy` | `#071A2B` | Major brand environments, hero background, timeline band, footer bg |
| **Deep Financial Blue** | `--deep-blue` | `#103C68` | Primary brand panels, subheadings, key timelines |
| **Clear Cobalt** | `--cobalt` | `#1769E0` | Primary CTA buttons, active navigation, focused outlines, links |
| **Modern Aqua** | `--aqua` | `#18AFC5` | Form progress meters, secondary interactive triggers |
| **Growth Green** | `--growth-green` | `#28B86B` | Positive outcomes indicators, success indicators |
| **Signal Lime** | `--signal-lime` | `#B9F34A` | Small details, focus outlines, selected marks |
| **Soft Aqua** | `--soft-aqua` | `#E6F5F5` | Light category buttons background, active indicators |
| **Cloud** | `--cloud` | `#F3F7F8` | Light secondary section bands, form input container backgrounds |
| **Warm White** | `--warm-white` | `#FCFCFA` | Main body backgrounds, form workspaces |
| **Primary Ink** | `--primary-ink` | `#10252B` | Headers, body text, form labels |
| **Muted Text** | `--muted-text` | `#5B6B70` | Secondary descriptions, captions, legal notices |
| **Neutral Border** | `--neutral-border` | `#CEDADD` | Input borders, separators, timeline dividers |

---

## 2. Contrast Calculations & Accessibility (WCAG 2.2 AA)
*   **White (`#FFFFFF`) or Cloud (`#F3F7F8`) on Midnight Navy (`#071A2B`)**: Contrast Ratio **17.8:1** (Passes WCAG AAA for all sizes).
*   **White (`#FFFFFF`) on Clear Cobalt (`#1769E0`)**: Contrast Ratio **4.8:1** (Passes WCAG AA for body text, AAA for headings).
*   **Primary Ink (`#10252B`) on Warm White (`#FCFCFA`)**: Contrast Ratio **17.1:1** (Passes WCAG AAA).
*   **Primary Ink (`#10252B`) on Signal Lime (`#B9F34A`)**: Contrast Ratio **11.2:1** (Passes WCAG AAA).
*   **Muted Text (`#5B6B70`) on White (`#FFFFFF`)**: Contrast Ratio **5.2:1** (Passes WCAG AA).

---

## 3. Typography Roles (Humanist Sans)
*   **Display**: `Outfit` font, size `2.25rem` (mobile) to `3.75rem` (desktop), weight `800` (extrabold), tracking `-0.02em`. Sentence case.
*   **Page Title**: `Outfit` font, size `2rem` (mobile) to `3rem` (desktop), weight `800`.
*   **Section Title**: `Outfit` font, size `1.5rem` to `2rem`, weight `800`, tracking `-0.02em`.
*   **Supporting Title**: `Outfit` font, size `1.125rem` to `1.25rem`, weight `700`.
*   **Lead Paragraph**: `Inter` font, size `1.125rem` (`18px`), weight `400` (normal), line height `1.75`.
*   **Body Copy**: `Inter` font, size `0.875rem` (`14px`), weight `400`, line height `1.625`.
*   **Form Label**: `Inter` font, size `0.875rem` (`14px`), weight `600` (semibold), text color `primary-ink`.
*   **Legal & Disclosures**: `Inter` font, size `0.75rem` (`12px`), weight `400`, text color `muted-text`.

---

## 4. Shape & Rounding Rules
*   **Primary Action Buttons**: Soft capsule (`rounded-full`) to denote key actions.
*   **Secondary/Outline Buttons**: Soft capsule (`rounded-full`).
*   **Form Inputs & Selects**: Comfortable medium rounding (`rounded-lg` / `8px` or `rounded-xl` / `12px`).
*   **Choice Tiles / Category Buttons**: Rounded `12px` (`rounded-xl`).
*   **Small Support Cards**: Rounded `16px` (`rounded-2xl`).
*   **Documentary Image Crop**: Curved asymmetrical cut (`rounded-[2.5rem] rounded-tr-[5rem] rounded-bl-[5rem]`).
*   **Major Section Bands**: Square corners (`rounded-none`).

---

## 5. Spacing Scale & Layout Widths
*   **Wide Hero Grid**: `max-w-6xl px-4 sm:px-6` (`1152px`).
*   **Application Workspace**: `max-w-6xl` with `lg:grid-cols-[240px_1fr]` (stepper rail left, form right).
*   **Editorial & Legal Layouts**: Outer container `max-w-6xl`, inner reading column `max-w-2xl`.
*   **Section Spacing**: `py-16 sm:py-20` (generous vertical spacing).
*   **Component Spacing**: `gap-6` (vertical form spacing), `gap-8 sm:gap-12` (grid gutters).

---

## 6. Surface Types
1.  **Page Canvas**: Warm White (`#FCFCFA`) body.
2.  **Light Section Band**: Cloud Gray (`#F3F7F8`) background, square corners, full width.
3.  **Dark Brand Band**: Midnight Navy-to-Financial Blue gradient (`bg-midnight-gradient`), full width.
4.  **Interactive Choice Tile**: Outlined card (`border-neutral-border` / `bg-cloud/40`), shifting to `border-cobalt` / `bg-soft-aqua` when selected.
5.  **Form Container**: Elevated premium card (`card-premium`) with light border and drop shadow.

---

## 7. Interaction States & Transitions
*   **Buttons (`.btn-premium-cobalt`)**:
    *   *Default*: Clear Cobalt gradient.
    *   *Hover*: Lighter blue gradient, shadow increase.
    *   *Active*: Solid cobalt blue, shadow inset.
    *   *Focus*: `focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2`.
*   **Form Inputs**:
    *   *Default*: White background, neutral gray border.
    *   *Hover*: Border changes to dark gray (`#A3B5BA`).
    *   *Focus*: Border changes to cobalt, ring outline cobalt.
    *   *Error*: Border changes to error red (`#B42318`).
*   **Motion Rules**: Accordions toggle via css height transition, form steps fade in smoothly. Compliance with `prefers-reduced-motion` is configured.
