//import { bindActionCreators } from "redux";

const initialState = {
  userid: null,
  username: "",
  token: null,
};

//* Actions
const POST_SIGNIN_SUCCESS = "POST_SIGNIN_SUCCESS";

//* Action 생성자
export const signin_Success = (
  userid: number,
  username: string,
  token: any,
) => ({
  type: POST_SIGNIN_SUCCESS,
  payload: { userid, username },
});

//* Reducer
const signinReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_SIGNIN_SUCCESS:
      return {
        ...state,
        userid: action.userid,
        username: action.username,
        //token: action.token,
      };
    default:
      return state;
  }
};

export default signinReducer;
