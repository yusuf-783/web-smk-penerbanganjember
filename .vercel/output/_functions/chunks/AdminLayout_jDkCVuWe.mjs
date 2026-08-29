import { d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
/* empty css                 */
import { t as getUser } from "./auth_DQOQabTH.mjs";
//#region src/components/admin/Sidebar.astro
createAstro("https://astro.build");
var $$Sidebar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Sidebar;
	const { user } = Astro.props;
	const currentPath = Astro.url.pathname;
	return renderTemplate`${maybeRenderHead($$result)}<!-- Backdrop Overlay for Mobile Drawer --><div id="sidebarBackdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 hidden md:hidden transition-opacity"></div><!-- Sidebar Container: Fixed Drawer on Mobile, Static on Desktop --><aside id="adminSidebar" class="fixed inset-y-0 left-0 z-50 w-72 bg-blue-950 text-white flex flex-col justify-between border-r border-blue-900 shadow-2xl md:shadow-xl flex-shrink-0 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:w-64 md:z-auto"><div class="flex-1 overflow-y-auto"><!-- Logo & Brand Header with Mobile Close Button --><div class="p-5 sm:p-6 border-b border-blue-900/80 flex items-center justify-between"><a href="/admin" class="flex items-center gap-3 group"><div class="w-10 h-10 bg-yellow-400 text-blue-950 rounded-xl flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition">✈️</div><div><h2 class="font-extrabold text-base tracking-tight text-white leading-tight">Admin Portal</h2><p class="text-[11px] text-blue-300">SMK Penerbangan</p></div></a><!-- Tombol Tutup Mobile (X) --><button type="button" id="closeSidebarBtn" class="md:hidden w-8 h-8 rounded-lg bg-blue-900 text-blue-200 hover:text-white flex items-center justify-center text-lg font-bold transition cursor-pointer" aria-label="Tutup Menu">✕</button></div><!-- Nav Menu Items --><nav class="p-4"><ul class="space-y-1.5">${[
		{
			name: "Dashboard",
			href: "/admin",
			icon: "📊"
		},
		{
			name: "Data Guru",
			href: "/admin/teachers",
			icon: "👨‍🏫"
		},
		{
			name: "Absensi Guru",
			href: "/admin/attendance",
			icon: "📝"
		},
		{
			name: "Rekap Gaji",
			href: "/admin/salary",
			icon: "💰"
		},
		{
			name: "Berita",
			href: "/admin/news",
			icon: "📰"
		},
		{
			name: "Pengumuman",
			href: "/admin/announcements",
			icon: "📢"
		},
		{
			name: "Pesan Masuk",
			href: "/admin/messages",
			icon: "✉️"
		}
	].map((item) => {
		const isActive = currentPath === item.href || item.href !== "/admin" && currentPath.startsWith(item.href);
		return renderTemplate`<li><a${addAttribute(item.href, "href")}${addAttribute(`sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition duration-150 ${isActive ? "bg-blue-800 text-yellow-300 font-bold shadow-sm" : "text-blue-200 hover:text-white hover:bg-blue-900/60"}`, "class")}><span class="text-lg">${item.icon}</span><span>${item.name}</span></a></li>`;
	})}</ul></nav></div><!-- User Profile & Logout Bottom Box --><div class="p-4 border-t border-blue-900/80 bg-blue-950/90 flex-shrink-0"><div class="flex items-center gap-3 mb-3 p-2 bg-blue-900/40 rounded-xl border border-blue-800/40"><div class="w-9 h-9 bg-yellow-400 text-blue-950 font-bold rounded-lg flex items-center justify-center text-sm flex-shrink-0">${user?.full_name?.charAt(0) || "A"}</div><div class="overflow-hidden min-w-0"><p class="text-xs font-bold text-white truncate">${user?.full_name || "Admin"}</p><p class="text-[11px] text-blue-300 truncate">${user?.email || "admin@smkpenerbangan.sch.id"}</p></div></div><button id="logoutBtn" class="w-full bg-red-600/90 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-1.5 shadow cursor-pointer"><span>Keluar (Logout)</span><span>🚪</span></button></div></aside>${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/Sidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/Sidebar.astro", void 0);
//#endregion
//#region src/components/admin/AdminHeader.astro
createAstro("https://astro.build");
var $$AdminHeader = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminHeader;
	const { user } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<header class="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-xs sticky top-0 z-30"><div class="flex items-center gap-3"><!-- Mobile Hamburger Toggle Button --><button type="button" id="hamburgerBtn" class="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition flex items-center justify-center cursor-pointer border border-gray-200" aria-label="Buka Menu Navigasi"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><div class="flex items-center gap-2 text-xs font-bold text-gray-500"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span><span class="text-gray-800 font-extrabold hidden sm:inline">Sistem Online</span><span class="hidden sm:inline">•</span><span id="liveClock" class="font-mono text-gray-600 bg-slate-100 px-2 py-0.5 rounded-md text-[11px] sm:text-xs">--:--:--</span></div></div><div class="flex items-center gap-2 sm:gap-3"><a href="/" target="_blank" class="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition flex items-center gap-1.5 shadow-2xs"><span class="hidden xs:inline">Lihat Website</span><span>🌐</span></a></div></header>${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/AdminHeader.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/AdminHeader.astro", void 0);
//#endregion
//#region src/layouts/AdminLayout.astro
createAstro("https://astro.build");
var $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminLayout;
	const { title } = Astro.props;
	const user = getUser(Astro);
	if (!user) return Astro.redirect("/login");
	return renderTemplate`<html lang="id" class="h-full bg-slate-100"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Admin Dashboard</title>${renderHead($$result)}</head><body class="min-h-screen bg-slate-100 text-gray-900 antialiased flex flex-col md:flex-row overflow-x-hidden"><!-- Sidebar: Slide-out drawer on mobile, stationary on desktop -->${renderComponent($$result, "Sidebar", $$Sidebar, { "user": user })}<!-- Main Content Area --><div class="flex-1 flex flex-col min-w-0 min-h-screen">${renderComponent($$result, "AdminHeader", $$AdminHeader, { "user": user })}<main class="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">${renderSlot($$result, $$slots["default"])}</main></div></body></html>`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/layouts/AdminLayout.astro", void 0);
//#endregion
export { $$AdminLayout as t };
