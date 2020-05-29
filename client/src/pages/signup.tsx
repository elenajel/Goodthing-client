import React, { useState, useEffect } from "react";
import { Input } from "../common/input";
import "./css/signup.css";
import { Link, RouteComponentProps } from "react-router-dom";
import axios from "axios";

interface state extends RouteComponentProps {
  email: string;
  user_name: string;
  password: string;
  passwordCheck: string;
  err: any;
  [key: string]: any;
}

const Signup: React.FC<state> = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    user_name: "",
    password: "",
    passwordCheck: "",
    err: {},
  });
  useEffect(() => {
    let err = validate();
    setState({ ...state, err });
  }, []);

  const validate = (cur?: any): {} => {
    let curState = cur ? cur : { ...state };
    const { password: p, passwordCheck: pc, err: error } = curState;
    let err = { ...error };

    for (let key in curState) {
      curState[key] === "" ? (err[key] = "empty" + key) : delete err[key];
      key === "user_name" && delete err.submit;

      if (key === "passwordCheck" && p !== "") {
        if (p !== pc) err[key] = "diffPassword";
      }
    }
    return err;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    let err = validate();
    Object.keys(err).length === 0 && handlePost();
  };

  const handlePost = async () => {
    const { email, user_name, password } = state;
    let url = "http://18.217.232.233:8080/signup";
    let data = { email, user_name, password };
    let opt = {
      headers: { "content-type": "application/json" },
    };

    try {
      const res = await axios.post(url, data, opt);
      if (res.status === 200) {
        history.push("/signin");
      }
    } catch ({ response: { status } }) {
      if (status === 409) {
        let err = { ...state.err, submit: "alreadyExistsEmail" };
        setState({ ...state, err });
        alert("이미 존재하는 이메일 입니다!!!!");
      }
    }
  };

  const handleChange = ({ currentTarget: { value, name } }: any): void => {
    let cur = { ...state, [name]: value };
    let err = validate(cur);
    setState({ ...cur, err });
  };

  const handleBtnAble = (): any => {
    const { err } = state;
    return Object.keys(err).length !== 0 ? true : false;
  };

  const renderInput = (values: any) => {
    let renderArr: JSX.Element[] = [];
    for (let key in values) {
      if (key !== "err") {
        renderArr.push(
          <Input
            name={key}
            key={key}
            value={values[key]}
            onChange={handleChange}
            location="signup"
          />,
        );
      }
    }
    return renderArr;
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="textbox">
          <h1 className="signup_greet">
            간단한 회원 가입을 <br /> 진행해주세요
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="form" autoComplete="off">
          {renderInput(state)}
          <button
            className="submit"
            onClick={() => handlePost}
            disabled={handleBtnAble()}
          >
            가입하기
          </button>
        </form>
        <Link to={"/login"} className="back">
          이미 아이디가 있으신가요?
        </Link>
      </div>
    </div>
  );
};

export default Signup;
