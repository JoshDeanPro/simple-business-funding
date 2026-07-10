# Prompt: Responsive Asymmetrical Hero Component Builder

Use this prompt to instruct an AI coder to write a premium, non-template website hero component featuring asymmetrical layouts and shapes.

---

## Instructions

1.  **Layout Architecture**:
    *   Construct a two-column desktop layout using a grid.
    *   The left column should house display typography in sentence case, a brief paragraph description, primary and secondary call-to-actions, and reassurance points.
    *   The right column must present a cropped, shaped documentary photograph representing the industry (avoiding standard rectangular frames).

2.  **Visual Depth & Rounding**:
    *   Apply custom geometric roundings to the photograph (e.g., using Tailwind classes like `rounded-[2.5rem] rounded-tr-[5rem] rounded-bl-[5rem]`) to create an authored, high-end editorial feel.
    *   Use gradient overlays to blend the image into the background canvas safely.

3.  **Mobile Behavior Rules**:
    *   Ensure that columns stack vertically on viewports below the desktop breakpoint.
    *   Ensure all buttons scale to full touch target sizes and labels wrap correctly.

4.  **Color Constraints**:
    *   Do not use dominant accent colors (like lime) as button backgrounds simultaneously if they are used to highlight title phrases. Keep primary action buttons in solid brand colors (like cobalt).
