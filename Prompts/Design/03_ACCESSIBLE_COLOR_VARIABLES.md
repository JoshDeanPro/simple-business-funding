# Prompt: Accessible Color Variables Specification

Use this prompt to establish or audit semantic color variable declarations in CSS.

---

## Instructions
1. Define clear CSS color variables (e.g. `--midnight-navy`, `--cobalt`, `--signal-lime`) inside the `@theme` or `:root` declaration block.
2. Group colors into:
   - **Major Brand Surfaces**: Deep blues/navy backgrounds (contrast > 10:1 against white).
   - **Interactive Accents**: Cobalts or evergreens for primary actions (contrast > 4.5:1 against white).
   - **Highlights & Indicators**: Lime or orange accents used sparingly (contrast > 4.5:1 against dark navy).
3. Ensure no hardcoded hex strings are used in component styling, only custom utility variables.
