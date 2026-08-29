import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as isAuthenticated } from "./auth_DQOQabTH.mjs";
//#region src/pages/api/announcements.ts
var announcements_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async (context) => {
	try {
		const id = new URL(context.request.url).searchParams.get("id");
		if (id) {
			const { data, error } = await supabaseAdmin.from("announcements").select("*").eq("id", id).single();
			if (error) throw error;
			return new Response(JSON.stringify({
				success: true,
				data
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { data, error } = await supabaseAdmin.from("announcements").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal memuat pengumuman" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { title, content } = await context.request.json();
		if (!title || !content) return new Response(JSON.stringify({ error: "Judul dan isi pengumuman wajib diisi" }), { status: 400 });
		const { data, error } = await supabaseAdmin.from("announcements").insert({
			title: title.trim(),
			content: content.trim(),
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal membuat pengumuman" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, title, content } = await context.request.json();
		if (!id || !title || !content) return new Response(JSON.stringify({ error: "ID, judul, dan isi pengumuman wajib diisi" }), { status: 400 });
		const { data, error } = await supabaseAdmin.from("announcements").update({
			title: title.trim(),
			content: content.trim()
		}).eq("id", id).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal mengubah pengumuman" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		let idToDelete = new URL(context.request.url).searchParams.get("id");
		if (!idToDelete) idToDelete = (await context.request.json().catch(() => ({}))).id;
		if (!idToDelete) return new Response(JSON.stringify({ error: "ID pengumuman tidak ditemukan" }), { status: 400 });
		const { error } = await supabaseAdmin.from("announcements").delete().eq("id", idToDelete);
		if (error) throw error;
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal menghapus pengumuman" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/announcements@_@ts
var page = () => announcements_exports;
//#endregion
export { page };
