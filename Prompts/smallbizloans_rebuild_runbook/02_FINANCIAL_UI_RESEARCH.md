# Step 2 — Current Financial UI Research

## Mission

Research current financial-service design patterns before choosing colors or building components.

The goal is not to copy another company. The goal is to understand why modern financial sites feel credible, current, human, and easy to act on.

## Non-negotiable constraints

- Use current public sources, prioritizing 2025–2026 experiences.
- Prefer official design systems and official company websites.
- Do not copy assets, exact layouts, proprietary copy, logos, or trademarks.
- Do not begin production implementation during this step.
- Do not push to `main`.

## Required research

Inspect the current public experiences of several relevant companies, including:

- Intuit
- QuickBooks
- Credit Karma
- NerdWallet
- SoFi
- H&R Block
- Block Advisors
- Square Loans or another current small-business finance provider

Also inspect official design guidance where available:

- Intuit / QuickBooks color, type, photography, product expression, and motion guidance
- Material 3 Expressive color roles, shapes, buttons, adaptive layouts, and motion
- Current WCAG 2.2 guidance for text, controls, focus, errors, and motion

## What to study

For every reference, document:

### Navigation

- Header height and density
- Brand placement
- Primary action placement
- Active states
- Mobile navigation
- Secondary navigation when present

### Hero composition

- Color field
- Typography scale
- Image integration
- Shape
- Depth
- Overlap
- Primary and secondary actions
- How the hero transitions into the next section

### Information architecture

- How the company explains its value
- How it reduces uncertainty
- How it routes users toward a task
- How it presents trust
- How it explains a process
- How it avoids overwhelming the visitor

### Color

- Dominant background colors
- Functional accent colors
- Button colors
- Neutral surfaces
- Contrast
- Color proportions
- Where bright colors are intentionally withheld

### Typography

- Headline size and tone
- Use of color emphasis
- Body-copy width
- Label style
- Number of visible type levels
- Sentence case versus uppercase

### Shape

- Button rounding
- Input rounding
- Image cropping
- Panel rounding
- Where corners are square or restrained
- How shape contrast supports hierarchy

### Photography

- Real people versus generic stock scenes
- Business context
- Image crop
- Relationship between image and interface
- Whether product/interface elements overlap photography

### Process and form design

- Progress indicators
- Step labels
- Help placement
- Required-document communication
- Error states
- Mobile form behavior
- Confirmation experience

### Motion

- What moves
- Why it moves
- Duration and restraint
- Reduced-motion behavior

## Evidence capture

Use browser or screenshot tools when available.

Store research notes and captures under:

`docs/research/financial-ui/`

Do not hotlink or ship reference assets in the production site.

## Required deliverable

Create:

`docs/02-financial-ui-research.md`

It must include:

- A comparison table of at least six current references
- Repeated patterns that work
- Repeated patterns that feel generic
- Principles appropriate for SmallBizLoans
- Patterns that must not be copied
- Recommended hero strategy
- Recommended page-transition strategy
- Recommended form strategy
- Recommended use of photography
- Recommended shape and rounding strategy
- Recommended motion strategy
- A concise visual-direction statement

End the document with this sentence:

> SmallBizLoans should feel like a current financial brand with a guided application path, not a generic landing page or software dashboard.

## Completion gate

Do not proceed until:

- Research includes current public experiences
- Official design guidance has been reviewed
- Screenshots or detailed observations exist
- Copying has been explicitly avoided
- The recommended principles are specific enough to implement

## Next step

After the completion gate passes, open and execute:

`03_DESIGN_SYSTEM.md`
