export const getToken = (): string => {
  return localStorage.getItem("token") || "";
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const getUsername = (): string => {
  return localStorage.getItem("username") || "";
};

export const setUsername = (token: string): void => {
  localStorage.setItem("username", token);
};

export const removeUsername = (): void => {
  localStorage.removeItem("username");
};