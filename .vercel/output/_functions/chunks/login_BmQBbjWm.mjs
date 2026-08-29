import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { r as loginUser, t as generateToken } from "./auth_DWHfjTx0.mjs";
//#region src/pages/api/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();
		if (!email || !password) return new Response(JSON.stringify({ error: "Email dan password wajib diisi" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const user = await loginUser(email, password);
		if (!user) return new Response(JSON.stringify({ error: "Email atau password salah" }), {
			status: 401,
			headers: { "Content-Type": "application/json" }
		});
		const token = generateToken(user);
		cookies.set("auth_token", token, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 604800
		});
		return new Response(JSON.stringify({
			success: true,
			user
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/login@_@ts
var page = () => login_exports;
//#endregion
export { page };
