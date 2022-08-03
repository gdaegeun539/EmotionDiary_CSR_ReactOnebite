import { Link } from "react-router-dom";

/**
 * SPA, CSR 테스트용 파일입니다.
 */

function RouteTest() {
  return (
    <>
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/diary"}>DIARY</Link>
      <br />
      <Link to={"/new"}>NEW</Link>
      <br />
      <Link to={"/edit"}>EDIT</Link>
    </>
  );
}

export default RouteTest;
