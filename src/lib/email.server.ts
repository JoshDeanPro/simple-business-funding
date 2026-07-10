const destination = () => process.env.LEAD_EMAIL || "jnyco@icloud.com";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function emailRow(label: string, value: unknown) {
  return `<tr><td style="padding:8px 12px 8px 0;color:#64748b;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;font-weight:600">${escapeHtml(value)}</td></tr>`;
}

type EmailAttachment = {
  filename: string;
  content: string;
  contentType?: string;
};

export async function sendLeadEmail(
  subject: string,
  rows: string[],
  message?: string,
  attachments: EmailAttachment[] = [],
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Smallbizloanz <onboarding@resend.dev>",
      to: [destination()],
      subject,
      html: `<div style="font-family:Arial,sans-serif;color:#172033"><h2>${escapeHtml(subject)}</h2><table>${rows.join("")}</table>${message ? `<p style="margin-top:20px;white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}</div>`,
      attachments: attachments.length > 0 ? attachments : undefined,
    }),
  });
  if (!response.ok)
    throw new Error(`Email provider rejected the request: ${await response.text()}`);
}
