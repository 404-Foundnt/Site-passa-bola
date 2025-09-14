export function login(email){ localStorage.setItem("pb_user", JSON.stringify({ email })); }
export function logout(){ localStorage.removeItem("pb_user"); }
export function getUser(){ try { return JSON.parse(localStorage.getItem("pb_user")); } catch { return null; } }
