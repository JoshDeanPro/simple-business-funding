# Step 8 — Responsive, Accessibility, and Interaction QA

## Mission

Audit the entire redesigned frontend across devices and interaction states.

This is not a quick pass. Fix problems found.

## Non-negotiable constraints

- Do not declare accessibility based on TypeScript or build success.
- Do not push to `main`.
- Do not add an accessibility overlay.
- Fix the source.

## Responsive checks

Test at representative widths for:

- Narrow phone
- Large phone
- Tablet portrait
- Tablet landscape
- Laptop
- Wide desktop

Check every public route.

Verify:

- No horizontal overflow
- Header never clips
- Apply action remains accessible
- Mobile navigation works
- Headlines wrap naturally
- Images crop correctly
- Overlays do not cover text
- Buttons do not disappear
- Email addresses wrap safely
- Form fields remain usable
- Progress remains understandable
- Sticky controls do not hide content
- No fixed-height clipping
- No excessive blank space
- Footer remains structured

## Accessibility checks

Target WCAG 2.2 AA.

Check:

- Text contrast
- Control contrast
- Focus visibility
- Focus order
- Keyboard navigation
- Skip link
- Heading hierarchy
- Landmarks
- Form labels
- Required-field communication
- Error summaries
- Field errors
- Accordion semantics
- Mobile-menu semantics
- Button names
- Link names
- Image alt text
- Decorative-image handling
- Reduced motion
- Touch targets
- Zoom and reflow

Do not rely on color alone.

## Interaction-state audit

Capture or inspect:

- Default
- Hover
- Focus
- Pressed
- Selected
- Disabled
- Error
- Loading
- Success

For:

- Buttons
- Links
- Navigation
- Need-selection controls
- Inputs
- Selects
- Checkboxes/radios
- Accordions
- File inputs
- Form steps
- Contact submission
- Application submission

## Performance sanity check

Inspect:

- Image sizes
- Unused CSS
- Unused components
- Unnecessary JavaScript
- Font loading
- Layout shifts
- Repeated assets

Do not perform a stack rewrite.

## Required deliverable

Create:

`docs/08-responsive-accessibility.md`

Include:

- Viewports tested
- Routes tested
- Accessibility findings
- Contrast results
- Keyboard findings
- Mobile findings
- Fixes made
- Remaining limitations
- Screenshot paths

## Completion gate

Do not proceed until:

- Critical responsive defects are fixed
- Primary actions remain visible
- Forms work by keyboard
- Contrast is measured
- Focus is visible
- Errors are understandable
- Reduced motion is supported
- No major route overflows
- Production build passes

## Next step

After the completion gate passes, open and execute:

`09_CLOUDFLARE_FORMS.md`
