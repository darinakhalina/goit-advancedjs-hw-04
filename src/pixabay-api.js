import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44415141-73aa0910a2180b32b461f4de8';

export async function serviceImages(searchQuery, pageSize, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: pageSize,
    page,
  });

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);
  return response.data;
}
