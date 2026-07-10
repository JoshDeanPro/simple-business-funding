# Prompt: Context Compression and Checkpoint Builder

Use this prompt to guide an AI developer to compress long conversation transcripts and task histories into a clean, actionable project checkpoint log.

---

## Instructions

1.  **Summarize Requests**:
    *   List all user requirements, design guidelines, and code edits from the session transcript in chronological order.
    *   Maintain exact wording for crucial specifications (such as hex values, path routes, and partner copy sentences).

2.  **Inventory Modified Files**:
    *   List every file edited during the session.
    *   Provide a 1-sentence description explaining exactly what changes were made in each file.

3.  **Document Active Context**:
    *   Record any background servers, port bindings, or build outputs currently running.
    *   Specify any environment variables or wrangler configurations verified.

4.  **Outline Next Steps**:
    *   List pending tasks in order of execution.
    *   Flag any missing credentials, files, or information that requires human intervention.
