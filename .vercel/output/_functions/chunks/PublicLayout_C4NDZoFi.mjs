import { d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, s as renderSlot, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
/* empty css                 */
import { t as supabase } from "./supabase_BEU1o0kt.mjs";
//#region src/components/public/Navbar.astro
createAstro("https://astro.build");
var $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Navbar;
	const { data: school } = await supabase.from("school_info").select("*").single();
	const navLinks = [
		{
			name: "Beranda",
			href: "/"
		},
		{
			name: "Profil",
			href: "/about"
		},
		{
			name: "Jurusan",
			href: "/majors"
		},
		{
			name: "Berita",
			href: "/news"
		},
		{
			name: "Kontak",
			href: "/contact"
		}
	];
	const currentPath = Astro.url.pathname;
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all"><!-- Top Utility Bar --><div class="bg-blue-900 text-blue-100 text-xs py-2 border-b border-blue-800/60 hidden sm:block"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"><div class="flex items-center gap-6"><span class="flex items-center gap-1.5 hover:text-white transition">📞 <span>${school?.phone || "(0331) 123456"}</span></span><span class="flex items-center gap-1.5 hover:text-white transition">✉️ <span>${school?.email || "info@smkpenerbangan.sch.id"}</span></span><span class="hidden md:inline-flex items-center gap-1.5 text-blue-300">📍 <span>Jember, Jawa Timur</span></span></div><div><a href="/login" class="inline-flex items-center gap-1 bg-yellow-400 hover:bg-yellow-300 text-blue-950 px-3 py-1 rounded font-bold transition shadow-sm">🔐 <span>Login Admin</span></a></div></div></div><!-- Main Navigation Bar --><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex justify-between items-center"><!-- Brand Logo --><a href="/" class="flex items-center gap-3.5 group"><div class="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-tr from-blue-700 to-blue-900 rounded-xl flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">✈️</div><div><h1 class="text-lg sm:text-xl font-extrabold text-blue-900 leading-tight tracking-tight group-hover:text-blue-700 transition">${school?.school_name || "SMK Penerbangan Jember"}</h1><p class="text-[11px] text-gray-500 font-medium tracking-wide">Aviation Vocational High School</p></div></a><!-- Desktop Links --><nav class="hidden md:flex items-center space-x-1 lg:space-x-2">${navLinks.map((link) => {
		const isActive = currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href);
		return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${isActive ? "text-blue-700 bg-blue-50 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"}`, "class")}>${link.name}</a>`;
	})}</nav><!-- Mobile Menu Button --><div class="flex items-center gap-2 md:hidden"><a href="/login" class="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1.5 rounded-lg border border-blue-100">Login</a><button type="button" id="mobile-menu-btn" class="p-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-lg focus:outline-none" aria-label="Toggle menu"><svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg><svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div><!-- Mobile Drawer Menu --><div id="mobile-menu" class="hidden md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg">${navLinks.map((link) => {
		const isActive = currentPath === link.href || link.href !== "/" && currentPath.startsWith(link.href);
		return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${isActive ? "text-blue-700 bg-blue-50 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-gray-50"}`, "class")}>${link.name}</a>`;
	})}<div class="pt-3 mt-2 border-t border-gray-100"><a href="/login" class="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-sm shadow">🔐 Login Admin</a></div></div></header>${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/public/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/public/Navbar.astro", void 0);
//#endregion
//#region src/components/public/Footer.astro
var $$Footer = createComponent(async ($$result, $$props, $$slots) => {
	const { data: school } = await supabase.from("school_info").select("*").single();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-blue-950 text-white mt-20 border-t border-blue-900/60"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"><!-- School Info --><div class="space-y-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-yellow-400 text-blue-950 rounded-xl flex items-center justify-center font-bold text-xl shadow-md">✈️</div><div><h3 class="text-lg font-bold text-white leading-tight">${school?.school_name || "SMK Penerbangan Jember"}</h3><p class="text-xs text-blue-300">Sekolah Menengah Kejuruan Unggulan</p></div></div><p class="text-blue-200/80 text-sm leading-relaxed">${school?.vision || "Mewujudkan lulusan yang beriman, berkarakter, kompeten, dan siap bersaing di industri penerbangan nasional dan internasional."}</p></div><!-- Contact Info --><div><h4 class="font-bold text-base text-white mb-4 pb-2 border-b border-blue-800/80 inline-block">Hubungi Kami</h4><ul class="space-y-3 text-sm text-blue-200/90"><li class="flex items-start gap-2.5"><span class="text-base text-yellow-400">📍</span><span>${school?.address || "Jl. Penerbangan No. 1, Jember, Jawa Timur"}</span></li><li class="flex items-center gap-2.5"><span class="text-base text-yellow-400">📞</span><span>${school?.phone || "(0331) 123456"}</span></li><li class="flex items-center gap-2.5"><span class="text-base text-yellow-400">✉️</span><span>${school?.email || "info@smkpenerbangan.sch.id"}</span></li></ul></div><!-- Quick Links --><div><h4 class="font-bold text-base text-white mb-4 pb-2 border-b border-blue-800/80 inline-block">Tautan Cepat</h4><ul class="space-y-2.5 text-sm text-blue-200/90"><li><a href="/about" class="hover:text-yellow-300 transition flex items-center gap-1.5"><span>→</span> <span>Profil Sekolah</span></a></li><li><a href="/majors" class="hover:text-yellow-300 transition flex items-center gap-1.5"><span>→</span> <span>Program Keahlian</span></a></li><li><a href="/news" class="hover:text-yellow-300 transition flex items-center gap-1.5"><span>→</span> <span>Berita & Kegiatan</span></a></li><li><a href="/contact" class="hover:text-yellow-300 transition flex items-center gap-1.5"><span>→</span> <span>Kontak & PPDB</span></a></li></ul></div><!-- Social Media & Accreditation --><div><h4 class="font-bold text-base text-white mb-4 pb-2 border-b border-blue-800/80 inline-block">Sosial Media</h4><p class="text-xs text-blue-300 mb-4">Ikuti akun resmi kami untuk mendapatkan update terbaru seputar kegiatan taruna.</p><div class="flex space-x-3 mb-6"><a href="#" aria-label="Facebook" class="w-10 h-10 bg-blue-900/80 hover:bg-blue-700 rounded-xl flex items-center justify-center text-lg transition border border-blue-800">📘</a><a href="#" aria-label="Instagram" class="w-10 h-10 bg-blue-900/80 hover:bg-blue-700 rounded-xl flex items-center justify-center text-lg transition border border-blue-800">📷</a><a href="#" aria-label="YouTube" class="w-10 h-10 bg-blue-900/80 hover:bg-blue-700 rounded-xl flex items-center justify-center text-lg transition border border-blue-800">▶️</a></div><div class="bg-blue-900/50 p-3 rounded-xl border border-blue-800/60 text-xs text-blue-200"><span class="font-bold text-yellow-300">NPSN:</span> 2056xxxx • Akreditasi A</div></div></div><div class="border-t border-blue-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-blue-300/80 gap-4"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${school?.school_name || "SMK Penerbangan Jember"}. Hak cipta dilindungi undang-undang.</p><div class="flex items-center gap-4"><a href="/about" class="hover:text-white transition">Tentang</a><span>•</span><a href="/contact" class="hover:text-white transition">Bantuan</a><span>•</span><a href="/login" class="hover:text-yellow-300 transition">Admin Portal</a></div></div></div></footer>`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/public/Footer.astro", void 0);
//#endregion
//#region src/layouts/PublicLayout.astro
createAstro("https://astro.build");
var $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PublicLayout;
	const { title, description = "SMK Penerbangan Jember - Sekolah Menengah Kejuruan Unggul di Bidang Penerbangan" } = Astro.props;
	return renderTemplate`<html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title} - SMK Penerbangan Jember</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="font-[Poppins] bg-white">${renderComponent($$result, "Navbar", $$Navbar, {})}<main>${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/layouts/PublicLayout.astro", void 0);
//#endregion
export { $$PublicLayout as t };
