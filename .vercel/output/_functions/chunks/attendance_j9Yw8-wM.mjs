import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import { n as isAuthenticated } from "./auth_DQOQabTH.mjs";
//#region src/pages/api/attendance.ts
var attendance_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var GET = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const url = new URL(context.request.url);
		const month = parseInt(url.searchParams.get("month") || "1");
		const year = parseInt(url.searchParams.get("year") || "2026");
		const { data, error } = await supabaseAdmin.from("attendance").select("*").eq("month", month).eq("year", year);
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal memuat data absensi" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
var POST = async (context) => {
	if (!isAuthenticated(context)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const { teacher_id, date, hours, activity, month, year } = await context.request.json();
		if (!teacher_id || !date) return new Response(JSON.stringify({ error: "teacher_id dan date wajib diisi" }), { status: 400 });
		const hoursNum = Math.max(0, parseInt(hours) || 0);
		const { data, error } = await supabaseAdmin.from("attendance").upsert({
			teacher_id,
			date,
			hours: hoursNum,
			activity: activity !== void 0 ? String(activity).trim() : "",
			month: parseInt(month),
			year: parseInt(year)
		}, { onConflict: "teacher_id,date" }).select().single();
		if (error) throw error;
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message || "Gagal menyimpan absensi" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/attendance@_@ts
var page = () => attendance_exports;
//#endregion
export { page };
