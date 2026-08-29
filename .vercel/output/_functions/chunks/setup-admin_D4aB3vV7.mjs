import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { f as renderHead, u as renderTemplate } from "./server_jUskqENO.mjs";
import { t as createComponent } from "./compiler_SD6icXYT.mjs";
import { t as renderScript } from "./script_CLL5IU90.mjs";
//#region src/pages/setup-admin.astro
var setup_admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$SetupAdmin,
	file: () => $$file,
	url: () => $$url
});
var $$SetupAdmin = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`<html lang="id" data-astro-cid-3of675cc><head><meta charset="UTF-8"><title>Setup Admin Pertama</title>${renderHead($$result)}</head><body data-astro-cid-3of675cc><h2 data-astro-cid-3of675cc>️ Buat Admin Pertama</h2><p style="color: red; font-size: 0.9em;" data-astro-cid-3of675cc>⚠️ PERINGATAN: Hapus file ini setelah admin berhasil dibuat!</p><form id="adminForm" data-astro-cid-3of675cc><label data-astro-cid-3of675cc>Nama Lengkap:</label><input type="text" id="full_name" required placeholder="Contoh: Administrator" data-astro-cid-3of675cc><label data-astro-cid-3of675cc>Email:</label><input type="email" id="email" required placeholder="admin@smkpenerbangan.sch.id" data-astro-cid-3of675cc><label data-astro-cid-3of675cc>Password:</label><input type="password" id="password" required placeholder="Minimal 6 karakter" data-astro-cid-3of675cc><button type="submit" data-astro-cid-3of675cc>Buat Admin</button></form><div id="message" data-astro-cid-3of675cc></div>${renderScript($$result, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/setup-admin.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/setup-admin.astro", void 0);
var $$file = "D:/project/smk-penerbangan-jember/SMK-Penerbangan-Jember/src/pages/setup-admin.astro";
var $$url = "/setup-admin";
//#endregion
//#region \0virtual:astro:page:src/pages/setup-admin@_@astro
var page = () => setup_admin_exports;
//#endregion
export { page };
