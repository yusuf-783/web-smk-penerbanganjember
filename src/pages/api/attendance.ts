import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { isAuthenticated } from '../../middleware/auth';

export const prerender = false;

// GET: Ambil data absensi berdasarkan Bulan dan Tahun
export const GET: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(context.request.url);
    const month = parseInt(url.searchParams.get('month') || '1');
    const year = parseInt(url.searchParams.get('year') || '2026');

    const { data, error } = await supabaseAdmin
      .from('attendance')
      .select('*')
      .eq('month', month)
      .eq('year', year);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal memuat data absensi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Simpan / Upsert data absensi guru pada tanggal tertentu
export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  
  try {
    const body = await context.request.json();
    const { teacher_id, date, hours, activity, month, year } = body;

    if (!teacher_id || !date) {
      return new Response(JSON.stringify({ error: 'teacher_id dan date wajib diisi' }), { status: 400 });
    }

    const hoursNum = Math.max(0, parseInt(hours) || 0);

    const { data, error } = await supabaseAdmin
      .from('attendance')
      .upsert({
        teacher_id,
        date,
        hours: hoursNum,
        activity: activity !== undefined ? String(activity).trim() : '',
        month: parseInt(month),
        year: parseInt(year)
      }, { onConflict: 'teacher_id,date' })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Gagal menyimpan absensi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};