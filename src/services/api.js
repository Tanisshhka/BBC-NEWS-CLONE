import axios from 'axios';

// Using GNews API - get a free key at https://gnews.io
// Fallback to newsdata.io or a mock if no key is set
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';

const BASE_URL = 'https://gnews.io/api/v4';

const client = axios.create({ baseURL: BASE_URL });

const categoryMap = {
  home: 'general',
  world: 'world',
  business: 'business',
  technology: 'technology',
  sports: 'sports',
  entertainment: 'entertainment',
  science: 'science',
  health: 'health',
};

export const fetchTopHeadlines = async (category = 'general', page = 1) => {
  const mapped = categoryMap[category] || 'general';
  const { data } = await client.get('/top-headlines', {
    params: {
      category: mapped,
      lang: 'en',
      country: 'gb',
      max: 10,
      page,
      token: API_KEY,
    },
  });
  return data;
};

export const searchNews = async (query, page = 1) => {
  const { data } = await client.get('/search', {
    params: {
      q: query,
      lang: 'en',
      max: 10,
      page,
      token: API_KEY,
    },
  });
  return data;
};
