import axios from 'axios';

export const fetchImages = async (topic, currentPage) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      client_id: 'YcxlRspkhN8jxkIwedxhJPCTQsoC8f57HtjeLCsgiS4',
      query: topic,
      per_page: 12,
      page: currentPage,
      orientation: 'landscape',
    },
  });
  return response.data.results;
}

