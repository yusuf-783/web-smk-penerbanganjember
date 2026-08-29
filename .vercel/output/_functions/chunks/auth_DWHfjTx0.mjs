import { n as supabaseAdmin } from "./supabase_BEU1o0kt.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//#region src/lib/auth.ts
var JWT_SECRET = "x7k9m2p4q8r1s5t0w3y6z9a2b7c1d5e8f2g6h0j3k7m1n5p9q2r6s0t4u8v2w6x0y4z8a3b7c1d5e9f2g6h0j3k7m1n5p9q2r6s0t4u8v2w6x0y4z8a3b7c1d5e9f2g6h0j3k7m1n5p9q2r6s0t4u8v2w6x0y4z8";
async function loginUser(email, password) {
	const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("email", email).single();
	if (error || !user) return null;
	if (!await bcrypt.compare(password, user.password_hash)) return null;
	return {
		id: user.id,
		email: user.email,
		full_name: user.full_name,
		role: user.role
	};
}
function generateToken(user) {
	return jwt.sign({
		id: user.id,
		email: user.email,
		role: user.role
	}, JWT_SECRET, { expiresIn: "7d" });
}
function verifyToken(token) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch {
		return null;
	}
}
async function hashPassword(password) {
	return bcrypt.hash(password, 10);
}
//#endregion
export { verifyToken as i, hashPassword as n, loginUser as r, generateToken as t };
