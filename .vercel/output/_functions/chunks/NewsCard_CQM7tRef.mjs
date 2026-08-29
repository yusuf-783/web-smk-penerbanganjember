import { d as maybeRenderHead, p as addAttribute, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as formatGoogleDriveImageUrl } from "./gdrive_BQdSrhtC.mjs";
//#region src/components/public/NewsCard.astro
createAstro("https://astro.build");
var $$NewsCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$NewsCard;
	const { item } = Astro.props;
	const targetUrl = `/news/detail?slug=${item.slug || item.id}`;
	const formattedDate = new Date(item.published_at || item.created_at || Date.now()).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const displayImageUrl = formatGoogleDriveImageUrl(item.image_url);
	return renderTemplate`${maybeRenderHead($$result)}<article class="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group h-full"><div class="h-52 sm:h-56 bg-slate-200 relative overflow-hidden">${displayImageUrl ? renderTemplate`<img${addAttribute(displayImageUrl, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` : renderTemplate`<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white text-5xl">📰</div>`}<div class="absolute top-3.5 right-3.5 bg-blue-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">${item.category || "Berita"}</div></div><div class="p-6 flex-1 flex flex-col justify-between space-y-4"><div><div class="text-xs text-gray-500 mb-2 flex items-center gap-1.5 font-medium"><span>📅</span><time${addAttribute(item.published_at || item.created_at, "datetime")}>${formattedDate}</time></div><h3 class="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition line-clamp-2 mb-2 leading-snug"><a${addAttribute(targetUrl, "href")}>${item.title}</a></h3><p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">${item.content?.replace(/<[^>]*>?/gm, "")}</p></div><div class="pt-4 border-t border-gray-100 flex items-center justify-between"><a${addAttribute(targetUrl, "href")} class="inline-flex items-center text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 group-hover:translate-x-1 transition">Baca Selengkapnya →</a></div></div></article>`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/public/NewsCard.astro", void 0);
//#endregion
export { $$NewsCard as t };
