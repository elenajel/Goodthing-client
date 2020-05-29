import React from "react";
import useItems from "../hooks/useItems";
import Item from "../common/item";

const ListComponent: React.SFC<any> = ({
  items,
  location = "main",
  isEditable,
  handleClick,
  handleEdit,
}: any) => {
  const { items_monthly } = useItems();

  const renderList = (items: any, location?: string) => (
    <ul className={`${location}_list`}>
      {items.map((item: any) => (
        <Item
          key={item.id}
          item={item}
          location={location}
          isEditable={isEditable}
          handleEdit={handleEdit && handleEdit}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );

  const renderEmptyList = () => {
    return (
      <ul className={`${location}_list`}>
        <div className={`${location}_empty_list`}>
          앗 ! 이번 달은 아직 고민할 제품이 없어요.
          <br />
          좌측에 <h1 className="accent">입력하기 버튼</h1>을 사용해 제품을
          추가해보세요
        </div>
      </ul>
    );
  };
  return (
    <React.Fragment>
      {items_monthly.length === 0 && location === "main"
        ? renderEmptyList()
        : renderList(items, location)}
    </React.Fragment>
  );
};

export default ListComponent;
