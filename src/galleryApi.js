import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'wvL1FWdr_UouvBVkti9rZ763wmBm6XkdICd1Oxg2ZCU';

export const fetchGallery = async (query, page, limit) => {
  const speedScroll = 'landscape';
  const response = axios.get('', {
    params: {
      query: query,
      page: page,
      per_page: limit,
      client_id: API_KEY,
      orientation: speedScroll,
    },
  });

  return (await response).data.results;
};
