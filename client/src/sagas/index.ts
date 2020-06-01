import { call, takeEvery, put, all, spawn } from "redux-saga/effects";
import { fecthLogin } from "../actions";
import { USER_LOGIN } from "../modules/auth";
import axios from "axios";
import { userLogin } from "../modules/auth";
import saga from "redux-saga";

//! 루트 사가 takeEvery 로 "USER_LOGIN_REQUEST" 액션이 스토어에 들어오면 login$ 제너레이터 펑션을 실행시킴
export default function* rootSaga() {
  // yield console.log("ho");
  yield takeEvery("USER_LOGIN_REQUEST", login$);
}

//! 원래는 api폴더로 따로 구분해야 하지만 연습이기때문에 사가에 같이 작성
//! api.fetchLogin 이 맞는 디렉토리 구조
const fetchLoginAPI = (email: string, password: number) => {
  let data = { email, password };
  let opt = {
    headers: { "content-type": "application/json" },
    withCredentials: true,
  };
  let url = "http://18.217.232.233:8080/login";
  return axios.post(url, data, opt);
};

//! payload를 디스트럭쳐링으로 받고 try/catch문을 통해 핸들링
//! yield는 await이랑 동일한 역활로 비동기를 동기로 처리해줌
//! 원래는 아래 주석처리처럼 대기,성공,실패 로 나눠서 미들웨어 처리를 해야함
function* login$({ payload: { email, password } }: any) {
  // yield put({ type: "USER_LOGIN_PENDING"})
  try {
    let res = yield call(fetchLoginAPI, email, password);
    yield put({ type: "USER_LOGIN", payload: res.data });
    // yield put({ type: "USER_LOGIN_SUCESS", payload: res.data });
  } catch (err) {
    // yield put({type:"USER_LOGIN_FAIL"})
  }
}
const watcher = function* () {
  yield takeEvery("USER_LOGIN_REQUEST", login$);
};
