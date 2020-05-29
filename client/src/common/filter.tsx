import React from "react";
import asc from "../img/1.svg";
import desc from "../img/2.svg";
export default function Filter({ onChange, orderBy, location = "main" }: any) {
  const handleOrder = () => {
    orderBy[1] === "asc"
      ? onChange([orderBy[0], "desc"])
      : onChange([orderBy[0], "asc"]);
  };

  const handlerIcon = () => {
    if (orderBy[1] === "asc") {
      return asc;
    } else {
      return desc;
    }
  };

  return (
    <div className={`${location}_filter_box`}>
      <select
        onChange={({ target: { value } }) => onChange([value, "asc"])}
        className={`${location}_filter`}
      >
        <option value="latest">최신순</option>
        <option value="price">가격순</option>
      </select>
      <button
        onClick={handleOrder}
        className={`${location}_filter_order_btn`}
        style={{ background: `url(${handlerIcon()}) no-repeat` }}
      ></button>
    </div>
  );
}
