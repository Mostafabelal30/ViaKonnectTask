import axios from 'axios';
import Config from 'react-native-config';
import { Article } from '../types/news';

export const fetchNews = async (): Promise<Article[]> => {
  const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${Config.NEWS_API_KEY}`);
  return res.data.articles;
};
