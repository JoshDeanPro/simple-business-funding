# Step 7 Audit — FAQ, Resources, Contact, and Legal Pages Specification

This specification documents the layout structures and components for the supporting page routes.

---

## 1. FAQ Page (`/faq`)
*   **Structure**: 
    *   *Desktop*: Sticky categories rail on the left (`card-premium`) referencing bookmarks, main FAQ accordions on the right (`card-premium`) containing Q&A rows, and support desk coordinates.
    *   *Mobile*: Category list links fold above full-width accordion blocks.
*   **Accordion Styling**: Backgrounds use a light Cloud Gray (`bg-cloud/50`) with rounded borders, avoiding standard stacked cards.
*   **Typography**: All headers and category anchors are formatted in clean sentence case.

---

## 2. Resources Page (`/blog`)
*   **Structure**:
    *   *Featured Article*: A highlighted primary panel (`card-premium`) displaying the main resource guide at large scale with a Clear Cobalt button.
    *   *Articles List*: Editorial guide list items showing titles, read times, descriptions, and cobalt outline buttons. Avoids identical grid cards.
*   **Transitions**: Card layouts use custom border color hover transitions (`hover:border-cobalt`).

---

## 3. Contact Page (`/contact`)
*   **Structure**: Composed layout dividing information into columns:
    *   *Left side*: Expected response times, business hours, and phone/email links in clean font sizes.
    *   *Right side*: Form workspace (`card-premium`) collecting name, email, phone, message parameters.
*   **Submission Action**: Submit button uses the primary Cobalt gradient capsule (`btn-premium-cobalt`).

---

## 4. Legal Documents (`/privacy`, `/terms`)
*   **Structure**: Pure editorial text sheets centered at a readable width (`max-w-2xl`) inside the main `max-w-6xl` responsive page container.
*   **Styling**: Plain white backgrounds without cards or boxes.

---

## 5. Component Reuse & Clean-up
*   **Reused Components**: `<SiteLayout>`, `<Button>`, and `<Accordion>` from `@/components/ui/accordion`.
*   **Removed Elements**: Obsolescent uppercase text tags and bold tracked headers.
