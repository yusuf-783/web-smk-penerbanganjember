import { i as verifyToken } from "./auth_DWHfjTx0.mjs";
//#region src/middleware/auth.ts
function isAuthenticated(context) {
	const token = context.cookies.get("auth_token")?.value;
	if (!token) return false;
	return !!verifyToken(token);
}
function getUser(context) {
	const token = context.cookies.get("auth_token")?.value;
	if (!token) return null;
	return verifyToken(token);
}
//#endregion
export { isAuthenticated as n, getUser as t };
