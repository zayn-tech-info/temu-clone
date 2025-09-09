import Cookies from "js-cookie";

export function redirectAdmin() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    Cookies.set("token", token, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: "lax",
      domain:
        window.location.protocol === "https:" ? ".vercel.app" : "localhost",
    });
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
