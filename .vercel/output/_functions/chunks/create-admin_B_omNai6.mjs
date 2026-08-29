import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as hashPassword } from "./auth_DWHfjTx0.mjs";
//#region src/pages/api/create-admin.ts
var create_admin_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	try {
		const { email, password, full_name } = await request.json();
		if (!email || !password || !full_name) return new Response(JSON.stringify({ error: "Semua field wajib diisi" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const password_hash = await hashPassword(password);
		const { data, error } = await supabaseAdmin.from("users").insert([{
			email,
			password_hash,
			full_name,
			role: "admin"
		}]).select();
		if (error) return new Response(JSON.stringify({
			error: error.message || "Gagal menyimpan ke database Supabase",
			details: error.details || error.hint || ""
		}), {
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
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/create-admin@_@ts
var page = () => create_admin_exports;
//#endregion
export { page };
