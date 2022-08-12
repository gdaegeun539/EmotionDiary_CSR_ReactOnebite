import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

function Edit() {
  const navigate = useNavigate();
  const [originData, setOriginData] = useState();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `${id}번 일기 수정하기`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => {
        return parseInt(it.id) === parseInt(id);
      });

      if (targetDiary) {
        // 일기가 존재하는 페이지
        setOriginData(targetDiary);
      } else {
        // 일기가 없는 페이지
        alert("잘못된 접근입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit;

/** SearchParams 및 쿼리 스트링 실습 백업 */
// {
//   const id = searchParams.get("id");
//   console.log(id);
//   const mode = searchParams.get("mode");
//   console.log("mode :>> ", mode);
//   const [searchParams, setSearchParams] = useSearchParams();
//   <button
//     onClick={() => {
//       setSearchParams({ key: "value" });
//     }}
//   >
//   쿼리 파라미터 교체 테스트
//   </button>
// }
