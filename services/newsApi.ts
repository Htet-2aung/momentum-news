export interface Article {
  title: string;
  urlToImage: string | null;
  description: string | null;
  source: { name: string };
  url: string;
  publishedAt?: string;
}

// ⚠️ For development only. In production, hide the key behind your own backend.
const API_KEY = '98b3ab4956a54d9a924ac428e8ea5025';
const TOP_URL = 'https://newsapi.org/v2/top-headlines';
const EVERYTHING_URL = 'https://newsapi.org/v2/everything';

// Map our UI category to NewsAPI category
const mapCategory = (cat: string) => (cat.toLowerCase() === 'top' ? 'general' : cat.toLowerCase());

export const fetchTopByCategory = async (category: string): Promise<Article[]> => {
  // top-headlines requires a country OR sources. We'll use country=us here.
  const apiCategory = mapCategory(category);
  const url = `${TOP_URL}?country=us&category=${encodeURIComponent(apiCategory)}&pageSize=50&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.warn('NewsAPI error', res.status, text);
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a?.urlToImage && a?.title);
  } catch (e) {
    console.error('Failed to fetch news:', e);
    return [];
  }
};

export const fetchPopular = async (): Promise<Article[]> => {
  // everything endpoint supports sortBy=popularity
  const url = `${EVERYTHING_URL}?q=trending&language=en&sortBy=popularity&pageSize=50&apiKey=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.warn('NewsAPI error', res.status, text);
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a?.urlToImage && a?.title);
  } catch (e) {
    console.error('Failed to fetch news:', e);
    return [];
  }
};

export const searchNews = async (query: string): Promise<Article[]> => {
  if (!query?.trim()) return [];
  const url = `${EVERYTHING_URL}?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      console.warn('NewsAPI error', res.status, text);
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return (data.articles || []).filter((a: Article) => a?.urlToImage && a?.title);
  } catch (e) {
    console.error('Failed to search news:', e);
    return [];
  }
};
