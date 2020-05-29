import React from "react";
type props = {
  sum: number;
  user_name: string;
  onFormat: any;
};

const monthlySum = ({ sum, user_name, onFormat }: props) => {
  const renderSumMessage = (
    str: TemplateStringsArray,
    sum: number,
  ): JSX.Element => {
    let text: string = "";
    if (sum >= 100000000) text = `지금 거짓으로 작성하셨쬬?`;
    else if (sum > 300000) text = `굉장한데요! ${user_name}님`;
    else if (sum > 200000) text = `대단한데요! ${user_name}님`;
    else if (sum > 100000) text = `좋아요! ${user_name}님`;
    else if (sum === 0) text = `천천히 시작해봐요 ${user_name}님`;
    return (
      <div className="main_sum_message_box">
        <h2 className="main_sum_message">{str[0]}</h2>
        <h1 className="main_sum_num">{`${onFormat(sum)}원`}</h1>
        <h2 className="main_sum_message">{`아꼈습니다. ${text}`}</h2>
      </div>
    );
  };
  return (
    <div className="main_sum">{renderSumMessage`이번달은 오늘까지${sum}`}</div>
  );
};

export default monthlySum;
