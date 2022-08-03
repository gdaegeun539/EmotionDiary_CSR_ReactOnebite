import { useNavigate, useSearchParams } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);
  const mode = searchParams.get("mode");
  console.log("mode :>> ", mode);

  return (
    <div>
      <h1>Edit Running</h1>
      <p>일기수정페이지입니다.</p>
      <button
        onClick={() => {
          setSearchParams({ key: "value" });
        }}
      >
        쿼리 파라미터 교체 테스트
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default Edit;
