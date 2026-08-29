import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { t as $$PublicLayout } from "./PublicLayout_C4NDZoFi.mjs";
import { t as formatGoogleDriveImageUrl } from "./gdrive_BQdSrhtC.mjs";
//#region src/pages/news/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	getStaticPaths: () => getStaticPaths,
	url: () => $$url
});
createAstro("https://astro.build");
async function getStaticPaths() {
	const defaultPaths = [
		{ params: { slug: "ppdb-smk-penerbangan-jember-dibuka" } },
		{ params: { slug: "kunjungan-edukasi-hangar-bandara" } },
		{ params: { slug: "prestasi-juara-lks-provinsi" } }
	];
	try {
		const { data: dbNews } = await supabaseAdmin.from("news").select("slug, id");
		if (dbNews && dbNews.length > 0) {
			const paths = [...defaultPaths];
			dbNews.forEach((item) => {
				const slug = item.slug || String(item.id);
				if (slug && !paths.some((p) => p.params.slug === slug)) paths.push({ params: { slug } });
			});
			return paths;
		}
	} catch (e) {
		console.error("Error in getStaticPaths news:", e);
	}
	return defaultPaths;
}
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const defaultNewsMap = {
		"ppdb-smk-penerbangan-jember-dibuka": {
			id: "1",
			title: "Penerimaan Peserta Didik Baru (PPDB) SMK Penerbangan Jember Tahun Ajaran Baru Dibuka",
			slug: "ppdb-smk-penerbangan-jember-dibuka",
			content: `SMK Penerbangan Jember resmi membuka pendaftaran peserta didik baru untuk tahun ajaran baru.

Sebagai salah satu sekolah kejuruan penerbangan unggulan di wilayah Jawa Timur, SMK Penerbangan Jember menawarkan program pendidikan berstandar ketat, berdisiplin tinggi, serta didukung oleh fasilitas bengkel dan hangar pesawat langsung.

Program keahlian yang dibuka meliputi:
1. Airframe and Powerplant (Teknik Pemeliharaan Rangka & Mesin Pesawat)
2. Electrical Avionics (Sistem Elektronika & Instrumentasi Pesawat)
3. Aviation Telecommunication (Telekomunikasi Penerbangan)
4. Teknik Komputer & Jaringan

Bagi calon taruna-taruni yang memiliki prestasi akademik maupun non-akademik, tersedia jalur beasiswa khusus. Informasi dan formulir pendaftaran dapat diakses secara langsung melalui sekretariat panitia PPDB di kampus sekolah atau melalui halaman kontak website ini.`,
			image_url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
			published_at: (/* @__PURE__ */ new Date()).toISOString(),
			category: "Pengumuman",
			author: "Humas SMK Penerbangan"
		},
		"kunjungan-edukasi-hangar-bandara": {
			id: "2",
			title: "Kunjungan Edukasi dan Praktik Lapangan Taruna SMK Penerbangan di Hangar Bandara",
			slug: "kunjungan-edukasi-hangar-bandara",
			content: `Siswa jurusan Airframe & Powerplant dan Electrical Avionics melaksanakan agenda rutin studi lapangan dan observasi langsung ke fasilitas maintenance bandara.

Dalam kegiatan ini, para taruna berkesempatan menyaksikan secara langsung bagaimana inspeksi pra-terbang (pre-flight inspection), penggantian komponen avionik, serta perawatan berkala mesin pesawat komersial dilakukan oleh teknisi berlisensi internasional.

Kepala Sekolah menyampaikan bahwa kegiatan praktikum lapangan semacam ini sangat krusial guna memperkaya wawasan riil siswa serta mempersiapkan mental dan etos kerja profesional sebelum memasuki dunia kerja penerbangan sesungguhnya.`,
			image_url: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
			published_at: (/* @__PURE__ */ new Date(Date.now() - 2592e5)).toISOString(),
			category: "Kegiatan",
			author: "Tim Redaksi Taruna"
		},
		"prestasi-juara-lks-provinsi": {
			id: "3",
			title: "Prestasi Membanggakan: Taruna SMK Penerbangan Jember Raih Juara LKS Tingkat Provinsi",
			slug: "prestasi-juara-lks-provinsi",
			content: `Keluarga besar SMK Penerbangan Jember mengucapkan selamat dan apresiasi setinggi-tingginya kepada para delegasi taruna yang berhasil meraih juara pada Lomba Kompetensi Siswa (LKS) tingkat provinsi.

Prestasi membanggakan ini diraih berkat dedikasi, kedisiplinan belajar, dan bimbingan intensif para guru pembimbing di bengkel laboratorium sekolah. 

Semoga prestasi ini terus memotivasi seluruh civitas akademika untuk terus berinovasi dan mengharumkan nama sekolah di kancah nasional maupun internasional.`,
			image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
			published_at: (/* @__PURE__ */ new Date(Date.now() - 6048e5)).toISOString(),
			category: "Prestasi",
			author: "Kesiswaan"
		}
	};
	let currentArticle = null;
	if (slug) {
		try {
			const { data } = await supabaseAdmin.from("news").select("*").eq("slug", slug).maybeSingle();
			if (data) currentArticle = data;
		} catch (err) {}
		if (!currentArticle) currentArticle = defaultNewsMap[slug];
	}
	if (!currentArticle) return Astro.redirect("/news");
	const displayImageUrl = formatGoogleDriveImageUrl(currentArticle?.image_url);
	return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, {
		"title": currentArticle?.title || "Detail Berita",
		"description": currentArticle?.title
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-slate-50 py-10 sm:py-16"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><!-- Breadcrumb Navigation --><nav class="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8"><a href="/" class="hover:text-blue-700 transition">Beranda</a><span>/</span><a href="/news" class="hover:text-blue-700 transition">Berita</a><span>/</span><span class="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-md">${currentArticle?.title}</span></nav><!-- Article Main Card --><article class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">${displayImageUrl && renderTemplate`<div class="w-full h-64 sm:h-96 md:h-[420px] bg-slate-200 relative overflow-hidden"><img${addAttribute(displayImageUrl, "src")}${addAttribute(currentArticle?.title || "Foto Berita", "alt")} class="w-full h-full object-cover" onerror="this.onerror=null; this.src='https://placehold.co/800x450/1e3a8a/ffffff?text=Foto+Berita';"></div>`}<div class="p-6 sm:p-10 lg:p-12 space-y-6"><!-- Metadata Pill Bar --><div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 pb-6 border-b border-gray-100">${currentArticle?.category && renderTemplate`<span class="bg-blue-100 text-blue-800 px-3.5 py-1 rounded-full font-bold text-xs">${currentArticle.category}</span>`}<span class="flex items-center gap-1.5 font-medium">📅 <span>${new Date(currentArticle?.published_at || currentArticle?.created_at || Date.now()).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric"
	})}</span></span>${currentArticle?.author && renderTemplate`<span class="flex items-center gap-1.5 font-medium">✍️ <span>${currentArticle.author}</span></span>`}</div><h1 class="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">${currentArticle?.title}</h1><div class="text-gray-700 leading-relaxed space-y-4 whitespace-pre-line text-base sm:text-lg font-normal">${currentArticle?.content}</div><!-- Bottom Action Bar --><div class="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><a href="/news" class="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-bold text-sm bg-blue-50 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition"><span>←</span><span>Kembali ke Semua Berita</span></a><div class="flex items-center gap-3"><span class="text-xs font-semibold text-gray-500">Bagikan artikel:</span><a${addAttribute(`https://api.whatsapp.com/send?text=${encodeURIComponent(currentArticle?.title || "")}`, "href")} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-green-500 text-white flex items-center justify-center text-sm hover:bg-green-600 transition shadow-sm" aria-label="Bagikan ke WhatsApp">💬</a><a${addAttribute(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(Astro.url.href)}`, "href")} target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm hover:bg-blue-700 transition shadow-sm font-bold" aria-label="Bagikan ke Facebook">f</a></div></div></div></article></div></div>` })}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/news/[slug].astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/news/[slug].astro";
var $$url = "/news/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/news/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
