export const saveToken = (token: string, expiresInSec = 3600) => {
  const expiresAt = Date.now() + expiresInSec * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("auth_token_expires", String(expiresAt));
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  const exp = Number(localStorage.getItem("auth_token_expires") || "0");
  if (!token) return null;
  if (Date.now() > exp) {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token_expires");
    return null;
  }
  return token;
};

export const clearToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth_token_expires");
};
