import { createClient } from "@supabase/supabase-js";
//#region src/lib/supabase.ts
var supabaseUrl = "https://nxiqaibocqyhlaluscbv.supabase.co".trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aXFhaWJvY3F5aGxhbHVzY2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NjM1MTYsImV4cCI6MjEwMzUzOTUxNn0.bjAqcrXU8OzBDo3ck_q19_H8azWYrZ7epfDc5R9Cc5w".trim();
var supabase = createClient(supabaseUrl, supabaseAnonKey);
var supabaseAdmin = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aXFhaWJvY3F5aGxhbHVzY2J2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzk2MzUxNiwiZXhwIjoyMTAzNTM5NTE2fQ.rYY2ydA9PRQxIB179y2WFX_SdP_ldcGtdsTQcF0TFik");
//#endregion
export { supabaseAdmin as n, supabase as t };
