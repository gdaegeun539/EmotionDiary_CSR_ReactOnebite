import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

function DiaryItem({ id, emotion, content, date }) {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  function goDetail() {
    navigate(`/diary/${id}`);
  }
  function goEdit() {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
        onClick={goDetail}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text="수정하기" onClick={goEdit} />
      </div>
    </div>
  );
}

export default DiaryItem;
