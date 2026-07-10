import { env } from "cloudflare:workers";

const destination = "jnyco@icloud.com";
const sender = "lizzy.alemayehu@smallbizloanz.com";

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

export async function sendLeadEmail(subject: string, rows: string[], message?: string) {
  await env.EMAIL.send({
    from: sender,
    to: destination,
    subject,
    text: [subject, message, rows.join("\n")].filter(Boolean).join("\n\n"),
    html: `<div style="font-family:Arial,sans-serif;color:#172033"><h2>${escapeHtml(subject)}</h2><table>${rows.join("")}</table>${message ? `<p style="margin-top:20px;white-space:pre-wrap">${escapeHtml(message)}</p>` : ""}</div>`,
  });
}
