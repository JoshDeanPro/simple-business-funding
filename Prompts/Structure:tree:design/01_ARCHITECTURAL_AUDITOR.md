# Prompt: Architectural Code Structure Auditor

Use this prompt to direct an AI to evaluate folder organization, dependency boundaries, and code structures.

---

## Instructions

1.  **Map Directory Layout**:
    *   Examine the files inside `src/routes/` and verify that all page endpoints correspond directly to the targeted public sitemap.
    *   Flag any files or modules that lie outside standard routing folders.

2.  **Verify Separation of Concerns**:
    *   Ensure server-side logic (e.g. email bindings, POST handlers) is clearly separated or annotated, and does not contaminate client-side layout trees.
    *   Verify that custom global CSS variables are declared cleanly in a single configuration block (like `styles.css`) rather than ad-hoc definitions.

3.  **Clean up Obsolete Assets**:
    *   Identify components, layouts, or assets that are present in the filesystem but are not referenced in imports.
