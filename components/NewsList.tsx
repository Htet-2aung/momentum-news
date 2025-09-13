import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import NewsItem from './NewsItem';
import type { Article } from '../services/newsApi';

interface Props { articles: Article[]; refreshing: boolean; onRefresh: () => void; }
export default function NewsList({ articles, refreshing, onRefresh }: Props) {
  return (
    <FlatList
      data={articles}
      keyExtractor={(item, index) => `${item.url}-${index}`}
      renderItem={({ item }) => <NewsItem article={item} />}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}