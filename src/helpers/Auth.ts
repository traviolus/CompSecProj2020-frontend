export const getToken = (): string => {
  return localStorage.getItem("token") || "";
};

export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};
