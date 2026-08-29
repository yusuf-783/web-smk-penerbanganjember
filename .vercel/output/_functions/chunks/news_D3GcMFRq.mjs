import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as isAuthenticated } from "./auth_DQOQabTH.mjs";
import { t as formatGoogleDriveImageUrl } from "./gdrive_BQdSrhtC.mjs";
//#region src/pages/api/news.ts
var news_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT,
	prerender: () => false
});
function generateSlug(text) {
	return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var GET = async (context) => {
	try {
		const id = new URL(context.request.url).searchParams.get("id");
		if (id) {
			const { data, error } = await supabaseAdmin.from("news").select("*").eq("id", id).single();
			if (error) throw error;
			return new Response(JSON.stringify({
				success: true,
				data
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { data, error } = await supabaseAdmin.from("news").select("*").order("published_at", { ascending: false });
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal memuat berita" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { title, content, image_url, category, author } = await context.request.json();
		if (!title || !content) return new Response(JSON.stringify({ error: "Judul dan isi konten berita wajib diisi" }), { status: 400 });
		const slug = `${generateSlug(title) || "berita-" + Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
		const formattedImageUrl = formatGoogleDriveImageUrl(image_url);
		const { data, error } = await supabaseAdmin.from("news").insert({
			title: title.trim(),
			slug,
			content: content.trim(),
			image_url: formattedImageUrl,
			category: category || "Berita",
			author: author || "Admin",
			published_at: (/* @__PURE__ */ new Date()).toISOString()
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
		return new Response(JSON.stringify({ error: error.message || "Gagal membuat berita" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var PUT = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { id, title, content, image_url, category, author } = await context.request.json();
		if (!id || !title || !content) return new Response(JSON.stringify({ error: "ID, judul, dan isi konten berita wajib diisi" }), { status: 400 });
		const formattedImageUrl = formatGoogleDriveImageUrl(image_url);
		const { data, error } = await supabaseAdmin.from("news").update({
			title: title.trim(),
			content: content.trim(),
			image_url: formattedImageUrl,
			category: category || "Berita",
			author: author || "Admin"
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
		return new Response(JSON.stringify({ error: error.message || "Gagal mengubah berita" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var DELETE = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const queryId = new URL(context.request.url).searchParams.get("id");
		let idsToDelete = [];
		if (queryId) idsToDelete = [queryId];
		else {
			const body = await context.request.json().catch(() => ({}));
			if (body.ids && Array.isArray(body.ids)) idsToDelete = body.ids;
			else if (body.id) idsToDelete = [body.id];
		}
		if (idsToDelete.length === 0) return new Response(JSON.stringify({ error: "ID berita yang akan dihapus tidak ditemukan" }), { status: 400 });
		const { error } = await supabaseAdmin.from("news").delete().in("id", idsToDelete);
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			deletedCount: idsToDelete.length
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal menghapus berita" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/news@_@ts
var page = () => news_exports;
//#endregion
export { page };
