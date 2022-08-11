import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

function DiaryEditor({ isEdit, originData }) {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const contentRef = useRef();
  const navigate = useNavigate();

  function handleClickEmote(emotion) {
    setEmotion(emotion);
  }

  function handleSubmit() {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(isEdit ? "일기를 수정할까요?" : "새 일기를 작성할까요?")
    ) {
      if (isEdit) {
        // 수정중
        onEdit(originData.id, date, content, emotion);
        alert("일기를 수정했어요.");
      } else {
        // 생성중
        onCreate(date, content, emotion);
        alert("새 일기를 작성했어요.");
      }
    }
    navigate("/", { replace: true });
  }

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(originData.date)));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton
            text="< 뒤로가기"
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => {
              return (
                <EmotionItem
                  key={it.emotion_id}
                  {...it}
                  onClick={handleClickEmote}
                  isSelected={it.emotion_id === emotion}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box class_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text="취소하기"
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton text="저장하기" type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
