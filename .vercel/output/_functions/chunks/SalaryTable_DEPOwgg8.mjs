import { d as maybeRenderHead, p as addAttribute, u as renderTemplate, x as createAstro } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
//#region src/components/admin/SalaryTable.astro
createAstro("https://astro.build");
var $$SalaryTable = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SalaryTable;
	const { month, year } = Astro.props;
	const HOURLY_RATE = 5e3;
	const { data: teachers } = await supabaseAdmin.from("teachers").select("*").order("code", {
		ascending: true,
		nullsFirst: false
	});
	const { data: attendance } = await supabaseAdmin.from("attendance").select("*").eq("month", month).eq("year", year);
	const salaryData = teachers?.map((teacher) => {
		const teacherRecords = attendance?.filter((a) => a.teacher_id === teacher.id) || [];
		const activeDaysCount = teacherRecords.filter((a) => (Number(a.hours) || 0) > 0).length;
		const totalHours = teacherRecords.reduce((sum, item) => sum + (Number(item.hours) || 0), 0);
		const totalSalary = totalHours * HOURLY_RATE;
		const teacherActivities = teacherRecords.filter((a) => a.activity && String(a.activity).trim() !== "").map((a) => ({
			date: a.date,
			day: parseInt(String(a.date).split("-")[2] || "1"),
			hours: a.hours,
			activity: a.activity
		})).sort((a, b) => a.day - b.day);
		return {
			...teacher,
			activeDaysCount,
			totalHours,
			totalSalary,
			activities: teacherActivities
		};
	}) || [];
	const allMonthActivities = [];
	if (attendance && teachers) attendance.forEach((att) => {
		if (att.activity && String(att.activity).trim() !== "") {
			const teacher = teachers.find((t) => t.id === att.teacher_id);
			if (teacher) {
				const parts = String(att.date).split("-");
				const day = parseInt(parts[2] || "1");
				allMonthActivities.push({
					date: att.date,
					day,
					teacherName: teacher.name,
					teacherCode: teacher.code || "-",
					hours: Number(att.hours) || 0,
					activity: att.activity
				});
			}
		}
	});
	allMonthActivities.sort((a, b) => a.day - b.day);
	const sortedByHours = [...salaryData].sort((a, b) => b.totalHours - a.totalHours);
	const topTeacher = sortedByHours[0] || null;
	const grandTotalHours = salaryData.reduce((sum, item) => sum + item.totalHours, 0);
	const grandTotalSalary = grandTotalHours * HOURLY_RATE;
	const avgHours = salaryData.length > 0 ? (grandTotalHours / salaryData.length).toFixed(1) : "0";
	const maxHours = Math.max(...salaryData.map((d) => d.totalHours), 1);
	const formatRupiah = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0
		}).format(amount);
	};
	const monthName = [
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
	][month - 1] || "Bulan Ini";
	return renderTemplate`${maybeRenderHead($$result)}<div class="space-y-8" id="salaryReportContainer">${salaryData.length === 0 ? renderTemplate`<div class="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4"><div class="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-3xl mx-auto">👨‍🏫</div><div><h3 class="text-xl font-bold text-gray-900">Belum Ada Data Guru</h3><p class="text-gray-500 text-sm mt-1">Tambahkan guru dan input absensi untuk melihat rekapitulasi gaji.</p></div><a href="/admin/teachers" class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition shadow"><span>➕ Tambah Data Guru</span></a></div>` : renderTemplate`<div class="space-y-8"><!-- 1. SUMMARY METRICS CARDS --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print:hidden"><!-- Total Anggaran Gaji --><div class="bg-gradient-to-br from-emerald-600 to-teal-800 text-white p-6 rounded-3xl shadow-sm space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-wider text-emerald-100">Total Pengeluaran Gaji</span><span class="text-2xl">💵</span></div><p class="text-2xl sm:text-3xl font-black">${formatRupiah(grandTotalSalary)}</p><p class="text-xs text-emerald-100">Untuk ${salaryData.length} guru pada ${monthName} ${year}</p></div><!-- Total Jam Mengajar --><div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-wider text-gray-400">Total Jam Mengajar</span><span class="text-2xl">⏱️</span></div><p class="text-2xl sm:text-3xl font-black text-blue-900">${grandTotalHours} Jam</p><p class="text-xs text-gray-500">Akumulasi seluruh jam guru</p></div><!-- Rata-rata Jam Mengajar --><div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-wider text-gray-400">Rata-rata Jam / Guru</span><span class="text-2xl">📊</span></div><p class="text-2xl sm:text-3xl font-black text-indigo-900">${avgHours} Jam</p><p class="text-xs text-gray-500">Estimasi: ${formatRupiah(Number(avgHours) * HOURLY_RATE)} / guru</p></div><!-- Guru Jam Terbanyak --><div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-2"><div class="flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-wider text-gray-400">Jam Terbanyak (Top)</span><span class="text-2xl">🏆</span></div><p class="text-lg font-black text-gray-900 truncate"${addAttribute(topTeacher?.name || "-", "title")}>${topTeacher?.name || "-"}</p><p class="text-xs font-bold text-emerald-600">${topTeacher?.totalHours || 0} Jam (${formatRupiah(topTeacher?.totalSalary || 0)})</p></div></div><!-- 2. VISUAL CHART / GRAFIK PERBANDINGAN GAJI GURU --><div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6 print:hidden"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1"><span>📈</span><span>Grafik Visual</span></div><h3 class="text-lg font-extrabold text-gray-900">Grafik Perbandingan Beban Mengajar & Gaji Guru</h3><p class="text-xs text-gray-500 mt-0.5">Visualisasi jam mengajar dan distribusi nominal honor bulan ${monthName} ${year}.</p></div><div class="flex items-center gap-3 text-xs"><span class="flex items-center gap-1.5 font-semibold text-gray-600"><span class="w-3 h-3 bg-blue-600 rounded-full"></span> Jam Mengajar</span><span class="flex items-center gap-1.5 font-semibold text-gray-600"><span class="w-3 h-3 bg-emerald-500 rounded-full"></span> Total Gaji</span></div></div><!-- Custom Horizontal Bar Chart --><div class="space-y-4">${sortedByHours.map((item) => {
		const percent = Math.min(100, Math.round(item.totalHours / maxHours * 100));
		return renderTemplate`<div class="space-y-1.5 group"><div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><span class="font-mono font-bold bg-slate-100 text-blue-800 px-2 py-0.5 rounded text-[11px]">${item.code || "-"}</span><span class="font-bold text-gray-800">${item.name}</span></div><div class="flex items-center gap-3 font-semibold"><span class="text-blue-700 font-extrabold">${item.totalHours} Jam</span><span class="text-gray-300">|</span><span class="text-emerald-700 font-black">${formatRupiah(item.totalSalary)}</span></div></div><!-- Progress Bar Track --><div class="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5"><div class="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500"${addAttribute(`width: ${Math.max(percent, 2)}%`, "style")}${addAttribute(`${item.name}: ${item.totalHours} jam mengajar`, "title")}></div></div></div>`;
	})}</div></div><!-- 3. TABEL DETAIL REKAPITULASI GAJI (PRINT READY) --><div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden print:border-none print:shadow-none"><!-- Header Cetak Khusus Print --><div class="hidden print:block text-center p-6 border-b border-gray-300 space-y-1"><h2 class="text-xl font-black text-gray-900">SMK PENERBANGAN JEMBER</h2><p class="text-xs text-gray-600">Jl. PB Sudirman No. 45, Patrang, Jember, Jawa Timur</p><h3 class="text-base font-bold text-gray-800 uppercase mt-3">Laporan Rekapitulasi Honorarium Jam Mengajar Guru</h3><p class="text-xs font-semibold text-gray-500">Periode: ${monthName} ${year} | Tarif: Rp 5.000 / Jam</p></div><!-- Top Table Action Bar --><div class="p-6 bg-slate-50 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden"><div><h3 class="font-extrabold text-gray-900 text-lg">Tabel Rincian Gaji Guru</h3><p class="text-xs text-gray-500 mt-0.5">Dihitung otomatis: Total Jam Mengajar × Rp 5.000</p></div><div class="flex items-center gap-3"><button type="button" onclick="window.print()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow cursor-pointer"><span>🖨️</span><span>Cetak Laporan / Export PDF</span></button></div></div><!-- Table Content --><div class="overflow-x-auto"><table class="w-full text-left border-collapse text-sm"><thead><tr class="bg-blue-900 text-white font-bold text-xs uppercase tracking-wider"><th class="py-4 px-4 text-center w-12">No</th><th class="py-4 px-4 w-28">Kode Guru</th><th class="py-4 px-4 min-w-[200px]">Nama Lengkap Guru</th><th class="py-4 px-4 text-center w-36">Hari Mengajar</th><th class="py-4 px-4 text-center w-36">Total Jam</th><th class="py-4 px-4 text-right w-36">Tarif / Jam</th><th class="py-4 px-6 text-right w-44 bg-blue-950">Total Honor (Gaji)</th><th class="py-4 px-4 text-center w-28 print:hidden">Slip Gaji</th></tr></thead><tbody class="divide-y divide-gray-100">${salaryData.map((item, idx) => renderTemplate`<tr class="hover:bg-blue-50/40 transition"><td class="py-4 px-4 text-center font-medium text-gray-500">${idx + 1}</td><td class="py-4 px-4 font-mono font-bold text-blue-700"><span class="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">${item.code || "-"}</span></td><td class="py-4 px-4 font-bold text-gray-900">${item.name}</td><td class="py-4 px-4 text-center font-semibold text-gray-700"><span class="bg-slate-100 px-2.5 py-1 rounded-lg text-xs">${item.activeDaysCount} Hari</span></td><td class="py-4 px-4 text-center font-extrabold text-blue-900"><span class="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">${item.totalHours} Jam</span></td><td class="py-4 px-4 text-right font-medium text-gray-600">Rp 5.000</td><td class="py-4 px-6 text-right font-black text-emerald-700 bg-emerald-50/40 text-base">${formatRupiah(item.totalSalary)}</td><td class="py-4 px-4 text-center print:hidden"><button type="button" class="view-slip-btn text-xs font-bold bg-slate-100 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl transition cursor-pointer"${addAttribute(item.name, "data-name")}${addAttribute(item.code, "data-code")}${addAttribute(item.totalHours, "data-hours")}${addAttribute(formatRupiah(item.totalSalary), "data-salary")}${addAttribute(item.activeDaysCount, "data-days")}${addAttribute(monthName, "data-month")}${addAttribute(year, "data-year")}>Slip 📄</button></td></tr>`)}</tbody><tfoot><tr class="bg-slate-100 font-extrabold border-t-2 border-gray-300 text-gray-900 text-sm"><td colspan="4" class="py-4 px-4 text-right uppercase tracking-wider text-xs">Total Anggaran Pengeluaran Honor (${monthName} ${year}):</td><td class="py-4 px-4 text-center text-blue-900 font-black text-base">${grandTotalHours} Jam</td><td class="py-4 px-4 text-right text-xs text-gray-500">-</td><td class="py-4 px-6 text-right text-emerald-800 font-black text-lg bg-emerald-100/60">${formatRupiah(grandTotalSalary)}</td><td class="print:hidden"></td></tr></tfoot></table></div><!-- Tanda Tangan Khusus Print --><div class="hidden print:grid grid-cols-2 gap-8 p-12 text-center text-xs mt-8"><div><p>Mengetahui,</p><p class="font-bold mt-1">Kepala SMK Penerbangan Jember</p><div class="h-20"></div><p class="font-bold underline">Drs. H. Ahmad Subagio, M.Pd.</p><p class="text-gray-500">NIP. 19710315 199802 1 003</p></div><div><p>Jember, ${(/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric"
	})}</p><p class="font-bold mt-1">Bendahara Sekolah</p><div class="h-20"></div><p class="font-bold underline">Siti Rahmawati, S.Pd.</p><p class="text-gray-500">NIP. 19850620 201001 2 018</p></div></div></div><!-- 4. TABEL RINCIAN KEGIATAN TAMBAHAN GURU (DI BAWAH TABEL REKAP GAJI) --><div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"><div class="p-6 bg-slate-50 border-b border-gray-100 flex items-center justify-between"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1"><span>📌</span><span>Kegiatan Tambahan</span></div><h3 class="font-extrabold text-gray-900 text-lg">Catatan & Kegiatan Tambahan Guru (${monthName} ${year})</h3><p class="text-xs text-gray-500 mt-0.5">Daftar agenda kegiatan guru yang diinputkan saat presensi harian pada bulan ini.</p></div><span class="bg-purple-100 text-purple-800 font-extrabold text-xs px-3.5 py-1.5 rounded-xl">${allMonthActivities.length} Catatan Kegiatan</span></div>${allMonthActivities.length === 0 ? renderTemplate`<div class="p-8 text-center text-gray-400 text-xs font-medium"><span>ℹ️ Belum ada catatan kegiatan tambahan yang diisikan untuk bulan ${monthName} ${year}.</span></div>` : renderTemplate`<div class="overflow-x-auto"><table class="w-full text-left border-collapse text-sm"><thead><tr class="bg-slate-100 border-b border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider"><th class="py-3.5 px-4 text-center w-12">No</th><th class="py-3.5 px-4 w-36">Tanggal</th><th class="py-3.5 px-4 w-28">Kode</th><th class="py-3.5 px-4 min-w-[180px]">Nama Guru</th><th class="py-3.5 px-4 text-center w-28">Jam Mengajar</th><th class="py-3.5 px-4">Uraian Kegiatan Tambahan</th></tr></thead><tbody class="divide-y divide-gray-100 text-xs">${allMonthActivities.map((act, idx) => renderTemplate`<tr class="hover:bg-purple-50/40 transition"><td class="py-3.5 px-4 text-center text-gray-500 font-medium">${idx + 1}</td><td class="py-3.5 px-4 font-bold text-gray-900"><span class="bg-slate-100 px-2.5 py-1 rounded-lg">Tgl ${act.day} ${monthName}</span></td><td class="py-3.5 px-4 font-mono font-bold text-blue-700"><span class="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">${act.teacherCode}</span></td><td class="py-3.5 px-4 font-bold text-gray-900">${act.teacherName}</td><td class="py-3.5 px-4 text-center font-black text-blue-900">${act.hours} Jam</td><td class="py-3.5 px-4 font-medium text-purple-950"><span class="bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-xl inline-block">${act.activity}</span></td></tr>`)}</tbody></table></div>`}</div></div>`}<!-- MODAL SLIP GAJI INDIVIDU --><div id="slipModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4"><div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 space-y-6 animate-in zoom-in duration-150"><div class="flex items-center justify-between border-b border-gray-100 pb-4"><div><span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Slip Honorarium</span><h3 class="text-lg font-extrabold text-gray-900 mt-1">Slip Gaji Mengajar Guru</h3></div><button type="button" id="closeSlipModalBtn" class="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 cursor-pointer">✕</button></div><div class="space-y-4 text-xs border border-gray-200 rounded-2xl p-5 bg-slate-50/50" id="slipPrintArea"><div class="text-center border-b border-gray-200 pb-3"><h4 class="font-black text-sm text-gray-900">SMK PENERBANGAN JEMBER</h4><p class="text-gray-500 text-[11px]">Bukti Pembayaran Honor Mengajar</p></div><div class="grid grid-cols-2 gap-2 text-gray-700"><div><span class="text-gray-400 block">Nama Guru:</span><strong class="text-gray-900 text-sm" id="slipTeacherName">-</strong></div><div><span class="text-gray-400 block">Kode Guru:</span><strong class="font-mono text-blue-700 font-bold text-sm" id="slipTeacherCode">-</strong></div><div><span class="text-gray-400 block">Periode Bulan:</span><strong class="text-gray-800" id="slipPeriod">-</strong></div><div><span class="text-gray-400 block">Hari Mengajar:</span><strong class="text-gray-800" id="slipDays">-</strong></div></div><div class="border-t border-dashed border-gray-300 pt-3 space-y-2"><div class="flex justify-between"><span>Total Jam Mengajar:</span><strong class="text-blue-900 font-bold" id="slipHours">0 Jam</strong></div><div class="flex justify-between"><span>Tarif Per Jam:</span><span>Rp 5.000</span></div><div class="flex justify-between text-sm font-black border-t border-gray-200 pt-2 text-emerald-800"><span>Total Diterima:</span><span id="slipSalary">Rp 0</span></div></div></div><div class="flex gap-3"><button type="button" id="closeSlipBtn" class="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">Tutup</button><button type="button" onclick="window.print()" class="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5 cursor-pointer"><span>🖨️ Cetak Slip</span></button></div></div></div></div>${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/SalaryTable.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/components/admin/SalaryTable.astro", void 0);
//#endregion
export { $$SalaryTable as t };
