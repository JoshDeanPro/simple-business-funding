# Prompt: Global CSS Variables Compliance Auditor

Use this prompt to check CSS files for color literals.

---

## Terminal Commands & Instructions
1. Search stylesheets for raw hex color strings:
   ```bash
   grep -rnw "src/" -e "#[0-9a-fA-F]\{6\}"
   ```
2. Verify all color literals are declared through variables.
