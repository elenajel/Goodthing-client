export const fecthLogin = (email: string, password: string) => ({
  type: "USER_LOGIN_REQUEST",
  payload: {
    email,
    password,
  },
});
