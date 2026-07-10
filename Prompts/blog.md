# Prompt: Business Insights and Editorial Blog Guide

Use this prompt to design, audit, and rebuild the resources library and individual guide pages of SmallBizLoans to deliver a professional, publication-grade "blog vibe."

---

## 1. Directory Structure & Layout
*   **Insights Index (`/blog`)** -> Refered to in [blog.index.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/blog.index.tsx):
    *   **Hero Spot**: Display a centered header with the category prefix "Business Insights Desk", a large title, and a supporting subtitle.
    *   **Featured Guide Spotlight**: Present the most recent post in a clean two-column grid (large cropped thumbnail on the left, title, summary, author sign, read time, and "Read Featured Guide" button on the right).
    *   **Topic Filter Pills**: Provide a horizontal row of buttons to filter articles by category dynamically (e.g. "All", "Funding basics", "Applications", "Preparation").
    *   **Articles Row List**: Show remaining guides in a vertical list, separated by thin dividers (`border-neutral-border/30`), each including category tag, read time, title, intro, and a right-aligned "Read article" arrow link.
    *   **Newsletter Subscription**: Include an inline, full-width midnight-navy gradient card at the bottom containing an email input field and an outline button to subscribe.

*   **Individual Guide Page (`/blog/$slug`)** -> Refered to in [blog.$slug.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/blog.$slug.tsx):
    *   **Navigation Breadcrumbs**: Display "Home / Resources / [Category]" at the top.
    *   **Title Header**: Center the display title and display the author signature ("Lizzy Alemayehu • File Coordinator"), publish date, and read time.
    *   **Featured Image Crop**: Display the primary post image in a wide cropped aspect ratio (e.g. `21:9`) with generous rounded corners.
    *   **Reading Layout**: Constrain the article reading content to a single column (`max-w-2xl` / `672px`) with a minimum line height of `1.7` for comfortable scanning.
    *   **Inline Callout Box**: Inject a highlighted tips box ("Lizzy's Tip") in the middle of the article sections.
    *   **Call to Action Panel**: Display a rounded box prompting the reader to explore financing options or contact support.
    *   **Related Guides**: Recommend two other guides in a two-column layout at the bottom, using bottom dividers instead of boxes.

---

## 2. Linkages to Other Prompts (Process Flow)
*   **Design Quality Control**: Follow the visual checklists in [Design/10_DONOT_FORGET_DESIGN_CHECKLIST.md](file:///Users/joshua/Desktop/SmallBizLoanz/Prompts/Design/10_DONOT_FORGET_DESIGN_CHECKLIST.md) to verify spacing, colors, and interactive buttons.
*   **SEO Schema Checks**: Follow the JSON-LD schemas rules in [Skills/01_SEO_CONTENT_AUDITOR.md](file:///Users/joshua/Desktop/SmallBizLoanz/Prompts/Skills/01_SEO_CONTENT_AUDITOR.md) and [Skills/02_JSON_LD_SCHEMA_VALIDATOR.md](file:///Users/joshua/Desktop/SmallBizLoanz/Prompts/Skills/02_JSON_LD_SCHEMA_VALIDATOR.md).
*   **Code Hygiene**: Run the prettier formatter commands outlined in [Tools/04_LINT_AND_FORMAT_COMMANDS.md](file:///Users/joshua/Desktop/SmallBizLoanz/Prompts/Tools/04_LINT_AND_FORMAT_COMMANDS.md) and check for TypeScript errors via [Tools/05_TYPECHECKING_TEST_TRIGGER.md](file:///Users/joshua/Desktop/SmallBizLoanz/Prompts/Tools/05_TYPECHECKING_TEST_TRIGGER.md).
