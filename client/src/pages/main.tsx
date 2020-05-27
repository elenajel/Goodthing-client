import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import "./css/main.css";
import List from "../components/listComponent";
import useItems from "../hooks/useItems";
import useUserInfo from "../hooks/useAuth";
import Card from "../common/monthlySum";
import axios from "axios";
import Search from "../common/search";
import Filter from "../common/filter";
import util from "../services/util/index";
import { AddItem } from "../components/add_Item";

import { ItemModal } from "../components/item_modal";

const { onFormat, onSearch, onOrder, validUserId } = util;

interface Props extends RouteComponentProps {}

const Main: React.SFC<Props> = ({ history }) => {
  const {
    getMonthlyItem,
    items_monthly,
    monthlySaved,
    SumAllMonthly,
    itemStoreInit,
  } = useItems();
  const { user_id, user_name, onLogout, onLogin } = useUserInfo();
  const [state, setState] = useState({
    value: "",
    curItem: {}, //item 하나의 객체,
  });
  const handleItemClick = ({ id }: any) => {
    let curItem = items_monthly.filter((item: any) => item.id === id);
    setState({ ...state, curItem });
  };
  const [orderBy, setOrderBy] = useState(["latest", "asc"]);

  useEffect(() => {
    if (user_id === 0) {
      console.log("뭐지?");
      validUserId(vaildUserSucess, validUserFailed);
    } else {
      console.log("음..?");
      requestMonthlyItem(user_id);
    }
  }, []);

  useEffect(() => {
    user_id !== 0 && SumAllMonthly();
  }, [items_monthly]);

  useEffect(() => {
    user_id > 0 && user_id !== undefined && requestMonthlyItem(user_id);
  }, [user_id]);

  const vaildUserSucess = (res: any) => onLogin(res.data);
  const validUserFailed = () => history.replace("/login");

  const requestMonthlyItem = async (user_id: number) => {
    let url = `http://18.217.232.233:8080/monthly_list?user_id=${user_id}`;
    try {
      let res = await axios.get(url);
      res.status === 201 && getMonthlyItem(res.data.monthly_list.items);
    } catch (err) {
      console.log(err);
    }
  };

  const renderGreet = () => (
    <div className="greet">
      <h1> 안녕하세요.</h1>
      <br />
      <h1> {user_name}님</h1>
      <h2>
        공수래 공수거. 빈손으로 와서 <br />
        빈손으로 가는거니까 끌리는건 구매하세요!
      </h2>
    </div>
  );
  const handleItemInput = () => {
    //!react dom 사용
    let target: any = document.querySelector(".addItem");
    let target2: any = document.querySelector(".addItem_Click");
    target.style.display = "block";
    target2.style.display = "none";
  };

  const handleLogOut = async () => {
    let url = `http://18.217.232.233:8080/logout`;
    let opt = {
      headers: { "content-type": "application/json" },
      withCredentials: true,
    };
    let res = await axios.post(url, { user_id }, opt);
    if (res.status === 200) {
      itemStoreInit();
      onLogout();
      history.replace("/signin");
    }
  };

  let filteredList = onOrder(onSearch(items_monthly, state.value), orderBy);
  return user_id === 0 ? (
    <div>아이디가 필요합니다</div>
  ) : (
    <div className="main_wrapper">
      <div className="main_grid">
        {renderGreet()}
        <div className="main_logout_box">
          <button onClick={handleLogOut} className="main_logout">
            로그아웃
          </button>
        </div>
        <Card sum={monthlySaved} user_name={user_name} onFormat={onFormat} />
        <List
          items={filteredList}
          onFormat={onFormat}
          handleClick={handleItemClick}
        />
        <button
          className="addItem_Click"
          style={{ display: "block" }}
          onClick={() => handleItemInput()}
        >
          입력하기
        </button>
        <div className="modal">
          <ItemModal item={/** 클릭한 것의 id */} />
        </div>
        <AddItem user_id={user_id} />
        <div className="filterZone">
          <Search onChange={setState} state={state} />
          <Filter onChange={setOrderBy} orderBy={orderBy} />
          <Link to="/listpage" className="main_link_listpage">
            리스트 전체보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
