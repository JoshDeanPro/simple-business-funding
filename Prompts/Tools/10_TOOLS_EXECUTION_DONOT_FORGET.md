# Prompt: Terminal and Command Checklist

Use this checklist to ensure all code builds and deploys successfully.

---

## "Don't Forget" Commands & Deployment Checklist

*   [ ] **Local Verifications**:
    *   Has `npm run build` completed successfully?
    *   Did Prettier format all modified route files?
*   [ ] **Git Actions**:
    *   Are you on the correct branch before making commits?
    *   Is the git history free of unwanted files?
*   [ ] **Cloudflare Steps**:
    *   Is the `EMAIL` binding declared in `wrangler.jsonc`?
    *   Did the live URL test email deliver successfully?
