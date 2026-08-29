import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { t as $$AdminLayout } from "./AdminLayout_jDkCVuWe.mjs";
import { t as $$SalaryTable } from "./SalaryTable_DEPOwgg8.mjs";
//#region src/pages/admin/salary/index.astro
var salary_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const now = /* @__PURE__ */ new Date();
	const urlParams = new URL(Astro.request.url).searchParams;
	const initialMonth = parseInt(urlParams.get("month") || String(now.getMonth() + 1));
	const initialYear = parseInt(urlParams.get("year") || String(now.getFullYear()));
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
	const selectedMonthName = monthNames[initialMonth - 1] || "Januari";
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Rekap Gaji Guru - ${selectedMonthName} ${initialYear}` }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6 max-w-7xl mx-auto"><!-- Header & Action Controls --><div class="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 print:hidden relative overflow-hidden"><div class="relative z-10 space-y-1.5"><div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider"><span>💰</span><span>Sistem Honorarium Guru</span></div><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Rekap Honor Guru: ${selectedMonthName} ${initialYear}</h1><p class="text-emerald-100 text-xs sm:text-sm max-w-xl font-light">Kalkulasi otomatis dari absensi mengajar di database: <strong class="text-yellow-300 font-bold">Total Jam × Rp 5.000 / Jam</strong>.</p></div><div class="relative z-10 flex flex-wrap items-center gap-3"><a${addAttribute(`/admin/attendance?month=${initialMonth}&year=${initialYear}`, "href")} class="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 border border-white/20 shadow"><span>📝</span><span>Presensi Guru</span></a><a href="/admin/teachers" class="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-4 py-2 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 shadow"><span>👨‍🏫</span><span>Kelola Guru</span></a></div><div class="absolute -right-6 -bottom-6 text-8xl opacity-10 pointer-events-none">💰</div></div><!-- FILTER BAR: RINGKAS, RAPI & KOMPAK (COMPACT MONTH-YEAR PICKER) --><div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden relative"><div class="flex items-center gap-3"><span class="text-xs font-bold text-gray-500 uppercase tracking-wider">🗓️ Periode Rekap:</span><div class="relative inline-block" id="pickerContainer"><!-- Tombol Ringkas Buka Kalender --><button type="button" id="toggleMonthBtn" class="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl px-4 py-2 transition flex items-center gap-2 shadow-sm cursor-pointer"><span>📅</span><span id="activeSelectionLabel" class="font-extrabold">${selectedMonthName} ${initialYear}</span><span class="text-emerald-700 text-xs ml-1">▾</span></button><!-- Dropdown Popover Kompak (4x3 Grid) --><div id="compactMonthPopover" class="hidden absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl border border-gray-200 p-4 shadow-xl w-72 space-y-3 animate-in fade-in zoom-in-95 duration-150"><!-- Year Switcher Mini --><div class="flex items-center justify-between bg-slate-50 p-1.5 rounded-xl border border-gray-100 text-xs"><button type="button" id="prevYearBtn" class="w-7 h-7 rounded-lg bg-white hover:bg-emerald-100 text-emerald-800 font-bold border border-gray-200 flex items-center justify-center transition shadow-2xs cursor-pointer">◀</button><span class="font-extrabold text-sm text-gray-900" id="popoverYearDisplay">${initialYear}</span><button type="button" id="nextYearBtn" class="w-7 h-7 rounded-lg bg-white hover:bg-emerald-100 text-emerald-800 font-bold border border-gray-200 flex items-center justify-center transition shadow-2xs cursor-pointer">▶</button></div><!-- Grid 12 Bulan Mini (4 Kolom x 3 Baris) --><div class="grid grid-cols-4 gap-1.5 text-xs">${monthNames.map((name, idx) => {
		const mNum = idx + 1;
		return renderTemplate`<button type="button"${addAttribute(`compact-month-btn py-2 px-1 rounded-xl font-bold text-center transition cursor-pointer text-[11px] ${mNum === initialMonth ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"}`, "class")}${addAttribute(mNum, "data-month")}>${name.substring(0, 3)}</button>`;
	})}</div></div></div></div><!-- Quick Info Label --><div class="text-xs text-gray-500 font-medium">Menampilkan data gaji & beban mengajar guru periode <strong class="text-emerald-700">${selectedMonthName} ${initialYear}</strong></div></div><!-- Salary Table Component (includes Chart, Summary Cards, Detailed Table, and Notes Table) -->${renderComponent($$result, "SalaryTable", $$SalaryTable, {
		"month": initialMonth,
		"year": initialYear
	})}</div>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/index.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/salary/index.astro";
var $$url = "/admin/salary";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/salary/index@_@astro
var page = () => salary_exports;
//#endregion
export { page };
