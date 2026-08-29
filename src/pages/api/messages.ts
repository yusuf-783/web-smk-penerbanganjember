import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { isAuthenticated } from '../../middleware/auth';

export const prerender = false;

// GET: Ambil daftar pesan masuk (Admin Only)
export const GET: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal memuat pesan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Kirim pesan baru dari Formulir Kontak Publik
export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Nama, email, dan pesan wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabaseAdmin.from('messages').insert([
      {
        name: name.trim(),
        email: email.trim(),
        subject: subject?.trim() || 'Tanpa Subjek',
        message: message.trim(),
        is_read: false,
        created_at: new Date().toISOString()
      }
    ]).select().single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal mengirim pesan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT / PATCH: Tandai sudah dibaca
export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { id, is_read } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID pesan diperlukan' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('messages')
      .update({ is_read: is_read ?? true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal mengubah status pesan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Hapus pesan
export const DELETE: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(context.request.url);
    const queryId = url.searchParams.get('id');

    let idToDelete = queryId;
    if (!idToDelete) {
      const body = await context.request.json().catch(() => ({}));
      idToDelete = body.id;
    }

    if (!idToDelete) {
      return new Response(JSON.stringify({ error: 'ID pesan tidak ditemukan' }), { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('messages')
      .delete()
      .eq('id', idToDelete);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal menghapus pesan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
