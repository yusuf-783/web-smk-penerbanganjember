import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as isAuthenticated } from "./auth_DQOQabTH.mjs";
//#region src/pages/api/messages.ts
var messages_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
var GET = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { data, error } = await supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal memuat pesan" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async ({ request }) => {
	try {
		const { name, email, subject, message } = await request.json();
		if (!name || !email || !message) return new Response(JSON.stringify({ error: "Nama, email, dan pesan wajib diisi" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await supabaseAdmin.from("messages").insert([{
			name: name.trim(),
			email: email.trim(),
			subject: subject?.trim() || "Tanpa Subjek",
			message: message.trim(),
			is_read: false,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}]).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal mengirim pesan" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, is_read } = await context.request.json();
		if (!id) return new Response(JSON.stringify({ error: "ID pesan diperlukan" }), { status: 400 });
		const { data, error } = await supabaseAdmin.from("messages").update({ is_read: is_read ?? true }).eq("id", id).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal mengubah status pesan" }), {
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
		if (!idToDelete) return new Response(JSON.stringify({ error: "ID pesan tidak ditemukan" }), { status: 400 });
		const { error } = await supabaseAdmin.from("messages").delete().eq("id", idToDelete);
		if (error) throw error;
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Gagal menghapus pesan" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/messages@_@ts
var page = () => messages_exports;
//#endregion
export { page };
