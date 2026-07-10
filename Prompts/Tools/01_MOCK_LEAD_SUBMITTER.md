# Tool Prompt: Mock Lead Submitter Generator

Use this prompt to instruct an AI programmer to build a script that submits mock payload files to form API endpoints for testing.

---

## Instructions

1.  **Generate Payloads**:
    *   Construct a script that creates simulated `FormData` structures.
    *   Include all 37 application fields with randomized but valid business names, phone numbers, state codes, and SSNs.

2.  **File Attachments**:
    *   Create mock file buffers representing PDF statements or images.
    *   Simulate multi-file selection parameters.

3.  **Submission Verification**:
    *   Post the mock `FormData` to `/apply` or `/contact` server routes.
    *   Log status codes, response headers, and print validation errors returned by the handler.
