# Prompt: Responsive Grid System Rules

Use this prompt to enforce grid columns, gutters, and widths across viewport breakages.

---

## Instructions
1. Limit page layouts to standard max widths:
   - **Wide Layout (Timeline, Outcomes)**: `max-w-6xl` (1152px).
   - **Focused/Form Layout**: `max-w-4xl` (896px).
   - **Reading Layout (Legal, Blogs)**: `max-w-2xl` (672px).
2. Gutters should scale dynamically:
   - **Mobile**: `px-4` (16px).
   - **Tablet**: `px-6` (24px).
   - **Desktop**: `px-8` (32px).
3. Grid columns must wrap safely (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Never enforce fixed pixel widths on grid parent containers.
