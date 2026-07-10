const recentSubmissions = new Map<string, number>();
const WINDOW_MS = 2 * 60 * 1000;

function prune(now = Date.now()) {
  for (const [id, ts] of recentSubmissions) {
    if (now - ts > WINDOW_MS) recentSubmissions.delete(id);
  }
}

export function claimSubmission(id: string) {
  const key = id.trim();
  if (!key) return false;

  prune();
  if (recentSubmissions.has(key)) return false;
  recentSubmissions.set(key, Date.now());
  return true;
}

export function releaseSubmission(id: string) {
  recentSubmissions.delete(id.trim());
}
