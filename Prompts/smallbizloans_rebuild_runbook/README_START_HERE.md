# SmallBizLoans Redesign Runbook

Run the files in numerical order.

Do not skip steps.

Each file contains a completion gate and explicitly hands off to the next file.

## Sequence

1. `01_SITE_ARCHITECTURE.md`
2. `02_FINANCIAL_UI_RESEARCH.md`
3. `03_DESIGN_SYSTEM.md`
4. `04_MESSAGING_AND_CONVERSION.md`
5. `05_HOMEPAGE_REBUILD.md`
6. `06_APPLICATION_WORKFLOW.md`
7. `07_SUPPORTING_PAGES.md`
8. `08_RESPONSIVE_ACCESSIBILITY.md`
9. `09_CLOUDFLARE_FORMS.md`
10. `10_VISUAL_QA_AND_DEPLOY.md`

## Execution rule

Start with `01_SITE_ARCHITECTURE.md`.

Do not ask for permission between steps unless a real business fact, legal term, credential, or external account configuration is missing.

Do not stop after making the site compile.

Do not push to `main` until Step 10.
