import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NewsList from '../components/NewsList';
import SkeletonLoader from '../components/SkeletonLoader';
import { fetchPopular, searchNews, type Article } from '../services/newsApi';

export default function PopularScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetchPopular();
    setArticles(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, []);

  const onSearch = async (q: string) => {
    setLoading(true);
    const data = await searchNews(q);
    setArticles(data);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onSearch={onSearch} />
      <View style={styles.mainContent}>
        {loading ? <SkeletonLoader /> : (
          <NewsList articles={articles} refreshing={refreshing} onRefresh={onRefresh} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  mainContent: { flex: 1, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8 },
});
