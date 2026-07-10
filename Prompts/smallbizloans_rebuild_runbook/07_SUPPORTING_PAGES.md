# Step 7 — FAQ, Resources, Contact, and Legal Pages

## Mission

Rebuild the supporting pages so each has a distinct financial-service purpose while remaining part of the same brand system.

## Non-negotiable constraints

- Do not give every page the same hero.
- Do not place every page inside a giant card.
- Do not add backend features.
- Do not add fake articles, authors, dates, reviews, or credentials.
- Do not push to `main`.

## FAQ

Design it as a help center.

Use:

- Strong page introduction
- Topic/category navigation
- Main accordion area
- Human-help option
- Clear application link

Possible desktop layout:

- Compact topic rail
- Main questions and answers

Mobile:

- Simple category control
- Full-width accordion rows

Use rules, spacing, and active states instead of card stacks.

## Resources

Design it as a small editorial library.

Use:

- One featured guide when real content exists
- Topic grouping
- Clean article rows
- Useful summaries
- Related links
- Application connection where relevant

Do not use a grid of identical cards.

Do not publish thin placeholder content as if it were complete.

If content is not ready, create an honest and polished coming-soon state.

## Contact

Design it as a direct human-service page.

Include:

- Why someone should contact the business
- Phone
- Email
- Type of help available
- Contact form
- What happens after sending a message

Do not place phone and email in separate generic tiles unless the composition genuinely requires it.

Verify the form endpoint and current email destination remain unchanged.

## Privacy and Terms

Use:

- Readable line length
- Strong headings
- Section navigation if useful
- Subtle rules
- Clear updated date only if accurate

Do not wrap the entire document in a decorative card.

Do not rewrite legal meaning casually.

## Shared page rules

- Use the approved design tokens.
- Use page-specific compositions.
- Keep the primary action clear.
- Avoid repeated uppercase labels.
- Avoid generic black CTA slabs.
- Avoid excessive empty space.
- Avoid repeated rounded rectangles.
- Keep contact help visible where useful.

## Required deliverable

Create:

`docs/07-supporting-pages.md`

Include:

- FAQ structure
- Resources structure
- Contact structure
- Legal-page structure
- Components reused
- Components removed
- Desktop and mobile screenshot paths
- Any content gaps that remain

## Completion gate

Do not proceed until:

- Each page has a distinct composition
- FAQ is easy to scan
- Resources is honest and useful
- Contact information is prominent
- Contact form behavior remains intact
- Legal documents remain readable
- No route looks like a default component demo
- Production build passes

## Next step

After the completion gate passes, open and execute:

`08_RESPONSIVE_ACCESSIBILITY.md`
