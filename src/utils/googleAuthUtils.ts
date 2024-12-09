export async function refreshGoogleToken(refreshToken: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!res.ok) {
    console.error('Failed to refresh Google token', await res.text());
    return null;
  }

  const data = (await res.json()) as {
    access_token: string;
    id_token?: string;
    expires_in: number;
  };
  // data будет содержать access_token, id_token (может отсутствовать), expires_in
  return {
    access_token: data.access_token,
    id_token: data.id_token,
    expires_in: data.expires_in,
  };
}
