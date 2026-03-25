import axios from 'axios';
import { MOCK_ARTICLES } from './mockData';

// Using GNews API - get a free key at https://gnews.io
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';
const IS_PLACEHOLDER = !API_KEY || API_KEY === 'your_api_key_here';

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

// Helper to filter/shuffle mock data to look "dynamic"
const getMockData = (category, query) => {
  let filtered = [...MOCK_ARTICLES];
  if (query) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(query.toLowerCase()) || 
      a.description.toLowerCase().includes(query.toLowerCase())
    );
  } else if (category && category !== 'general' && category !== 'home') {
    // In a real mock we'd have category fields, for now we just shuffle/slice
    filtered = [...filtered].sort(() => 0.5 - Math.random());
  }
  return {
    totalArticles: filtered.length,
    articles: filtered
  };
};

export const fetchTopHeadlines = async (category = 'general', page = 1) => {
  if (IS_PLACEHOLDER) return getMockData(category);

  try {
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
  } catch (error) {
    console.warn("API Fetch failed, using mock data fallback:", error.message);
    return getMockData(category);
  }
};

export const searchNews = async (query, page = 1) => {
  if (IS_PLACEHOLDER) return getMockData(null, query);

  try {
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
  } catch (error) {
    console.warn("API Search failed, using mock data fallback:", error.message);
    return getMockData(null, query);
  }
};

