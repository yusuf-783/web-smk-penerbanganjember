import type { APIContext } from 'astro';
import { verifyToken } from '../lib/auth';

export function isAuthenticated(context: APIContext): boolean {
  const token = context.cookies.get('auth_token')?.value;
  if (!token) return false;
  
  const user = verifyToken(token);
  return !!user;
}

export function getUser(context: APIContext) {
  const token = context.cookies.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}