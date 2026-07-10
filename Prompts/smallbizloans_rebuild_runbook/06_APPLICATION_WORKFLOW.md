# Step 6 — Application Workflow

## Mission

Redesign the application page as the website’s core financial workflow.

Preserve the current fields, rules, endpoint, and submission behavior while making the experience clearer, wider, calmer, and more trustworthy.

## Non-negotiable constraints

- Do not remove required fields without explicit approval.
- Do not add login, saving, database storage, accounts, or dashboards.
- Do not add artificial eligibility steps.
- Do not add a fake approval meter.
- Do not change the email destination.
- Do not push to `main`.

## Page structure

### Desktop

Use:

- Compact progress/help rail
- Wide primary form workspace
- One visible section at a time
- Clear grouped fields
- Direct contact help
- Comfortable use of screen width

Avoid:

- Entire form inside one giant card
- Preparation card above another form card
- Narrow center column
- Nested panels
- Crowded horizontal step names

### Mobile

Use:

- Compact progress summary
- Full-width controls
- One-column layout
- Collapsible help/preparation
- Easy Continue and Submit access
- No horizontal overflow
- No fixed-height clipping

## Step system

Use the real application stages only.

Use accurate names based on the current form, such as:

- Business
- Ownership
- Profile
- Funding
- Documents or Authorization
- Review and Submit

Do not create fake progress before the form begins.

## Form controls

Use:

- White editable fields
- Visible neutral borders
- Dark input text
- Strong labels
- Clearly marked optional fields
- Helpful examples where useful
- Accessible autofill attributes
- Clear focus
- Clear error
- Clear disabled
- Clear selected
- Progressive disclosure

Do not use gray-green fields that resemble disabled controls.

## Conditional logic

Only show prior-funding details when relevant.

Do not ask users to process irrelevant fields.

## Error handling

- Preserve entered values.
- Focus the first invalid field.
- Show a concise error summary when appropriate.
- Show field-specific messages.
- Do not rely only on red.
- Keep submit/continue states clear.
- Prevent duplicate clicks while processing.

## Documents

Do not invent new document requirements.

If uploads already exist:

- Verify file selection
- Verify allowed types and limits
- Show selected filenames
- Allow removal
- Show errors before submission where possible
- Confirm actual email behavior and size limits

If uploads are not part of the current working implementation, do not add storage infrastructure during this step.

## Review and authorization

Create a calm review step.

Clearly separate:

- Applicant information
- Funding information
- Documents
- Authorization
- Final submission

Do not hide important authorization language.

## Confirmation

Only show success after the Worker confirms the send succeeded.

Confirmation must include:

- Application received
- What happens next
- Contact information
- Accurate no-guarantee disclosure

Do not immediately upsell the applicant.

## Required deliverable

Create:

`docs/06-application-workflow.md`

Include:

- Existing field inventory
- Final step structure
- Conditional logic
- Validation behavior
- Upload behavior
- Desktop layout
- Mobile layout
- Error and success behavior
- Screenshots for every step at desktop and mobile

## Completion gate

Do not proceed until:

- Every current application field is accounted for
- Existing validation still works
- Conditional fields work
- Values persist after errors
- Mobile layout works
- Submission behavior is unchanged
- Success appears only after confirmed email send
- Production build passes

## Next step

After the completion gate passes, open and execute:

`07_SUPPORTING_PAGES.md`
