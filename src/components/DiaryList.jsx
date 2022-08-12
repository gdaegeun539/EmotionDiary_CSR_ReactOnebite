import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  // react에서 생성해주면(setter등) 동일 ref를 보장해줌: memoization이 정상적으로 동작-controlmenu
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  function getProcessedDiaryList() {
    function compare(a, b) {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    function filterCallBack(item) {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else if (filter === "bad") {
        return parseInt(item.emotion) >= 4;
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList)); // call by ref 방지를 위해 json화 이후 파싱

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  }

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text="새 일기쓰기"
            type={"positive"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => {
        return <DiaryItem key={it.id} {...it} />;
      })}
    </div>
  );
}

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  useEffect(() => {
    console.log("Debug>>> ControlMenu 렌더링");
  });
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
