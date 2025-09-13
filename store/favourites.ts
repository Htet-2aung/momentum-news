import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Article } from '../services/newsApi';

const KEY = 'favorites_v1';

export const getFavorites = async (): Promise<Article[]> => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
};

export const toggleFavorite = async (article: Article): Promise<Article[]> => {
  const current = await getFavorites();
  const exists = current.find(a => a.url === article.url);
  let next: Article[];
  if (exists) next = current.filter(a => a.url !== article.url);
  else next = [article, ...current];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
};

export const isFavorite = async (url: string): Promise<boolean> => {
  const current = await getFavorites();
  return current.some(a => a.url === url);
};


export const addFavorite = async (article: Article): Promise<Article[]> => {
  const current = await getFavorites();
  const exists = current.find(a => a.url === article.url);
  let next: Article[];
  if (exists) next = current.filter(a => a.url !== article.url);
  else next = [article, ...current];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
};
    