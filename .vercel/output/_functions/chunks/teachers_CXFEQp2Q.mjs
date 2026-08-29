import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as isAuthenticated } from "./auth_DQOQabTH.mjs";
//#region src/pages/api/teachers.ts
var teachers_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { data: teachers, error } = await supabaseAdmin.from("teachers").select("*").order("code", {
			ascending: true,
			nullsFirst: false
		});
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data: teachers
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal memuat data guru" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { name, code } = await context.request.json();
		if (!name || !code) return new Response(JSON.stringify({ error: "Nama guru dan Kode guru wajib diisi" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await supabaseAdmin.from("teachers").insert([{
			name: name.trim(),
			code: code.trim().toUpperCase(),
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}]).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message?.includes("duplicate") ? "Kode guru sudah terdaftar" : error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal menambahkan guru" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, name, code } = await context.request.json();
		if (!id || !name || !code) return new Response(JSON.stringify({ error: "ID, Nama guru, dan Kode guru wajib diisi" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await supabaseAdmin.from("teachers").update({
			name: name.trim(),
			code: code.trim().toUpperCase()
		}).eq("id", id).select().single();
		if (error) return new Response(JSON.stringify({ error: error.message?.includes("duplicate") ? "Kode guru sudah digunakan oleh guru lain" : error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal memperbarui data guru" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, ids } = await context.request.json();
		const teacherIds = ids && Array.isArray(ids) ? ids : id ? [id] : [];
		if (teacherIds.length === 0) return new Response(JSON.stringify({ error: "ID guru tidak ditemukan" }), { status: 400 });
		await supabaseAdmin.from("attendance").delete().in("teacher_id", teacherIds);
		const { error } = await supabaseAdmin.from("teachers").delete().in("id", teacherIds);
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			count: teacherIds.length
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal menghapus guru" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/teachers@_@ts
var page = () => teachers_exports;
//#endregion
export { page };
