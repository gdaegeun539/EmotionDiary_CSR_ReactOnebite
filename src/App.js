import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useReducer, useRef } from "react";
import "./App.css";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의일기_1번",
    date: 1659700954002,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의일기_2번",
    date: 1659701038769,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의일기_3번",
    date: 1659701052799,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의일기_4번",
    date: 1659701072618,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의일기_5번",
    date: 1659701088205,
  },
];

function App() {
  // 지금 더미데이터 들어갔음
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(data.length + 1);

  // Create
  function onCreate(date, content, emotion) {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  }
  // Remove
  function onRemove(targetId) {
    dispatch({ type: "REMOVE", targetId });
  }
  // Edit
  function onEdit(targetId, date, content, emotion) {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

function reducer(state, action) {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      // === newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => {
        return it.id === action.data.id ? { ...action.data } : it;
      });
      break;
    }

    default:
      return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export default App;

/**
   * --App 함수 내부에서 테스트
   * png 파일 임포트가 정상적이지 않은 경우에만 env 환경변수를 수정
   * const env = process.env;
   * env.PUBLIC_URL = env.PUBLIC_URL || "";
   * <img src={process.env.PUBLIC_URL + "/assets/emotion1.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/emotion2.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/emotion3.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/emotion4.png"} />
        <img src={process.env.PUBLIC_URL + "/assets/emotion5.png"} />
   */
