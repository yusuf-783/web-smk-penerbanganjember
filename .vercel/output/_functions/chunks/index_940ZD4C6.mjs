import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { t as $$PublicLayout } from "./PublicLayout_C4NDZoFi.mjs";
import { t as $$NewsCard } from "./NewsCard_CQM7tRef.mjs";
//#region src/pages/news/index.astro
var news_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let dbNewsList = [];
	try {
		const { data: dbNews } = await supabaseAdmin.from("news").select("*").order("published_at", { ascending: false });
		if (dbNews && dbNews.length > 0) dbNewsList = dbNews;
	} catch (err) {}
	const defaultNews = [
		{
			id: "1",
			title: "Penerimaan Peserta Didik Baru (PPDB) SMK Penerbangan Jember Tahun Ajaran Baru Dibuka",
			slug: "ppdb-smk-penerbangan-jember-dibuka",
			content: "SMK Penerbangan Jember resmi membuka pendaftaran peserta didik baru untuk tahun ajaran baru. Tersedia berbagai program beasiswa prestasi dan fasilitas laboratorium mutakhir untuk calon taruna-taruni berpotensi.",
			image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
			published_at: (/* @__PURE__ */ new Date()).toISOString(),
			category: "Pengumuman"
		},
		{
			id: "2",
			title: "Kunjungan Edukasi dan Praktik Lapangan Taruna SMK Penerbangan di Hangar Bandara",
			slug: "kunjungan-edukasi-hangar-bandara",
			content: "Siswa jurusan Airframe & Powerplant melaksanakan studi lapangan dan observasi langsung prosedur perawatan rutin pesawat komersial di pangkalan dan hangar bandara mitra.",
			image_url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
			published_at: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString(),
			category: "Kegiatan"
		},
		{
			id: "3",
			title: "Prestasi Membanggakan: Taruna SMK Penerbangan Jember Raih Juara LKS Tingkat Provinsi",
			slug: "prestasi-juara-lks-provinsi",
			content: "Selamat kepada perwakilan taruna yang berhasil mengukir prestasi gemilang dalam Lomba Kompetensi Siswa (LKS) bidang teknologi kedirgantaraan dan avionic.",
			image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
			published_at: (/* @__PURE__ */ new Date(Date.now() - 6048e5)).toISOString(),
			category: "Prestasi"
		}
	];
	const allNews = dbNewsList.length > 0 ? dbNewsList : defaultNews;
	const standardCategories = [
		"Semua",
		"Kegiatan",
		"Prestasi",
		"PPDB",
		"Akademik",
		"Pengumuman",
		"Fasilitas"
	];
	const existingCategories = Array.from(new Set(allNews.map((n) => n.category || "Berita"))).filter(Boolean);
	const categories = Array.from(/* @__PURE__ */ new Set([
		"Semua",
		...standardCategories.slice(1),
		...existingCategories
	]));
	return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, {
		"title": "Berita & Artikel",
		"description": "Berita terkini, agenda kegiatan, dan prestasi dari SMK Penerbangan Jember."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white py-16 sm:py-20 relative overflow-hidden"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"><span>📰</span><span>Pusat Informasi & Kabar Sekolah</span></div><h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Berita, Pengumuman & Agenda</h1><p class="text-base sm:text-lg max-w-2xl mx-auto text-blue-100/90 leading-relaxed font-light">Ikuti kabar terkini, kegiatan praktikum taruna di hangar, penerimaan taruna baru (PPDB), dan torehan prestasi SMK Penerbangan Jember.</p></div><div class="absolute -right-10 -bottom-10 text-9xl opacity-5 pointer-events-none select-none">✈️</div></section><section class="py-12 sm:py-16 bg-slate-50 min-h-[600px]" id="newsSection"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10"><!-- Filter & Search Control Panel --><div class="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-gray-200/80 space-y-5"><div class="flex flex-col lg:flex-row items-center justify-between gap-4"><!-- Search Bar --><div class="w-full lg:w-96 relative"><span class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 text-base">🔍</span><input type="text" id="newsSearchInput" placeholder="Cari judul berita atau topik kegiatan..." class="w-full pl-11 pr-10 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"><button type="button" id="clearSearchBtn" class="hidden absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer" title="Hapus pencarian">✕</button></div><!-- Total Count Info --><div class="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 text-xs sm:text-sm text-gray-500"><span id="newsCountLabel" class="font-medium">Menampilkan <strong class="text-blue-900 font-bold" id="visibleCount">${allNews.length}</strong> dari <strong class="text-gray-900 font-bold">${allNews.length}</strong> Berita</span></div></div><!-- Categories Pill Filter --><div class="pt-3 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin"><span class="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">Kategori:</span>${categories.map((cat, idx) => renderTemplate`<button type="button"${addAttribute(`category-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${idx === 0 ? "bg-blue-900 text-white shadow-sm" : "bg-slate-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"}`, "class")}${addAttribute(cat, "data-category")}>${cat}</button>`)}</div></div><!-- News Articles Grid --><div id="newsGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">${allNews.map((item) => renderTemplate`<div class="news-item-card h-full"${addAttribute(item.title.toLowerCase(), "data-title")}${addAttribute((item.content || "").toLowerCase(), "data-content")}${addAttribute(item.category || "Berita", "data-category")}>${renderComponent($$result, "NewsCard", $$NewsCard, { "item": item })}</div>`)}</div><!-- Empty State Filter Result --><div id="noResultsBox" class="hidden text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto space-y-4"><span class="text-5xl block">🔍</span><h3 class="text-lg sm:text-xl font-bold text-gray-900">Tidak Ada Berita Ditemukan</h3><p class="text-gray-500 text-xs sm:text-sm">Tidak ada artikel yang cocok dengan kata kunci atau kategori yang Anda pilih.</p><button type="button" id="resetFilterBtn" class="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow cursor-pointer">🔄 Reset Filter & Pencarian</button></div><!-- Pagination Controls --><div id="paginationContainer" class="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200/80"><div class="text-xs sm:text-sm text-gray-500 font-medium text-center sm:text-left" id="paginationInfo">Halaman 1 dari 1</div><div class="flex items-center gap-1.5 sm:gap-2"><!-- Previous Button --><button type="button" id="prevPageBtn" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-2xs flex items-center gap-1 cursor-pointer"><span>←</span><span class="hidden sm:inline">Sebelumnya</span></button><!-- Numeric Page Buttons Container --><div id="pageNumbersWrapper" class="flex items-center gap-1 sm:gap-1.5"><!-- Dynamically populated via JS --></div><!-- Next Button --><button type="button" id="nextPageBtn" class="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-2xs flex items-center gap-1 cursor-pointer"><span class="hidden sm:inline">Selanjutnya</span><span>→</span></button></div></div></div></section>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/news/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/news/index.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/news/index.astro";
var $$url = "/news";
//#endregion
//#region \0virtual:astro:page:src/pages/news/index@_@astro
var page = () => news_exports;
//#endregion
export { page };
