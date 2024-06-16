import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44415141-73aa0910a2180b32b461f4de8';

export async function searchImages(searchInputValue, page, pageSize) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: searchInputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageSize,
      page,
    },
  });
  return response.data;
}
