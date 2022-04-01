export function randomString(length) {
  const possible = "ABCDEFGIKJKNKLBIELILNLA01234456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return result;
}
