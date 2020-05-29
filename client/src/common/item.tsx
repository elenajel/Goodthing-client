import React from "react";
import onFormat from "../services/util/onFormat";
interface Props {
  location?: string;
  isEditable: boolean;
  handleEdit?: Function;
  handleClick: Function;
  item: any;
}
const Item: React.SFC<Props> = ({
  item,
  location,
  isEditable,
  handleClick,
  handleEdit,
}) => {
  const renderDeletableItem = (item: any) => {
    let style: any = {};

    if (item.isSelected && isEditable) {
      // style.boxShadow = "0 0 0 1.5px #F8F8F8 inset";
      style.boxShadow = "0 0 0 2.5px #ff7272 inset";
      style.backgroundColor = "#fff";
    }
    if (isEditable) {
      style.cursor = "pointer";
    }
    return style;
  };

  const handleBtnClickEvent = (item?: any) => {
    isEditable && handleEdit && handleEdit(item.id);
    isEditable === false && handleClick(item);
    isEditable === undefined && handleClick(item);
  };
  const handlePurchasedItemStlye = () => {
    return item.purchased === true ? { textDecoration: "line-through" } : {};
  };

  const sliceLongWord = (string: string, max: number) => {
    if (location === "main") {
      if (string === item.memo) {
        return string.length > max
          ? string.substr(0, max - 1) + " ..."
          : string;
      }
      return string.length > max ? string.substr(0, max) + " ..." : string;
    }

    if (location === "listpage") {
      max *= 1.5;
      if (string === item.memo) {
        return string.length > max
          ? string.substr(0, max * 2 - 3) + "..."
          : string;
      }
      return string.length > max ? string.substr(0, max - 1) + "..." : string;
    }
    return string;
  };
  const renderImg = (img?: string) => {
    if (img) {
      let style: any = {};
      style.background = `url('${img}') no-repeat`;
      style.backgroundSize = "100% 100%";
      return style;
    }
  };

  return (
    <li
      className={`${location}_list_item`}
      onClick={() => handleBtnClickEvent(item)}
      style={renderDeletableItem(item)}
    >
      <div
        className={`${location}_list_image`}
        style={renderImg(item.image_file)}
        // style={{
        //   background: `url('https://asmallgoodthing.s3.ap-northeast-2.amazonaws.com/image/1590635473284.png') no-repeat`,
        //   backgroundSize: "100% 100%",
        // }}
      ></div>
      <h1 className={`${location}_list_name`}>
        {sliceLongWord(item.item_name, 8)}
      </h1>
      {item.memo && (
        <h2 className={`${location}_list_memo`}>
          {sliceLongWord(item.memo, 20)}
        </h2>
      )}
      <h2
        className={`${location}_list_price`}
        style={handlePurchasedItemStlye()}
      >
        {`+${onFormat(item.item_price)}원`}
      </h2>
    </li>
  );
};

export default Item;
