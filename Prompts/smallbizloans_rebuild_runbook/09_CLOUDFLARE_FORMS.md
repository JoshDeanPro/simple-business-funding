# Step 9 — Cloudflare Worker Forms and Production Behavior

## Mission

Verify the minimal backend and both form pipelines without adding infrastructure.

The website should remain static except for the two Worker form handlers.

## Non-negotiable constraints

- No database
- No authentication
- No dashboard
- No queue
- No background job
- No third-party email provider
- No Resend, SendGrid, SMTP service, or external email API key
- No CRM
- No storage system unless one already exists and is required
- Do not push to `main` yet

## Expected architecture

- Static public frontend
- Contact form endpoint
- Application form endpoint
- Cloudflare-native or existing email mechanism
- Synchronous success/failure response

Development submissions should continue to go to:

`jnyco@icloud.com`

Do not change the production destination unless explicitly instructed.

## Required audit

Inspect:

- Worker entry point
- Route matching
- Request parsing
- Validation
- Email binding/configuration
- Destination restrictions
- Error handling
- Logging
- Attachment behavior
- Wrangler configuration
- Environment configuration

## Contact form

Verify:

- Required fields
- Email format
- Message limits
- Clear success
- Clear failure
- No duplicate click behavior
- No form contents in URLs
- No sensitive body logging

## Application form

Verify:

- Current fields accepted
- Server-side validation
- Authorization requirement
- Conditional fields
- File behavior if present
- Readable email formatting
- Clear failure response
- Success only after confirmed send
- No form-body logging
- No hidden external service dependency

## Email behavior

The Worker should:

1. Validate
2. Format
3. Await the email send
4. Return success only when send succeeds
5. Return a safe failure when send fails

Do not pretend the application was received when email delivery failed.

Do not add retries or storage during this project.

## Security and limits

Use reasonable:

- Request-size limits
- Field-length limits
- Allowed content types
- File limits if uploads exist
- Origin checks if already supported
- Abuse protection already available in the project

Do not add a new external service merely for this step.

## Tests

Create or update minimal endpoint tests for:

- Valid contact
- Invalid contact
- Valid application
- Missing required field
- Missing authorization
- Send failure
- Duplicate submit protection where currently implemented
- Unsupported upload when applicable

## Required deliverable

Create:

`docs/09-cloudflare-forms.md`

Include:

- Final architecture
- Endpoint behavior
- Email implementation
- Environment/binding requirements
- Validation summary
- Limits
- Tests run
- Any manual Cloudflare setup still required

## Completion gate

Do not proceed until:

- Both forms work locally or in a safe preview environment
- Email delivery is confirmed
- No external provider was added
- No database or queue was added
- Success waits for actual send completion
- Failure preserves frontend values
- Tests pass
- Production build passes

## Next step

After the completion gate passes, open and execute:

`10_VISUAL_QA_AND_DEPLOY.md`
