import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { t as $$PublicLayout } from "./PublicLayout_C4NDZoFi.mjs";
//#region src/pages/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
var $$Login = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, {
		"title": "Login Admin",
		"description": "Portal autentikasi login administrator SMK Penerbangan Jember."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8"><div class="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md space-y-6"><div class="text-center"><div class="w-16 h-16 bg-gradient-to-tr from-blue-700 to-blue-900 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg shadow-blue-700/20">✈️</div><h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Login Portal Admin</h1><p class="text-gray-500 text-xs sm:text-sm mt-1">Sistem Informasi SMK Penerbangan Jember</p></div><form id="loginForm" class="space-y-4 pt-2"><div><label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" for="email">Alamat Email</label><input type="email" id="email" required class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition" placeholder="admin@smkpenerbangan.sch.id"></div><div><label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" for="password">Kata Sandi (Password)</label><input type="password" id="password" required class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition" placeholder="••••••••"></div><div id="error" class="hidden bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs font-medium"></div><button type="submit" class="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold transition shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer">Masuk ke Dashboard</button></form><p class="text-center text-xs text-gray-500 pt-2 border-t border-gray-100"><a href="/" class="hover:text-blue-700 font-semibold transition">← Kembali ke Beranda Utama</a></p></div></div>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/login.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/login.astro";
var $$url = "/login";
//#endregion
//#region \0virtual:astro:page:src/pages/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
