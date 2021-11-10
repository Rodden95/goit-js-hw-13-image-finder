export default function fetchAllApi() {
  let key = '563492ad6f91700001000001d83c2ebc8a0d47d8b28a359bf852bff3';
  return fetch(`https://api.pexels.com/v1/search?id=${key}`).then(res => res.json())
}
