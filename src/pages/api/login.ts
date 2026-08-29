import type { APIRoute } from 'astro';
import { loginUser, generateToken } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email dan password wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const user = await loginUser(email, password);
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Email atau password salah' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = generateToken(user);
    
    cookies.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 hari
    });
    
    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};