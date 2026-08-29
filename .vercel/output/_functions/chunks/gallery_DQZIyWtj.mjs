import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { t as supabase } from "./supabase_BEU1o0kt.mjs";
import { t as $$PublicLayout } from "./PublicLayout_C4NDZoFi.mjs";
//#region src/pages/gallery.astro
var gallery_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gallery,
	file: () => $$file,
	url: () => $$url
});
var $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
	const { data: dbGallery } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
	const galleryItems = dbGallery && dbGallery.length > 0 ? dbGallery : [
		{
			id: 1,
			title: "Praktik Pemeliharaan Mesin Turbin di Hangar",
			category: "Praktik",
			image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
			description: "Taruna melaksanakan inspeksi rutin mesin turbin pesawat latih di hangar sekolah."
		},
		{
			id: 2,
			title: "Upacara Tradisi Pelantikan Taruna Angkatan Baru",
			category: "Kegiatan",
			image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
			description: "Tradisi pelantikan taruna baru dengan penuh khidmat, kebanggaan, dan disiplin tinggi."
		},
		{
			id: 3,
			title: "Simulasi Sistem Instrumentasi & Navigasi Kokpit",
			category: "Praktik",
			image_url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
			description: "Pengujian sinyal radio komunikasi dan kalibrasi alat instrumen kokpit pada flight simulator."
		},
		{
			id: 4,
			title: "Gedung dan Kampus Utama SMK Penerbangan Jember",
			category: "Fasilitas",
			image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
			description: "Suasana lingkungan sekolah yang asri, modern, dan kondusif untuk menuntut ilmu kedirgantaraan."
		},
		{
			id: 5,
			title: "Latihan Kedisiplinan PBB & Korps Drum Band",
			category: "Ekstrakurikuler",
			image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
			description: "Penampilan tim drum band Gita Dirgantara saat atraksi parade hari kemerdekaan."
		},
		{
			id: 6,
			title: "Kunjungan Industri & Observasi di Bandara",
			category: "Kegiatan",
			image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
			description: "Studi lapangan mengenal operasional ground handling dan safety aircraft di bandara mitra."
		}
	];
	const categories = [
		"Semua",
		"Praktik",
		"Kegiatan",
		"Fasilitas",
		"Ekstrakurikuler"
	];
	return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, {
		"title": "Galeri Foto & Dokumentasi",
		"description": "Dokumentasi aktivitas, fasilitas praktikum, dan kehidupan taruna di SMK Penerbangan Jember."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-white py-16 sm:py-20"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-4"><span>🖼️</span><span>Dokumentasi Visual</span></div><h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">Galeri Foto & Aktivitas</h1><p class="text-base sm:text-lg max-w-2xl mx-auto text-blue-100/90 leading-relaxed font-light">Potret kehidupan taruna, kedisiplinan, pelatihan teknis di bengkel, dan fasilitas SMK Penerbangan Jember.</p></div></section><section class="py-16 sm:py-20 bg-slate-50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><!-- Filter Category Buttons --><div class="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-14">${categories.map((cat, idx) => renderTemplate`<button type="button"${addAttribute(cat === "Semua" ? "all" : cat, "data-filter")}${addAttribute(`filter-btn px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm border ${idx === 0 ? "bg-blue-700 text-white border-blue-700 shadow-blue-200" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`, "class")}>${cat}</button>`)}</div><!-- Cards Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="gallery-grid">${galleryItems.map((item) => renderTemplate`<div class="gallery-card bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"${addAttribute(item.category || "Kegiatan", "data-category")}><div class="h-64 bg-slate-200 relative overflow-hidden"><img${addAttribute(item.image_url, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"><span class="absolute top-3.5 right-3.5 bg-blue-900/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow">${item.category || "Dokumentasi"}</span></div><div class="p-6 flex-1 flex flex-col justify-between space-y-2"><h3 class="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-700 transition leading-snug">${item.title}</h3>${item.description && renderTemplate`<p class="text-xs sm:text-sm text-gray-600 leading-relaxed">${item.description}</p>`}</div></div>`)}</div></div></section>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/gallery.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/gallery.astro";
var $$url = "/gallery";
//#endregion
//#region \0virtual:astro:page:src/pages/gallery@_@astro
var page = () => gallery_exports;
//#endregion
export { page };
