# Step 10 — Final Visual QA, Cleanup, and Deployment

## Mission

Perform a full production-ready review, fix remaining issues, then deploy.

Do not stop after the first screenshot pass.

## Non-negotiable constraints

- Complete at least two visual QA rounds.
- Do not push broken or partially reviewed work to `main`.
- Do not declare completion based only on build success.
- Do not leave obsolete components, CSS, assets, or dependencies from previous designs.

## Round 1 — Full visual inspection

Run the production-equivalent site.

Capture full-page screenshots for every public route at:

- Desktop
- Tablet
- Mobile

Also capture:

- Header open/closed mobile states
- Need-selection default/selected
- Every application step
- Form error state
- Form loading state
- Form success state
- FAQ expanded state
- Contact success/failure where practical

Compare all pages side by side.

Inspect for:

- Generic template patterns
- Repeated card systems
- Inconsistent page widths
- Weak hierarchy
- Unreadable text
- Broken image crops
- CTA visibility
- Excessive empty space
- Overflow
- Clipping
- Inconsistent rounding
- Color misuse
- Page-specific identity
- Inconsistent footer/header
- Mobile defects

Fix every meaningful issue found.

## Round 2 — Re-capture and verify

After fixes:

- Rebuild
- Re-run
- Re-capture screenshots
- Compare again
- Confirm defects are actually resolved

Do not reuse old screenshots as proof.

## Functional QA

Verify:

- Every route loads directly
- Navigation works
- Mobile menu works
- All CTAs go to the correct destination
- Contact form works
- Application form works
- Validation works
- Conditional fields work
- Failure preserves values
- Success only appears after Worker confirmation
- No console errors
- No broken assets
- No preview-domain metadata
- No horizontal overflow

## Cleanup

Remove:

- Obsolete components
- Old design tokens
- Conflicting styles
- Unused CSS
- Unused images
- Old startup-office image
- Development-only artifacts
- Unused dependencies
- Temporary debug output

Keep documentation and final research notes.

## Git and deployment

Before deployment:

- Confirm current branch
- Review `git diff`
- Run type checking
- Run tests
- Run production build
- Run formatting/lint checks
- Confirm no secrets are committed
- Confirm Cloudflare configuration is correct

Create a final redesign commit.

Merge or push to `main` only after every gate passes.

After pushing:

- Confirm Cloudflare deployment started
- Wait for completion
- Open the live domain
- Verify the deployed commit/version
- Test key routes
- Submit a safe test contact form
- Submit a safe test application if appropriate
- Confirm no stale cached assets remain

## Required final report

Create:

`docs/10-production-report.md`

Include:

- Final commit
- Routes verified
- Viewports verified
- Forms verified
- Email verified
- Accessibility checks
- Performance cleanup
- Components removed
- Dependencies removed or added
- Live deployment result
- Remaining known limitations
- Screenshot paths

## Final completion gate

The project is complete only when:

- Two screenshot QA rounds are finished
- Every route is visually coherent
- Every page has a distinct purpose
- Mobile is intentional
- Both forms work
- Email behavior works
- No external backend was added
- The production build passes
- Main is pushed
- Cloudflare deployment succeeds
- The live site is manually verified
