import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate, x as createAstro, y as unescapeHTML } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { t as $$AdminLayout } from "./AdminLayout_jDkCVuWe.mjs";
//#region src/pages/admin/attendance/index.astro
var attendance_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const now = /* @__PURE__ */ new Date();
	const urlParams = new URL(Astro.request.url).searchParams;
	const initialYear = parseInt(urlParams.get("year") || String(now.getFullYear()));
	const initialMonth = parseInt(urlParams.get("month") || String(now.getMonth() + 1));
	const initialDay = parseInt(urlParams.get("day") || String(now.getDate()));
	const initialDateValue = `${initialYear}-${String(initialMonth).padStart(2, "0")}-${String(initialDay).padStart(2, "0")}`;
	const HOURLY_RATE = 5e3;
	const { data: teachers } = await supabaseAdmin.from("teachers").select("*").order("code", {
		ascending: true,
		nullsFirst: false
	});
	const { data: attendance } = await supabaseAdmin.from("attendance").select("*").eq("month", initialMonth).eq("year", initialYear);
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
	const attendanceStore = {};
	if (teachers) teachers.forEach((t) => {
		attendanceStore[t.id] = {};
	});
	if (attendance) attendance.forEach((att) => {
		if (attendanceStore[att.teacher_id]) {
			const parts = String(att.date).split("-");
			const day = parseInt(parts[2] || "1");
			attendanceStore[att.teacher_id][day] = {
				hours: Number(att.hours) || 0,
				activity: att.activity || ""
			};
		}
	});
	const formatRupiah = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0
		}).format(amount);
	};
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Presensi & Absensi Mengajar Guru" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-8 max-w-7xl mx-auto" id="attendanceApp"${addAttribute(HOURLY_RATE, "data-hourly-rate")}><!-- Top Header Banner --><div class="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"><div class="relative z-10 space-y-2"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-bold uppercase tracking-wider"><span>📝</span><span>Presensi Harian Guru</span></div><h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Presensi & Jam Mengajar Guru</h1><p class="text-blue-100 text-xs sm:text-sm max-w-xl font-light">Pilih tanggal pada kalender, input jam mengajar dan <strong>kegiatan tambahan</strong>. Data otomatis tersimpan ke database tanpa reload.</p></div><div class="relative z-10 flex flex-wrap items-center gap-3"><div class="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2"><span>🏷️ Tarif:</span><span class="bg-yellow-400 text-blue-950 px-2.5 py-0.5 rounded-lg font-black">Rp 5.000 / Jam</span></div><a${addAttribute(`/admin/salary?month=${initialMonth}&year=${initialYear}`, "href")} id="rekapGajiLink" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm transition flex items-center gap-2 shadow-lg"><span>📊</span><span>Buka Rekap Gaji & Grafik</span></a></div><div class="absolute -right-6 -bottom-6 text-8xl opacity-10 pointer-events-none">✈️</div></div><!-- FILTER BAR: 1 SINGLE DATE PICKER UNTUK TANGGAL, BULAN & TAHUN --><div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4"><div><h2 class="text-base font-extrabold text-gray-900 flex items-center gap-2"><span>📅</span><span>Pilih Tanggal Presensi (Tanggal, Bulan & Tahun)</span></h2><p class="text-xs text-gray-500 mt-0.5">Klik ikon kalender untuk memilih tanggal, bulan, dan tahun secara langsung.</p></div><div class="flex items-center gap-2 text-xs font-bold text-blue-800 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100"><span>Presensi Aktif:</span><span id="activeDateBadgeLabel" class="font-extrabold text-blue-900">${initialDay} ${monthNames[initialMonth - 1]} ${initialYear}</span></div></div><!-- Single Date Input (Tanggal, Bulan & Tahun) --><div class="max-w-md"><label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" for="singleDatePicker">Pilih Tanggal Presensi:</label><div class="relative"><input type="date" id="singleDatePicker"${addAttribute(initialDateValue, "value")} onclick="try { this.showPicker(); } catch(e) {}" onkeydown="return false" class="w-full bg-blue-50/60 border-2 border-blue-400 text-blue-950 font-black text-base rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition shadow-sm select-none"></div><p class="text-[11px] text-gray-400 mt-1.5">Klik ikon kalender 📅 di samping untuk memilih tanggal presensi.</p></div></div><!-- TABEL ABSENSI GURU --><div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"><!-- Table Header Status Bar --><div class="p-5 bg-slate-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h3 class="font-extrabold text-gray-900 text-base flex items-center gap-2"><span>Daftar Guru & Jam Mengajar:</span><span class="text-blue-800 bg-blue-100 px-3 py-1 rounded-xl text-xs sm:text-sm font-black" id="activeDateBadge">Tanggal ${initialDay} ${monthNames[initialMonth - 1]} ${initialYear}</span></h3><p class="text-xs text-gray-500 mt-1">Pilih jam mengajar dan isi kegiatan tambahan. Data langsung tersimpan di database & nilai tetap terlihat tanpa reload.</p></div><!-- Tombol Set Cepat --><div class="flex items-center gap-2"><span class="text-xs text-gray-500 font-bold hidden md:inline">Set Cepat:</span><button type="button" id="setAllEightBtn" class="text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer"><span>Semua 8 Jam</span><span>🟣</span></button><button type="button" id="setAllZeroBtn" class="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-gray-700 border border-gray-300 px-3.5 py-2 rounded-xl transition shadow-sm flex items-center gap-1.5 cursor-pointer"><span>Semua 0 Jam</span><span>❌</span></button></div></div>${!teachers || teachers.length === 0 ? renderTemplate`<div class="text-center py-16 p-6 space-y-4"><span class="text-5xl block">👨‍🏫</span><h3 class="font-bold text-gray-800 text-lg">Belum Ada Data Guru</h3><p class="text-gray-500 text-xs">Tambahkan guru terlebih dahulu sebelum mengisi absensi.</p><a href="/admin/teachers" class="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow">Tambah Guru Baru →</a></div>` : renderTemplate`<div class="overflow-x-auto"><table class="w-full text-left border-collapse text-sm" id="attendanceTable"><thead><tr class="bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"><th class="py-4 px-3 text-center w-12">No</th><th class="py-4 px-3 w-24">Kode</th><th class="py-4 px-4 min-w-[180px]">Nama Lengkap Guru</th><th class="py-4 px-3 min-w-[180px] bg-blue-950 text-center">Jam Mengajar</th><th class="py-4 px-3 min-w-[200px] bg-blue-950">Kegiatan Tambahan / Keterangan</th><th class="py-4 px-3 text-right min-w-[120px]">Honor Hari Ini</th><th class="py-4 px-3 text-center min-w-[130px] bg-blue-800/80">Total Jam Bulan Ini</th><th class="py-4 px-4 text-right min-w-[160px] bg-yellow-500 text-blue-950">Total Gaji Bulan Ini</th></tr></thead><tbody class="divide-y divide-gray-100" id="attendanceTbody">${teachers.map((teacher, idx) => {
		const teacherMap = attendanceStore[teacher.id] || {};
		const todayData = teacherMap[initialDay] || {
			hours: 0,
			activity: ""
		};
		const todayHours = todayData.hours;
		const todayActivity = todayData.activity;
		const todaySalary = todayHours * HOURLY_RATE;
		const totalMonthHours = Object.values(teacherMap).reduce((sum, d) => sum + (Number(d?.hours) || 0), 0);
		const totalMonthSalary = totalMonthHours * HOURLY_RATE;
		return renderTemplate`<tr class="hover:bg-blue-50/40 transition group"${addAttribute(teacher.id, "data-teacher-id")}><td class="py-4 px-3 text-center text-gray-500 font-medium">${idx + 1}</td><td class="py-4 px-3 font-mono font-bold text-blue-700"><span class="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg text-xs">${teacher.code || "-"}</span></td><td class="py-4 px-4 font-bold text-gray-900">${teacher.name}</td><td class="py-4 px-3 text-center bg-slate-50/60"><select class="hour-dropdown w-full font-bold text-xs rounded-xl px-2.5 py-2 border outline-none focus:ring-2 focus:ring-blue-600 transition cursor-pointer shadow-sm"${addAttribute(teacher.id, "data-teacher-id")}><option value="0"${addAttribute(todayHours === 0, "selected")}>❌ Tidak Hadir (0 Jam)</option><option value="1"${addAttribute(todayHours === 1, "selected")}>🟢 1 Jam Mengajar</option><option value="2"${addAttribute(todayHours === 2, "selected")}>🟢 2 Jam Mengajar</option><option value="3"${addAttribute(todayHours === 3, "selected")}>🟢 3 Jam Mengajar</option><option value="4"${addAttribute(todayHours === 4, "selected")}>🟢 4 Jam Mengajar</option><option value="5"${addAttribute(todayHours === 5, "selected")}>🟡 5 Jam Mengajar</option><option value="6"${addAttribute(todayHours === 6, "selected")}>🟡 6 Jam Mengajar</option><option value="7"${addAttribute(todayHours === 7, "selected")}>🔵 7 Jam Mengajar</option><option value="8"${addAttribute(todayHours === 8, "selected")}>🟣 8 Jam Mengajar</option></select></td><td class="py-4 px-3 bg-slate-50/60"><input type="text" class="activity-input w-full px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white transition" placeholder="Contoh: Piket / Ujian / Ekstrakurikuler"${addAttribute(todayActivity, "value")}${addAttribute(teacher.id, "data-teacher-id")}></td><td class="py-4 px-3 text-right font-bold text-gray-800"><span class="today-salary-val"${addAttribute(teacher.id, "data-teacher-id")}>${formatRupiah(todaySalary)}</span></td><td class="py-4 px-3 text-center font-extrabold text-blue-900 bg-blue-50/50"><span class="month-hours-val"${addAttribute(teacher.id, "data-teacher-id")}>${totalMonthHours}</span> Jam</td><td class="py-4 px-4 text-right font-black text-emerald-700 bg-emerald-50/40 text-sm"><span class="month-salary-val"${addAttribute(teacher.id, "data-teacher-id")}>${formatRupiah(totalMonthSalary)}</span></td></tr>`;
	})}</tbody></table></div>`}</div><!-- Floating Save Toast Notification --><div id="saveToast" class="fixed bottom-6 right-6 z-50 hidden px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold transition-all"></div><!-- Hidden Initial JSON Store for Instant Client Access --><script type="application/json" id="initialDataScript">${unescapeHTML(JSON.stringify(attendanceStore))}<\/script></div>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/attendance/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/attendance/index.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/attendance/index.astro";
var $$url = "/admin/attendance";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/attendance/index@_@astro
var page = () => attendance_exports;
//#endregion
export { page };
