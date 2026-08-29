import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { t as $$AdminLayout } from "./AdminLayout_jDkCVuWe.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const now = /* @__PURE__ */ new Date();
	const currentMonth = now.getMonth() + 1;
	const currentYear = now.getFullYear();
	const currentMonthName = [
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
	][currentMonth - 1];
	const { count: teacherCount } = await supabaseAdmin.from("teachers").select("*", {
		count: "exact",
		head: true
	});
	const { count: newsCount } = await supabaseAdmin.from("news").select("*", {
		count: "exact",
		head: true
	});
	const { count: announcementCount } = await supabaseAdmin.from("announcements").select("*", {
		count: "exact",
		head: true
	});
	const { data: attendanceData } = await supabaseAdmin.from("attendance").select("hours").eq("month", currentMonth).eq("year", currentYear);
	const totalMonthHours = attendanceData?.reduce((sum, a) => sum + (Number(a.hours) || 0), 0) || 0;
	const totalMonthSalary = totalMonthHours * 5e3;
	const { data: latestTeachers } = await supabaseAdmin.from("teachers").select("*").order("created_at", { ascending: false }).limit(5);
	const formatRupiah = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0
		}).format(amount);
	};
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard Admin" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="space-y-6 sm:space-y-8 max-w-7xl mx-auto"><!-- Header Banner --><div class="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden"><div class="relative z-10 space-y-2"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-bold uppercase tracking-wider"><span>✈️</span><span>Portal Administrasi Sekolah</span></div><h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">Dashboard Admin</h1><p class="text-blue-100 text-xs sm:text-base max-w-xl font-light">Selamat datang kembali! Pantau data guru, presensi mengajar harian, dan rekap honor otomatis.</p></div><div class="absolute -right-10 -bottom-10 text-8xl sm:text-9xl opacity-10 pointer-events-none">✈️</div></div><!-- Stats Cards Grid (Responsive 1 col mobile, 2 col tablet, 4 col desktop) --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"><!-- Total Guru --><a href="/admin/teachers" class="bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-gray-100 hover:shadow-md transition group"><div class="flex justify-between items-center"><div><p class="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Guru</p><p class="text-2xl sm:text-3xl font-black text-gray-900 mt-1">${teacherCount || 0}</p><p class="text-xs text-blue-700 font-semibold mt-2 group-hover:underline">Kelola Guru →</p></div><div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition">👨‍🏫</div></div></a><!-- Jam Mengajar Bulan Ini --><a href="/admin/attendance" class="bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-gray-100 hover:shadow-md transition group"><div class="flex justify-between items-center"><div><p class="text-gray-400 text-xs font-bold uppercase tracking-wider">Presensi (${currentMonthName})</p><p class="text-2xl sm:text-3xl font-black text-blue-700 mt-1">${totalMonthHours} Jam</p><p class="text-xs text-blue-700 font-semibold mt-2 group-hover:underline">Isi Presensi →</p></div><div class="w-12 h-12 sm:w-14 sm:h-14 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition">📝</div></div></a><!-- Estimasi Honor Bulan Ini --><a href="/admin/salary" class="bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-gray-100 hover:shadow-md transition group"><div class="flex justify-between items-center"><div><p class="text-gray-400 text-xs font-bold uppercase tracking-wider">Estimasi Honor Gaji</p><p class="text-xl sm:text-2xl font-black text-emerald-600 mt-1">${formatRupiah(totalMonthSalary)}</p><p class="text-xs text-emerald-700 font-semibold mt-2 group-hover:underline">Rekap Gaji →</p></div><div class="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition">💰</div></div></a><!-- Pengumuman Sekolah --><a href="/admin/announcements" class="bg-white p-5 sm:p-6 rounded-3xl shadow-xs border border-gray-100 hover:shadow-md transition group"><div class="flex justify-between items-center"><div><p class="text-gray-400 text-xs font-bold uppercase tracking-wider">Pengumuman</p><p class="text-2xl sm:text-3xl font-black text-amber-600 mt-1">${announcementCount || 0}</p><p class="text-xs text-amber-700 font-semibold mt-2 group-hover:underline">Kelola Pengumuman →</p></div><div class="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition">📢</div></div></a></div><!-- Quick Actions & Fast Teacher Input Grid --><div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start"><!-- Quick Teacher Add Card (Left) --><div class="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6"><div class="flex items-center justify-between border-b border-gray-100 pb-4"><div><span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">Input Cepat</span><h2 class="text-lg sm:text-xl font-bold text-gray-900 mt-2">Tambah Guru Baru</h2><p class="text-xs text-gray-500 mt-0.5">Input nama dan kode guru untuk segera diabsensi.</p></div><span class="text-3xl">➕</span></div><form id="dashTeacherForm" class="space-y-4"><div><label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" for="dashCode">Kode Guru</label><input type="text" id="dashCode" required placeholder="Contoh: GUR-01" class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition font-mono uppercase font-bold"></div><div><label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5" for="dashName">Nama Lengkap Guru</label><input type="text" id="dashName" required placeholder="Contoh: Drs. Bambang Sutrisno, S.T." class="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm outline-none transition"></div><div id="dashMsg" class="hidden p-3 rounded-xl text-xs font-semibold"></div><button type="submit" class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition shadow text-sm cursor-pointer">Simpan Guru Sekarang 💾</button></form></div><!-- Latest Teachers List (Right) --><div class="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6"><div class="flex items-center justify-between border-b border-gray-100 pb-4"><div><span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">Direktori Guru</span><h3 class="text-lg sm:text-xl font-bold text-gray-900 mt-2">Daftar Guru Terbaru</h3><p class="text-xs text-gray-500 mt-0.5">Guru yang baru saja didaftarkan ke dalam sistem.</p></div><a href="/admin/teachers" class="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition">Lihat Semua Guru →</a></div>${!latestTeachers || latestTeachers.length === 0 ? renderTemplate`<p class="text-xs text-gray-500 py-12 text-center">Belum ada data guru yang ditambahkan.</p>` : renderTemplate`<div class="divide-y divide-gray-100">${latestTeachers.map((teacher) => renderTemplate`<div class="py-3.5 flex items-center justify-between text-xs gap-3 hover:bg-slate-50/60 px-2 rounded-xl transition"><div class="flex items-center gap-3 min-w-0"><span class="font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100 flex-shrink-0 text-xs">${teacher.code || "-"}</span><span class="font-bold text-gray-900 text-xs sm:text-sm truncate">${teacher.name}</span></div><a href="/admin/attendance" class="text-blue-700 hover:text-blue-900 font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg flex-shrink-0 transition">📝 Isi Presensi</a></div>`)}</div>`}</div></div></div>` })}${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/index.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/admin/index.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
