# Prompt: Local Development, Git, and Deployment Workflow

Use this prompt to guide development execution, branch checkouts, git pushes, versioning, and Cloudflare Wrangler deployment steps.

---

## 1. How to Run Local Development
Always perform these local commands at the project root `/Users/joshua/Desktop/SmallBizLoanz` before proposing changes:

1.  **Launch Local Dev Server**:
    ```bash
    npm run dev
    ```
    *   Verify features locally at **[http://localhost:5173/](http://localhost:5173/)**.
    *   Inspect HMR (Hot Module Replacement) logs for warnings.
2.  **TypeScript Verification**:
    ```bash
    npx tsc --noEmit
    ```
    *   Ensure there are zero compilation errors in the routes or components.
3.  **Code Formatting**:
    ```bash
    npx prettier --write .
    ```
    *   Ensure all stylesheets, TypeScript, and JSON files are properly aligned.
4.  **Linter Verification**:
    ```bash
    npm run lint
    ```
5.  **Compile Verification**:
    ```bash
    npm run build
    ```
    *   Confirm Vite successfully builds client and server SSR bundles.

---

## 2. Git & Push Workflow
1.  **Scope Commits**: Keep commits small and specific to the refactoring step.
2.  **Verify Status**:
    ```bash
    git status
    ```
3.  **Push to Branch**:
    ```bash
    git add .
    git commit -m "feat: description of scoped changes"
    git push origin main
    ```

---

## 3. Versioning for Major Changes
*   **Mandatory Rule**: **Always do versioning for major changes.**
*   **Trigger**: Any rewrite of core layout sections, updates to color variables, form modifications, or new route registrations.
*   **Action Steps**:
    1.  Open [package.json](file:///Users/joshua/Desktop/SmallBizLoanz/package.json) and bump the version string according to Semantic Versioning (e.g., minor bump `1.1.0 -> 1.2.0`, or major bump `1.0.0 -> 2.0.0` for full rebuilds).
    2.  Create a corresponding git tag for release identification:
        ```bash
        git tag -a v1.2.0 -m "Refactor visual theme and sitemap architecture"
        git push origin v1.2.0
        ```
    3.  Log updates in the project changelog or step log files.

---

## 4. Wrangler Production Deployment
1.  Verify Wrangler binds in [wrangler.jsonc](file:///Users/joshua/Desktop/SmallBizLoanz/wrangler.jsonc).
2.  Ensure local build is compile-clean:
    ```bash
    npm run build
    ```
3.  Run wrangler deploy using authenticated credentials:
    ```bash
    npx wrangler deploy
    ```
4.  Manually test the live URLs to verify email forwarding delivery.
