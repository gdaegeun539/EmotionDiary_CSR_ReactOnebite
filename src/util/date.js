/**
 * 로케일에 맞게 날짜를 yyyy-mm-dd 스트링으로 변환해주는 함수
 * @param {*} date
 * @returns "yyyy-mm-dd"
 */
export function getStringDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}
