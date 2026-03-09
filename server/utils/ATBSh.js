export default function ATBSh(password) {
  const list = [];
  for (let char of password) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      list.push(String.fromCharCode(155 - code));
    } else if (code >= 97 && code <= 122) {
      list.push(String.fromCharCode(219 - code));
    } else {
      list.push(String.fromCharCode(code));
    }
  }
  const result = list.join("");
  return result;
}
