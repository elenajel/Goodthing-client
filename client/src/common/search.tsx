import React from "react";

interface searchProps {
  state: {
    value: string;
    multiSelectArray?: any;
    isEditable?: boolean;
    curPage?: number;
    pageSize?: number;
  };
  onChange: Function;
  location?: string;
}
const Search = ({ state, onChange, location = "main" }: searchProps) => {
  return (
    <input
      type="text"
      className={`${location}_search`}
      onChange={({ target: { value } }) =>
        onChange({ ...state, value, curPage: 1 })
      }
      placeholder="검색"
    />
  );
};
export default Search;
