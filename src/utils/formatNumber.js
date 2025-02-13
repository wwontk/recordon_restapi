export const formatCompanyNumber = (number) => {
  // const numStr = String(number); // 숫자를 문자열로 변환

  switch (number.length) {
    case 7:
      return number.replace(/(\d{3})(\d{4})/, "$1-$2"); // 3-4
    case 8:
      return number.replace(/(\d{4})(\d{4})/, "$1-$2"); // 4-4
    case 9:
      return number.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3"); // 2-3-4
    case 10:
      return number.startsWith("02")
        ? number.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3") // 02로 시작하면 2-4-4
        : number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // 그 외 3-3-4
    case 11:
      return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 3-4-4
    default:
      return number;
  }
};

export const formatbusinessNumber = (number) => {
  if (!number) return "";
  return number.length === 10
    ? number.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3") // 10자리
    : number.replace(/(\d{3})(\d{2})(\d{6})/, "$1-$2-$3"); // 11자리
};
