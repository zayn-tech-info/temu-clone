import Cookies from "js-cookie";

export function redirectAdmin() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    Cookies.set("token", token, {
      expires: 7,
      secure: window.location.protocol === "https:",
      sameSite: window.location.protocol === "https:" ? "none" : "lax",
      // Don't set domain for production - let browser handle it
      ...(window.location.protocol === "http:" && { domain: "localhost" }),
    });
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
