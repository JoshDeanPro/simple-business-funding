# Step 3 — Brand and Design System

## Mission

Create one original, implementation-ready visual system before rebuilding pages.

This step defines the website’s color, typography, shape, spacing, imagery, interaction, and surface rules.

## Non-negotiable constraints

- Do not copy another company’s palette or layout.
- Do not preserve old tokens merely because they already exist.
- Do not redesign full pages during this step.
- Do not add a new UI framework unless the existing stack cannot support the design.
- Keep dependencies minimal.
- Do not push to `main`.

## 1. Create an original color system

Develop two candidate financial palettes, test both, and select one.

The chosen system must include semantic roles for:

- Brand-dark
- Brand-primary
- Brand-secondary
- Signal/accent
- Page background
- Alternate section background
- Elevated surface
- Border
- Heading text
- Body text
- Muted text
- Link
- Focus
- Success
- Warning
- Error
- Disabled

Requirements:

- Most of the site should use light neutral surfaces.
- Dark brand fields should create authority in selected sections.
- The brightest accent should be scarce.
- The primary CTA color must remain highly visible.
- Text and controls must meet WCAG 2.2 AA contrast.
- Do not make every surface blue or green.
- Do not use pure neon as the primary product color.
- Do not use green for long body text.

Create contrast calculations or automated checks for the final pairings.

## 2. Define typography

Choose a modern humanist sans-serif direction appropriate for financial services.

Prefer an existing reliable system font or already-installed font unless a new font is truly justified.

Define a limited hierarchy:

- Display
- Page title
- Section title
- Supporting title
- Lead
- Body
- Form label
- Utility
- Legal

Rules:

- Sentence case by default
- Strong headings without making everything bold
- Readable line lengths
- Limited weights
- No repeated uppercase eyebrow labels
- Colored word emphasis only when meaningful and limited
- No decorative or futuristic type

## 3. Define shape and rounding

Rounded controls are intentional, but rounding must have hierarchy.

Define separate shape roles for:

- Primary button
- Secondary button
- Input
- Choice chip/tile
- Small support panel
- Image crop
- Large section
- Modal or mobile menu

Rules:

- Interactive controls can be softer and more rounded.
- Large structural sections should be more restrained.
- Do not use the same radius everywhere.
- Do not nest rounded rectangles.
- Do not turn every button into a full capsule.
- Do not use shape alone to imply status.

## 4. Define layout and spacing

Create:

- Responsive content grid
- Wide hero grid
- Editorial text width
- Application workspace width
- Legal-document width
- Section spacing scale
- Component spacing scale
- Mobile gutters
- Breakpoints based on content, not arbitrary device labels

The site must not use one narrow maximum width for every page.

## 5. Define surfaces

Limit the website to a small set of surface types:

- Page
- Light editorial band
- Dark brand band
- Interactive choice surface
- Form workspace
- Support panel
- Elevated overlay when genuinely needed

Do not create a universal card style.

## 6. Define imagery

Specify:

- Documentary-style owner-operated business photography
- Natural work environments
- Authentic activity
- Strong crops
- No generic startup-office scenes
- No handshakes
- No fake celebrations
- No hotlinked production assets

If no suitable owned or licensed image is available, use a clearly marked temporary local placeholder and document the required replacement.

## 7. Define interaction states

Create complete states for:

- Button
- Link
- Navigation
- Choice control
- Input
- Select
- Checkbox/radio
- Accordion
- Upload
- Progress
- Error
- Success
- Loading
- Disabled

Every interactive element needs:

- Default
- Hover
- Focus
- Pressed
- Disabled

Selected controls also need a clear selected state that does not rely on color alone.

## 8. Define motion

Use motion only for:

- State change
- Selection feedback
- Accordion expansion
- Form-step transition
- Progress
- Loading
- Success

Keep it fast and subtle.

Support reduced motion.

Do not add scroll choreography, parallax, floating decoration, or pulsing CTAs.

## Required implementation

Consolidate design tokens in the existing global style system.

Remove conflicting legacy color literals and obsolete overrides only after confirming they are no longer needed.

Create a small internal visual test area or development-only component preview covering:

- Buttons
- Inputs
- Choice controls
- Cards/panels
- Type hierarchy
- Color pairings
- Focus
- Error
- Disabled
- Dark surface
- Light surface

Do not expose a development-only design page in production navigation.

## Required deliverable

Create:

`docs/03-design-system.md`

Include:

- Final palette with semantic roles
- Contrast results
- Typography roles
- Shape roles
- Grid and spacing rules
- Surface types
- Photography rules
- Interaction-state rules
- Motion rules
- Components to update
- Legacy tokens/components to remove later

## Completion gate

Do not proceed until:

- The palette is accessible
- The primary CTA is clearly dominant
- The shape hierarchy is defined
- The layout grid supports different page types
- Component states have been visually checked
- No full page has been prematurely rebuilt

## Next step

After the completion gate passes, open and execute:

`04_MESSAGING_AND_CONVERSION.md`
