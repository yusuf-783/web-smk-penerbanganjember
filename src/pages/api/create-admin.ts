// src/pages/api/create-admin.ts
import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { hashPassword } from '../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email, password, full_name } = await request.json();

        if (!email || !password || !full_name) {
            return new Response(JSON.stringify({ error: 'Semua field wajib diisi' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Hash password agar aman di database
        const password_hash = await hashPassword(password);

        // Simpan ke tabel users di Supabase menggunakan service role (supabaseAdmin)
        const { data, error } = await supabaseAdmin
            .from('users')
            .insert([{ email, password_hash, full_name, role: 'admin' }])
            .select();

        if (error) {
            return new Response(JSON.stringify({ 
                error: error.message || 'Gagal menyimpan ke database Supabase',
                details: error.details || error.hint || ''
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};