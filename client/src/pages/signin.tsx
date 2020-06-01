import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, RouteComponentProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import * as SigninInput from "../components/signin_Input";
import "../pages/css/signin.css";
import util from "../services/util";
const { validUserId } = util;
//* fake data

interface state extends RouteComponentProps {
  email: string;
  password: string;
  err: any;
  errors: {};
}
//state type 지정 : interface 사용
const Signin: React.FC<state> = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    err: null, //전처리
    errors: {}, //보관소
  });
  let { onLogin, user_id, fetchLoginAPI } = useAuth();

  useEffect(() => {
    if (user_id === 0) {
      validUserId(vaildUserIdSuccess);
    } else {
    }
  }, []);

  const vaildUserIdSuccess = async (res: any) => {
    await onLogin(res.data);
    history.replace("/home");
  };

  const handleChange = ({ currentTarget }: any) => {
    //email 변경
    const { value, name } = currentTarget;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSignin = async (e: any) => {
    e.preventDefault();
    const { email, password, errors } = state;
    const { vali_error } = SigninInput.validateInput(password);
    if (vali_error === "" && Object.keys(errors).length === 0) {
      //! 이 부분에서 사가 미들웨어 호출
      fetchLoginAPI(email, password);
      // let data = { email, password };
      // let opt = {
      //   headers: { "content-type": "application/json" },
      //   withCredentials: true,
      // };
      // let url = "http://18.217.232.233:8080/login";

      // try {
      //   const res = await axios.post(url, data, opt);
      //   if (res.status === 200) {
      //     await onLogin(res.data);
      //     await history.replace("/home");
      //   }
      // } catch ({ response: { status } }) {
      //   if (status === 403) {
      //     alert("이메일을 확인해주세요.");
      //     history.replace("/signin");
      //   }
      //   if (status === 401) {
      //     alert("비밀번호를 확인해주세요.");
      //     history.replace("signin");
      //   }
      // }
    }
  };
  const { email, password } = state;

  //! form 안에다 넣어야 관리가 쉬워짐
  return (
    <div className="container">
      <div className="signin_wrapper">
        <div className="textbox">
          <h1 className="signin_greet">
            안녕하세요. 굿띵은
            <br />
            로그인이 필요한 서비스 입니다.
          </h1>
        </div>
        <form onSubmit={handleSignin} className="form" autoComplete="off">
          <SigninInput.Input
            email={email}
            password={password}
            onChange={handleChange}
          />
          <button className="submit">로그인</button>
        </form>
        <Link to={"/signup"} className="signin_back">
          아이디가 없으신가요?
        </Link>
      </div>
    </div>
  );
};
export default Signin;
