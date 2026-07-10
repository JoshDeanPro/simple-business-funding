# Prompt: Cloudflare Wrangler Deployment Guide

Use this prompt to deploy files using Wrangler.

---

## Terminal Commands & Instructions
1. Run `npx wrangler login` to authorize the development machine.
2. Execute the production build locally:
   ```bash
   npm run build
   ```
3. Deploy the Worker using the build directory path output:
   ```bash
   npx wrangler deploy
   ```
4. Verify deployment logs for any binding issues.
