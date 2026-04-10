export function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}