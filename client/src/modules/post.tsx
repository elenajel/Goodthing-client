import axios from "axios";

const GET_POST_PENDING = "GET_POST_PENDING" as const;
const GET_POST_SUCCESS = "GET_POST_SUCCESS" as const;
const GET_POST_FAILURE = "GET_POST_FAILURE" as const;

const getPostAPI = (user_id: number) => {
  return axios.get(
    `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`,
  );
};
export const getPost = (user_id: number) => async (dispatch: any) => {
  dispatch({ type: GET_POST_PENDING });

  try {
    let res = await getPostAPI(user_id);
    dispatch({ type: GET_POST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_POST_FAILURE, payload: err });
  }
};
