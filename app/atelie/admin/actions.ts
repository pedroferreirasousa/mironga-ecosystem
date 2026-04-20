"use server";

export async function checkAdminPassword(password: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return password === secret;
}
