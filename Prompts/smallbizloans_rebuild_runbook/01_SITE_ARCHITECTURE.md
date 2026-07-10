# Step 1 — Site Architecture and Current-State Audit

## Mission

Before changing colors, components, copy, or layouts, map the entire website and define the final information architecture.

This step prevents partial redesigns, duplicated sections, broken routes, and page-by-page patchwork.

## Non-negotiable constraints

- Keep the existing Cloudflare Workers deployment model.
- Keep the existing public routes unless a route is objectively broken or duplicated.
- Keep exactly two public forms:
  - Contact form
  - Business funding application
- Do not add login, authentication, accounts, dashboards, databases, saved applications, CRMs, queues, or third-party email services.
- Do not change application fields or Worker form behavior during this step.
- Do not push to `main` during this step.
- Work on a dedicated redesign branch.
- Do not redesign individual pages yet.

## Required actions

### 1. Inspect the repository

Use the terminal to inspect:

- Framework and build system
- Route structure
- Shared layout components
- Global styles and tokens
- Form components
- Worker routes
- Email implementation
- Public assets
- Current dependencies
- Existing tests
- Cloudflare configuration
- Git status and deployment branch

Run the project locally and confirm the current site renders before editing.

### 2. Inspect every public route

Open and review every page at desktop and mobile widths.

At minimum, inspect:

- Home
- Apply
- FAQ
- Resources
- Contact
- Privacy
- Terms
- Any error or confirmation routes

Record:

- Purpose of each page
- Primary user action
- Repeated content
- Missing content
- Broken hierarchy
- Reused template patterns
- Inconsistent page widths
- Unnecessary cards
- Duplicate calls to action
- Mobile problems
- Overflow or clipping
- Form problems
- Outdated assets
- Generic or misleading wording

### 3. Create the final site map

The default public structure should remain simple:

- Home
- Apply
- FAQ
- Resources
- Contact
- Privacy
- Terms

Define the exact purpose of every page in one sentence.

### 4. Define the homepage journey

The homepage should move through this sequence:

1. Outcome-led introduction
2. Optional recognition of the visitor’s business need
3. Practical ways funding may support a business
4. Simple application process
5. What applicants should prepare
6. How SmallBizLoans helps
7. Human assistance
8. FAQ preview
9. Final application action

Do not implement this yet. Define it clearly.

### 5. Define page-specific identities

Each page must have a distinct job and composition:

- **Home:** brand story and guided path toward applying
- **Apply:** professional financial workflow
- **FAQ:** help-center experience
- **Resources:** editorial education
- **Contact:** direct human service
- **Legal:** readable professional documents

Do not let every page use the same centered heading, rounded panel, and CTA block.

### 6. Define shared architecture

Identify the shared elements that should exist once:

- Header
- Mobile navigation
- Footer
- Page shell
- Buttons
- Form controls
- Section wrapper
- Support/contact block
- Notice
- Progress indicator
- Accordion behavior
- Error and success states

Identify obsolete components that should eventually be removed.

## Required deliverable

Create:

`docs/01-site-architecture-audit.md`

It must include:

- Current route inventory
- Current component inventory
- Current backend/form inventory
- Main visual and UX failures
- Final sitemap
- Homepage content order
- Purpose of each route
- Shared-component plan
- Components likely to be removed
- Risks that must not be introduced
- A short implementation sequence for later steps

## Completion gate

Do not proceed until:

- The current site builds locally
- Every route has been inspected
- The Worker/form architecture is understood
- The final page hierarchy is documented
- No production code has been redesigned prematurely
- The redesign branch is clean and ready

## Next step

After the completion gate passes, open and execute:

`02_FINANCIAL_UI_RESEARCH.md`
