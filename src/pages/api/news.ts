import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { isAuthenticated } from '../../middleware/auth';
import { formatGoogleDriveImageUrl } from '../../lib/gdrive';

export const prerender = false;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// GET: Ambil daftar berita
export const GET: APIRoute = async (context) => {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');

    if (id) {
      const { data, error } = await supabaseAdmin
        .from('news')
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
      .from('news')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal memuat berita' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Buat berita baru
export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { title, content, image_url, category, author } = body;

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Judul dan isi konten berita wajib diisi' }), { status: 400 });
    }

    const baseSlug = generateSlug(title) || 'berita-' + Date.now();
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
    const formattedImageUrl = formatGoogleDriveImageUrl(image_url);

    const { data, error } = await supabaseAdmin
      .from('news')
      .insert({
        title: title.trim(),
        slug: slug,
        content: content.trim(),
        image_url: formattedImageUrl,
        category: category || 'Berita',
        author: author || 'Admin',
        published_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal membuat berita' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT: Edit berita yang sudah ada
export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { id, title, content, image_url, category, author } = body;

    if (!id || !title || !content) {
      return new Response(JSON.stringify({ error: 'ID, judul, dan isi konten berita wajib diisi' }), { status: 400 });
    }

    const formattedImageUrl = formatGoogleDriveImageUrl(image_url);

    const { data, error } = await supabaseAdmin
      .from('news')
      .update({
        title: title.trim(),
        content: content.trim(),
        image_url: formattedImageUrl,
        category: category || 'Berita',
        author: author || 'Admin'
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
    return new Response(JSON.stringify({ error: error.message || 'Gagal mengubah berita' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Hapus satu atau beberapa berita
export const DELETE: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(context.request.url);
    const queryId = url.searchParams.get('id');

    let idsToDelete: string[] = [];

    if (queryId) {
      idsToDelete = [queryId];
    } else {
      const body = await context.request.json().catch(() => ({}));
      if (body.ids && Array.isArray(body.ids)) {
        idsToDelete = body.ids;
      } else if (body.id) {
        idsToDelete = [body.id];
      }
    }

    if (idsToDelete.length === 0) {
      return new Response(JSON.stringify({ error: 'ID berita yang akan dihapus tidak ditemukan' }), { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('news')
      .delete()
      .in('id', idsToDelete);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, deletedCount: idsToDelete.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal menghapus berita' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
