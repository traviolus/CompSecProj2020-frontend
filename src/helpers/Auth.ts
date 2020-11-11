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

export const setUsername = (username: string): void => {
  localStorage.setItem("username", username);
};

export const removeUsername = (): void => {
  localStorage.removeItem("username");
};

export const getUserStatus = (): string => {
  return localStorage.getItem("userstatus") || "";
};

export const setUserStatus = (userstatus: string): void => {
  localStorage.setItem("userstatus", userstatus);
};

export const removeUserStatus = (): void => {
  localStorage.removeItem("userstatus");
};
