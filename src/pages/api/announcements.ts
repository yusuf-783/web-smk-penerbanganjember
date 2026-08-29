import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { isAuthenticated } from '../../middleware/auth';

export const prerender = false;

// GET: Ambil daftar pengumuman
export const GET: APIRoute = async (context) => {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (id) {
      const { data, error } = await supabaseAdmin
        .from('announcements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal memuat pengumuman' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Buat pengumuman baru
export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { title, content } = body;

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Judul dan isi pengumuman wajib diisi' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('announcements')
      .insert({
        title: title.trim(),
        content: content.trim(),
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal membuat pengumuman' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT: Edit pengumuman
export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { id, title, content } = body;

    if (!id || !title || !content) {
      return new Response(JSON.stringify({ error: 'ID, judul, dan isi pengumuman wajib diisi' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('announcements')
      .update({
        title: title.trim(),
        content: content.trim()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal mengubah pengumuman' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Hapus pengumuman
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
      return new Response(JSON.stringify({ error: 'ID pengumuman tidak ditemukan' }), { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('announcements')
      .delete()
      .eq('id', idToDelete);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal menghapus pengumuman' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
