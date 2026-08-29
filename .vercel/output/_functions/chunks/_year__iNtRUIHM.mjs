import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { t as $$AdminLayout } from "./AdminLayout_jDkCVuWe.mjs";
import { t as $$SalaryTable } from "./SalaryTable_DEPOwgg8.mjs";
//#region src/pages/admin/salary/[month]/[year].astro
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
	const { month = "1", year = "2026" } = Astro.params;
	const monthNum = parseInt(month);
	const yearNum = parseInt(year);
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember"
	];
	const selectedMonthName = monthNames[monthNum - 1] || "Januari";
	const years = [
		2024,
		2025,
		2026,
		2027,
		2028,
		2029,
		2030
	];
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Rekap Gaji Guru - ${selectedMonthName} ${yearNum}` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-8 max-w-7xl mx-auto"><!-- Header & Action Controls --><div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 print:hidden"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2"><span>💰</span><span>Sistem Honorarium & Gaji Guru</span></div><h1 class="text-2xl sm:text-3xl font-black text-gray-900">Rekap Honor Guru: ${selectedMonthName} ${yearNum}</h1><p class="text-gray-500 text-xs sm:text-sm mt-1">Dihitung otomatis dari absensi mengajar di database: <strong class="text-emerald-700">Total Jam × Rp 5.000 / Jam</strong>.</p></div><div class="flex flex-wrap items-center gap-3"><a${addAttribute(`/admin/attendance?month=${monthNum}&year=${yearNum}`, "href")} class="bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 border border-blue-200"><span>📝</span><span>Buka Presensi Bulan Ini</span></a><a href="/admin/teachers" class="bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2"><span>👨‍🏫</span><span>Kelola Guru</span></a></div></div><!-- Month & Year Filter Selector Tabs (Hidden in Print) --><div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4 print:hidden"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4"><div><span class="text-xs font-bold text-gray-700 uppercase tracking-wider block">🗓️ Pilih Periode Gaji Bulanan:</span><span class="text-xs text-gray-400">Pilih bulan dan tahun untuk melihat rekapitulasi data gaji.</span></div><!-- Year Selector Dropdown --><div class="flex items-center gap-2"><label for="yearSelectorSalary" class="text-xs font-bold text-gray-600">Tahun:</label><select id="yearSelectorSalary" class="bg-slate-50 border border-gray-200 text-gray-900 font-bold text-xs rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer">${years.map((y) => renderTemplate`<option${addAttribute(y, "value")}${addAttribute(y === yearNum, "selected")}>${y}</option>`)}</select></div></div><!-- Month Tabs --><div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-1.5 sm:gap-2">${monthNames.map((name, idx) => {
		const mNum = idx + 1;
		const isSelected = mNum === monthNum;
		return renderTemplate`<a${addAttribute(`/admin/salary/${mNum}/${yearNum}`, "href")}${addAttribute(`py-2.5 px-1 text-center rounded-2xl text-xs font-bold transition-all ${isSelected ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105" : "bg-slate-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"}`, "class")}>${name.substring(0, 3)}</a>`;
	})}</div></div><!-- Salary Table Component (includes Chart, Summary Cards, and Detailed Table) -->${renderComponent($$result, "SalaryTable", $$SalaryTable, {
		"month": monthNum,
		"year": yearNum
	})}</div>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/[month]/[year].astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/[month]/[year].astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/[month]/[year].astro";
var $$url = "/admin/salary/[month]/[year]";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/salary/[month]/[year]@_@astro
var page = () => _year__exports;
//#endregion
export { page };
