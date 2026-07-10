# Prompt: Interactive State Transitions Audit

Use this prompt to check interactive states on click triggers.

---

## Instructions
1. Every actionable element must support five distinct states:
   - **Default**: Styled to denote actionability (clear colors/underlines).
   - **Hover**: Shift color brightness or raise box shadow slightly.
   - **Focus**: Render a distinct border ring using `:focus-visible`.
   - **Pressed**: Depress slightly using `active:scale-[0.98]`.
   - **Disabled**: Dim opacity and change cursor to `not-allowed`.
2. Do not use color alone to represent selected states (e.g., combine a blue border with a checkmark or check indicator).
