# Step 6 Audit — Application Workflow Specification

This documents the technical and visual setup of the multi-step business funding application inside [src/routes/apply.tsx](file:///Users/joshua/Desktop/SmallBizLoanz/src/routes/apply.tsx).

---

## 1. Field Inventory (37 Fields)
The form collects and submits the following parameters to the Cloudflare Worker server handler:
*   **Business Info**: Legal business name (`legalName`), DBA (`dba`), Physical address (`address`), City (`city`), State (`state`), ZIP code (`zip`), Business phone (`bizPhone`), Fax (`fax`), Federal Tax ID (`taxId`), Primary contact name (`primaryContact`), Email address (`email`), Website (`website`), Date business started (`dateStarted`), Length of ownership (`lengthOwnership`), Years at location (`yearsAtLocation`), Number of operating locations (`numLocations`).
*   **Ownership Details**: Owner name (`ownerName`), Owner phone (`ownerPhone`), Owner address (`ownerAddress`), Owner city (`ownerCity`), Owner state (`ownerState`), Owner ZIP (`ownerZip`), Date of birth (`ownerDob`), SSN (`ownerSsn`), Ownership percentage (`ownership`), Owner title (`ownerTitle`), Ownership type (`ownershipType`).
*   **Business Profile**: Merchant type (`merchantType`), Merchant details (`merchantOther`).
*   **Funding Request**: Amount requested (`amountRequested`), Average card sales (`avgCardSales`), Average gross sales (`avgGrossSales`), Used cash advances before (`usedAdvance`), Previous funding company (`prevCompany`), Original balance (`origBalance`), Current balance (`currentBalance`), Repayment rate (`currentPayment`).
*   **Consent**: Consent authorization check (`consent`).

---

## 2. Final Step Structure
1.  **Business**: Corporate details and contact lines.
2.  **Ownership**: Owner identities and ownership percentages.
3.  **Profile**: Corporate structure, entity type, and transaction context.
4.  **Funding**: Funding request amounts, monthly revenues, and prior history.
5.  **Documents**: PDF/Image uploads (bank statements / contracts).
6.  **Sign & Submit**: Summary review, legal disclosures, electronic signature, and final submit action.

---

## 3. Conditional Form Logic
*   **Prior Advance History**: The form asks *"Have you used an advance before?"* (`usedAdvance`). If the user selects "Yes" (`yes`), conditional inputs are dynamically rendered to request details:
    *   *Previous funding company* (`prevCompany`)
    *   *Original balance* (`origBalance`)
    *   *Current balance* (`currentBalance`)
    *   *Current payment / daily holdback* (`currentPayment`)
*   If the user selects "No" (`no` or empty), these fields remain hidden and are skipped in client/server validations.

---

## 4. Validation & Error Handling
*   **Required Field Verification**: All fields in the active step are validated before the user can advance using the `next` step handler.
*   **Error Indicators**: Failed fields display red error notices below inputs and change outline borders.
*   **Persistence**: Form inputs are stored in local React component state, meaning values persist if server validation fails.

---

## 5. Upload Constraints & Document Behavior
*   **Allowed Extensions**: `.pdf`, `.jpg`, `.jpeg`, `.png`
*   **File Size Limit**: `5MB` per file.
*   **Upload Interactions**: File attachments show file sizes, allow deletion, and display upload validation messages instantly.

---

## 6. Layout Composition
*   **Desktop**: A two-column grid (`max-w-6xl`) with a sticky progress rail and support desk on the left, and a wide form card on the right.
*   **Mobile**: Stepper moves to a compact step header, and inputs stack as full-width elements.
