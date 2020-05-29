import React from "react";
interface valueProps {
  email: string;
  password: string;
  onChange: any;
}

export const Input = ({ email, password, onChange }: valueProps) => {
  return (
    <div className="input">
      <div>
        <label>이메일</label>
        <input
          className="signin_input"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="gildong123@gmail.com"
        />
      </div>
      <div>
        <label className="password_label">비밀번호</label>
        <input
          className="signin_input"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호"
          maxLength={15}
          minLength={8}
        />
      </div>
    </div>
  );
};

export const validateInput = (password: string) => {
  let vali_error = "";

  // . check validate : password
  //* 길이 제한 8~15
  if (password === "") {
    vali_error = "비밀번호를 입력해주세요.";
  }
  if (password.length < 8 || password.length > 15) {
    vali_error = "비밀번호는 8자에서 15자 사이입니다.";
  }

  return {
    vali_error,
  };
};
