# Skill Prompt: SEO Content Auditor

Use this prompt to direct an AI agent or content specialist to review a page's SEO fields and schema definitions for search engine compliance.

---

## Skill Target
Audit a webpage's page head headers, JSON-LD script schemas, title lengths, and hierarchy layouts.

---

## Audit Checklist

1.  **Tag Inspection**:
    *   *Title Tag*: Check that the title is descriptive, matches page intent, and remains under **60 characters**.
    *   *Meta Description*: Verify that descriptions summarize content accurately and stay under **155 characters**.
    *   *Theme Color*: Ensure a valid hex theme color matches the brand identity in mobile search bars.

2.  **Semantic Headers**:
    *   Ensure exactly **one** `<h1>` is present on the page.
    *   Verify that nested sections follow a strict descending structural order (`<h2>`, `<h3>`, `<h4>`).

3.  **JSON-LD Schema Verification**:
    *   Inspect schema outputs inside webpage scripts.
    *   Ensure `Organization` and `WebSite` schemas are rendered on the homepage, and `BreadcrumbList` is present on subpages.
    *   Verify all URLs are absolute.
