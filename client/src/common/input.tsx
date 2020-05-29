import React from "react";
import { itemsInit } from "../modules/items";

interface inputProps {
  name: string;
  value: string | number;
  onChange: any;
  location: string;
}
export const Input = ({
  name,
  value,
  onChange,
  location = "signup",
}: inputProps) => {
  const renderLable = (name: string) => {
    if (name === "email") return "이메일";
    if (name === "password") return "비밀번호";
    if (name === "user_name") return "이름";
    if (name === "passwordCheck") return "비밀번호";
    if (name === "item_price") return "가격";
    if (name === "memo") return "고민하는 이유";
    if (name === "link") return "링크";
    if (name === "item_name") return "제품명";
    if (name === "worry") return "고민하는 정도";
  };
  const renderPlaceHolder = (name: string) => {
    if (name === "email") return "gildong123@mail.com";
    if (name === "password") return "단순한 비밀번호는 피해주세요";
    if (name === "user_name") return "홍길동";
    if (name === "passwordCheck") return "비밀번호를 확인해주세요";
    if (name === "item_price") return "가격";
    if (name === "memo") return "고민하는 이유";
    if (name === "link") return "링크";
    if (name === "item_name") return "제품명";
    if (name === "worry") return "0~5를 입력해주세요";
  };

  const renderType = (name: string) => {
    if (name === "passwordCheck") return "password";
    if (name === "worry") return "number";
    if (name === "link") return "url";
    else return name;
  };
  const checkLabel = (name: string) => {
    if (name === "password") {
      return "password_label";
    }
    if (name === "passwordCheck") {
      return "passwordC_label";
    }
    if (name === "memo") {
      return "memo";
    }
    if (name === "link") {
      return "link";
    }
    if (name === "worry") {
      return "worry";
    }
  };
  const handleLength = (name: string) => {
    if (name === "user_name") {
      return { maxLength: 10, minLength: 2 };
    }
    if (name === "password") {
      return { maxLength: 14, minLength: 8 };
    }
    if (name === "item_price") {
      return { maxLength: 15 };
    }
  };
  return (
    <div>
      <label htmlFor={name} className={checkLabel(name)}>
        {renderLable(name)}
      </label>
      <input
        className={`${location}_input`}
        type={
          location === "signup" || name === "worry" || name === "link"
            ? renderType(name)
            : "text"
        }
        name={name}
        onChange={onChange}
        value={value}
        placeholder={renderPlaceHolder(name)}
        {...handleLength(name)}
        autoCapitalize="off"
      />
    </div>
  );
};
