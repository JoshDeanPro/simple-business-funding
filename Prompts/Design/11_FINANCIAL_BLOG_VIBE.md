# Prompt: Premium Financial Blog Layout and Vibe

Use this prompt to instruct an AI layout designer to build an authentic editorial publication layout for the resources library.

---

## 1. Directory Structure & Layout
*   **Insights Library Index (`/blog`)**:
    *   **Hero Fold**: Display a publication title like "Business Owner Insights" with a clean subtitle describing the topics covered (cash flow, statements, underwriting).
    *   **Featured Spotlight**: Highlight one primary article at the top in a two-column editorial split (large illustration/photo on one side, title, description, category tag, author details, and read time on the other).
    *   **Topic Filtering**: Provide a horizontal row of category tags (e.g., "Cash Flow", "Underwriting Documents", "Business Strategy") that look clearly interactive.
    *   **Articles Grid**: Arrange articles in a responsive grid or row structure. Display category tags, read times, publish dates, and short summaries.
    *   **Newsletter Intake**: Include an inline, non-intrusive newsletter subscription form to capture email addresses.

*   **Individual Guide Page (`/blog/$slug`)**:
    *   **Page Header**: Display clear navigation breadcrumbs at the top (e.g., "Resources > Underwriting").
    *   **Author Profile**: Show the author's name, role, publication date, and read time near the title.
    *   **Reading Layout**: Constrain the article reading content to a single column (`max-w-2xl` / `672px`) with a minimum line height of `1.7` for readability.
    *   **Inline Callouts**: Insert helpful inline highlights (e.g., tips on collecting statements) and a quiet application CTA.
    *   **Related Guides**: Display two related article recommendations at the bottom.

---

## 2. Visual Style & Aesthetics
*   Avoid using generic cards with gray borders. Rely on thin divider lines and whitespace.
*   Category badges should use soft cobalt or blue outlines (`text-cobalt bg-soft-aqua/50 border border-cobalt/20`).
*   Include realistic small-business photography or diagrams.
