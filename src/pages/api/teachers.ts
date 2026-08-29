import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { isAuthenticated } from '../../middleware/auth';

export const prerender = false;

// GET: Ambil semua data guru
export const GET: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { data: teachers, error } = await supabaseAdmin
      .from('teachers')
      .select('*')
      .order('code', { ascending: true, nullsFirst: false });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data: teachers }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal memuat data guru' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Tambah guru baru (Nama dan Kode)
export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { name, code } = body;

    if (!name || !code) {
      return new Response(JSON.stringify({ error: 'Nama guru dan Kode guru wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabaseAdmin
      .from('teachers')
      .insert([{ 
        name: name.trim(), 
        code: code.trim().toUpperCase(),
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ 
        error: error.message?.includes('duplicate') ? 'Kode guru sudah terdaftar' : error.message 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal menambahkan guru' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT: Edit / Update data guru (Nama dan Kode)
export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { id, name, code } = body;

    if (!id || !name || !code) {
      return new Response(JSON.stringify({ error: 'ID, Nama guru, dan Kode guru wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await supabaseAdmin
      .from('teachers')
      .update({
        name: name.trim(),
        code: code.trim().toUpperCase()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ 
        error: error.message?.includes('duplicate') ? 'Kode guru sudah digunakan oleh guru lain' : error.message 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal memperbarui data guru' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Hapus 1 guru atau banyak guru sekaligus (Bulk Delete)
export const DELETE: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const body = await context.request.json();
    const { id, ids } = body;

    const teacherIds: string[] = ids && Array.isArray(ids) ? ids : id ? [id] : [];

    if (teacherIds.length === 0) {
      return new Response(JSON.stringify({ error: 'ID guru tidak ditemukan' }), { status: 400 });
    }

    // Hapus data absensi terkait terlebih dahulu
    await supabaseAdmin.from('attendance').delete().in('teacher_id', teacherIds);

    // Hapus data guru
    const { error } = await supabaseAdmin
      .from('teachers')
      .delete()
      .in('id', teacherIds);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, count: teacherIds.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Gagal menghapus guru' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
