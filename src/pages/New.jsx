import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = "새 일기 쓰기";
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
}

export default New;
