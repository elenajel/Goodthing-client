import React, { useState } from "react";
import axios from "axios";
import { Input } from "../common/input";
import useItems from "../hooks/useItems";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import onFormat from "../services/util/onFormat";

export const newDate = (date: Date) => {
  //* yyyy-mm-dd
  let year: number = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month >= 10 ? month : "0" + month;
  let day: any = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
};
const initialState = {
  item_name: "",
  item_price: "",
  memo: "",
  link: "",
  purchased: false,
  date: new Date(),
  worry: "",
};

export const AddItem = ({ user_id, request }: any) => {
  const [state, setState] = useState(initialState);
  const { item_name, item_price, memo, link, purchased, worry } = state;
  const { getMonthlyItem, items_monthly } = useItems();
  const [content, setContent] = useState("");

  // * img 업로드 관련
  const handleImg = (e: any) => {
    setContent(e.target.files[0]);
  };

  const handleUpload = async (e: any, item_id: number) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_file", content);
    const url: string = `http://18.217.232.233:8080/image?item_id=${item_id}`;
    try {
      let res = await axios.post(url, formData);
      console.log(res);
      if (res.status === 200) {
      }
    } catch (res) {
    } finally {
      request(user_id, false);
    }
  };

  const handleChange = ({ currentTarget }: any) => {
    const { value, name } = currentTarget;
    if (name === "item_price") {
      setState({
        ...state,
        [name]: onFormat(Number(value.replace(/[^\.0-9]/g, ""))),
      });
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  //! util- 1000단위 , 입력 , 보낼때는 , 지워서 보내기
  const validateItem = (item_name: string, item_price: string) => {
    let vali_error = "";
    if (item_name === "") {
      vali_error = "제품명을 입력해주세요";
    }
    if (item_price === "") {
      vali_error = "가격을 입력해주세요";
    }
    return { vali_error };
  };

  const toRealNum = (str: any) => {
    return Number(str.replace(/,/gi, ""));
  };

  const handleAddItem = async (e: any) => {
    e.preventDefault();
    const { vali_error } = validateItem(state.item_name, state.item_price);
    if (vali_error === "") {
      //* 아이템 정보 전송

      let data = {
        user_id,
        item_name,
        item_price: toRealNum(state.item_price),
        memo,
        link,
        purchased,
        worry: Number(worry),
        date: newDate(state.date),
      };
      let opt = {
        headers: { "content-type": "application/json" },
      };
      let url = "http://18.217.232.233:8080/item";
      try {
        const res = await axios.post(url, data, opt);
        if (res.status === 201) {
          //! 이미지 전송
          if (content !== "" && content) {
            handleUpload(e, res.data.id);
          }
          setState({
            ...initialState,
          });

          if (
            data.date.slice(5, 7) === String("0" + (new Date().getMonth() + 1))
          ) {
            getMonthlyItem([...items_monthly, res.data]);
          }
        }
      } catch ({ response: { status } }) {
        if (status === 409) {
          alert("이미 존재하는 아이템입니다.");
          //history.replace("/home");
        }
      }
    }
  };
  const renderInput = (state: any) => {
    let renderArr = [];
    for (let key in state) {
      if (
        key === "item_name" ||
        key === "memo" ||
        key === "item_price" ||
        key === "link" ||
        key === "worry"
      ) {
        renderArr.push(
          <Input
            name={key}
            key={`Add_item_${key}`}
            value={state[key]}
            location="addItem"
            onChange={handleChange}
          />,
        );
      }
    }
    return renderArr;
  };

  const dateChange = (date: any) => {
    setState({
      ...state,
      date: date,
    });
  };
  //! view 관련
  const [view, setView] = useState(false);
  const handleView = () => {
    if (view === false) {
      setView(true);
    } else {
      setView(false);
    }
  };
  const viewAddItem = () => {
    return (
      <form
        className="addItem"
        autoComplete="off"
        encType="multipart/form-data"
        onSubmit={handleAddItem}
      >
        <div className="innerBox">
          {renderInput(state)}
          <label>날짜</label>
          <DatePicker selected={state.date} onChange={dateChange} />
        </div>
        <button onClick={handleView}>돌아가기</button>
        <input type="file" name="imgFile" onChange={handleImg} />
        <button type="submit" className="addItem_button">
          추가
        </button>
      </form>
    );
  };
  const viewAddButton = () => {
    return (
      <button className="addItem_Click" onClick={handleView}>
        입력하기
      </button>
    );
  };
  return <>{view === false ? viewAddButton() : viewAddItem()}</>;
};
