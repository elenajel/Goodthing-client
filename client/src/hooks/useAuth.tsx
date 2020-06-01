import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/reducer";
import { userLogin, userLogout } from "../modules/auth";
import { fecthLogin } from "../actions/index";
import { useCallback } from "react";

export default function useAuth() {
  const user_id = useSelector((state: RootState) => state.auth?.user_id);
  const user_name = useSelector((state: RootState) => state.auth?.user_name);
  const dispatch = useDispatch();

  const onLogin = useCallback(
    (userInfo: any) => {
      dispatch(userLogin(userInfo));
    },
    [dispatch],
  );
  const onLogout = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);
  const fetchLoginAPI = useCallback(
    (email: string, password: string) => {
      dispatch(fecthLogin(email, password));
    },
    [dispatch],
  );
  return {
    user_id,
    user_name,
    onLogin,
    onLogout,
    fetchLoginAPI,
  };
}
