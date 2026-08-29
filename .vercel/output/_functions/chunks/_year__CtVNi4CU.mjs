import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
//#region src/pages/admin/attendance/[month]/[year].astro
var _year__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Year,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Year = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Year;
	const { month, year } = Astro.params;
	return Astro.redirect(`/admin/attendance?month=${month || 1}&year=${year || 2026}`);
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/attendance/[month]/[year].astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/attendance/[month]/[year].astro";
var $$url = "/admin/attendance/[month]/[year]";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/attendance/[month]/[year]@_@astro
var page = () => _year__exports;
//#endregion
export { page };
