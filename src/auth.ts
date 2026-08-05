// Simple cookie-based auth helper - replaces NextAuth entirely
// Works reliably on Cloudflare Workers edge runtime

export const ADMIN_COOKIE_NAME = "fortress_admin_session";
export const ADMIN_COOKIE_VALUE = "fortress-admin-authenticated-v1";

export function isAuthenticated(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes(`${ADMIN_COOKIE_NAME}=${ADMIN_COOKIE_VALUE}`);
}
