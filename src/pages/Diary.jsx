import { useParams } from "react-router-dom";

function Diary() {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <h1>Diary Running</h1>
      <p>일기상세입니다.</p>
    </div>
  );
}

export default Diary;
