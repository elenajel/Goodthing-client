import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import useItems from "../hooks/useItems";
import onFormat from "../services/util/onFormat";
import DatePicker from "react-datepicker";
import { newDate } from "./add_Item";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");

const ItemModal = ({ item, onClose, state, location = "main" }: any) => {
  //let [currentItem, setCurrentItem] = useState(state.curItem);
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    deleteItem,
    deleteList,
    purchaseItem,
    purchaseList,
    items_total,
  } = useItems();

  //* 모달 설정
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    onClose({ ...state, curItem: {} });
    setIsOpen(false);
  };
  useEffect(() => {
    Object.keys(item).length > 0 && openModal();
  }, [state]);

  //* 모달 버튼 - purchased
  const onPurchased = () => {
    if (item.purchased === true) {
      onClose({ ...state, curItem: { ...item, purchased: false } });
    } else {
      onClose({ ...state, curItem: { ...item, purchased: true } });
    }
  };

  const handlePurchased = async () => {
    onPurchased();
    let data = { ...item };
    purchaseItem(item.id);
    let opt = { headers: { "content-type": "application/json" } };
    let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
    try {
      const res = await axios.patch(url, data, opt);
      if (res.status === 201) {
        await purchaseList(item.id);
        let { viewDateOption } = state;
        let cur = items_total.map((curItem: any) => {});
      }
    } catch ({ response: { status } }) {
      if (status === 404) {
        alert("해당 아이템이 없습니다.");
      }
    }
  };

  //* 모달 버튼 - 구매 하기
  const handleLink = () => {
    if (item.link.length === 0) {
      alert("링크가 없습니다.");
    } else {
      return window.open(item.link, "_blank");
    }
  };

  // * 삭제하기 : 상태변화
  const handleDelete = async () => {
    if (window.confirm("해당 아이템을 삭제하시겠습니까?")) {
      let url = `http://18.217.232.233:8080/item?item_id=${item.id}`;
      try {
        const res = await axios.delete(url, {
          headers: { "content-type": "application/json" },
          data: { user_id: item.user_id, image_file: item.image_file },
        });
        if (res.status === 202) {
          if (location === "main") {
            deleteItem(item.id);
            onClose({ ...state, curItem: {} });
          } else {
            await deleteList(item.id);
            let { viewDateOption } = state;
            let cur = items_total.filter(
              (curItem: any) =>
                curItem.date.startsWith(viewDateOption) &&
                curItem.id !== item.id,
            );
            await onClose({ ...state, curItem: {}, curItems: cur });
          }
          setIsOpen(false);
        }
      } catch ({ response: { status } }) {
        if (status === 404) {
          alert("해당 아이템이 없습니다.");
        }
      }
    }
  };
  // todo 수정하기 : 어려울듯 .. 제일 마지막에
  const initialState = {
    item_name: "",
    item_price: "",
    memo: "",
    link: "",
    purchased: false,
    date: new Date(),
    image_file: "",
    worry: "",
  };
  const curState = { ...item };

  const [editState, setEditState] = useState(initialState);
  const [editMode, seteditMode] = useState(false);

  const handleChange = ({ currentTarget }: any) => {
    const { name, value } = currentTarget;
    if (name === "item_price") {
      setEditState({
        ...initialState,
        [name]: onFormat(Number(value.replace(/[^\.0-9]/g, ""))),
      });
    } else {
      console.log(initialState);
      setEditState({ ...initialState, [name]: value });
    }
  };
  const dateChange = (date: any) => {
    onClose({
      ...editState,
      date: date,
    });
  };
  const handleEdit = () => {
    if (editMode === false) {
      seteditMode(true);
    } else {
      //! 내용 종합해서 patch 요청 보내기
      const data = { ...editState };
      const url = seteditMode(false);
    }
  };
  const isPurchased = () => {
    if (curState.purchased === true) {
      return <p>네가 좋음 나도 좋아</p>;
    } else {
      return <p>좋았어 아꼈어!</p>;
    }
  };

  const editItem_name = () => {
    return (
      <input
        placeholder={curState.item_name}
        type="text"
        onChange={handleChange}
      />
    );
  };
  const viewItem_name = () => {
    return <h2>{curState.item_name}</h2>;
  };
  const viewPurchased = () => {
    return <>{isPurchased()}</>;
  };
  const editImage = () => {
    return <input type="file" />;
  };
  const viewImage = () => {
    return (
      <img
        style={{ width: "300px", height: "300px" }}
        src={
          curState.image_file === null && !curState.image_file
            ? ""
            : curState.image_file
        }
      />
    );
  };
  const editMemo = () => {
    return (
      <input type="text" placeholder={curState.memo} onChange={handleChange} />
    );
  };
  const viewMemo = () => {
    return <p>{curState.memo}</p>;
  };
  const viewWorry = () => {
    return <p>{curState.worry}</p>;
  };
  const editWorry = () => {
    return (
      <input
        type="number"
        placeholder={curState.worry}
        onChange={handleChange}
      />
    );
  };
  const viewItem_price = () => {
    return <p>{`${onFormat(Number(curState.item_price))}원`}</p>;
  };
  const editItem_price = () => {
    return (
      <input
        type="number"
        placeholder={`${onFormat(Number(curState.item_price))}원`}
        onChange={handleChange}
      />
    );
  };
  const viewDate = () => {
    return <p>{item.date}</p>;
  };
  const editDate = () => {
    return <DatePicker selected={new Date()} onChange={dateChange} />;
  };
  const editButton = () => {
    return <button onClick={handleEdit}>수정하기</button>;
  };
  const editCompleteButton = () => {
    return <button onClick={handleEdit}>수정완료</button>;
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onChange={handleChange}>
          <>{editMode === true ? editItem_name() : viewItem_name()}</>
          <>{editMode === true ? editImage() : viewImage()}</>
          <>{viewPurchased()}</>
          <>
            <h2>고민하는 이유</h2>
            {editMode === true ? editMemo() : viewMemo()}
          </>
          <>
            <h2>고민의 정도</h2>
            {editMode === true ? editWorry() : viewWorry()}
          </>
          <>
            <h2>가격</h2>
            {editMode === true ? editItem_price() : viewItem_price()}
          </>
          <>
            <h2>등록일자</h2>
            {editMode === true ? editDate() : viewDate()}
          </>
        </form>
        <button
          onClick={() => {
            handlePurchased();
          }}
        >
          구매완료
        </button>
        <button onClick={handleLink}>구매하기</button>
        {/* <button onClick={handleEdit}>수정하기</button> */}
        <button onClick={handleDelete}>삭제하기</button>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
};
export default ItemModal;
