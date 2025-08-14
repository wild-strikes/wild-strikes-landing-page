export type WhitelistPayload = {
  walletAddress: string;
  email?: string;
  signature?: string;
  message?: string;
};

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

export async function whitelistOptIn(payload: WhitelistPayload) {
  const res = await fetch(`${API_BASE}/whitelist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    // include credentials/cookies if needed
    // credentials: 'include',
  });

  if (!res.ok && res.status !== 409) {
    const text = await res.text().catch(() => 'Request failed');
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json().catch(() => ({ success: res.ok || res.status === 409 }));
}

export type NewsletterPayload = {
  email: string;
};

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email } as NewsletterPayload),
  });
  if (!res.ok && res.status !== 409) {
    const text = await res.text().catch(() => 'Request failed');
    throw new Error(text || `Request failed with ${res.status}`);
  }
  // 409 means already subscribed; treat as success but mark it
  const data = await res.json().catch(() => ({}));
  return { ...data, alreadySubscribed: res.status === 409 };
}

export async function unsubscribeNewsletter(email: string) {
  const res = await fetch(`${API_BASE}/newsletter/${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => 'Request failed');
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function fetchNewsletter() {
  const res = await fetch(`${API_BASE}/newsletter`, { method: 'GET' });
  if (!res.ok) {
    const text = await res.text().catch(() => 'Request failed');
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}
