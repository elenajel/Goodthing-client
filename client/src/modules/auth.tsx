export const USER_LOGIN = "USER_LOGIN" as const;
export const USER_LOGOUT = "USER_LOGOUT" as const;

export const userLogin = (userInfo: any) => ({
  type: USER_LOGIN,
  payload: {
    userInfo,
  },
});
export const userLogout = () => ({
  type: USER_LOGOUT,
});

type authState = {
  user_id: number;
  user_name: string;
};
const inintialAuthState: authState = {
  user_id: 0,
  user_name: "",
};
type authActions = ReturnType<typeof userLogin> | ReturnType<typeof userLogout>;

const reducer = (state = inintialAuthState, action: authActions) => {
  switch (action.type) {
    case USER_LOGIN:
      const { user_id, user_name } = action.payload.userInfo;
      return { user_id, user_name };
    case USER_LOGOUT:
      return { ...inintialAuthState };
    default:
      return state;
  }
};
export default reducer;
