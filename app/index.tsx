import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, View, StatusBar, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import SkeletonLoader from '../components/SkeletonLoader';
import NewsList from '../components/NewsList';
import { fetchTopByCategory, searchNews, type Article } from '../services/newsApi';



export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Top');
  const load = async (cat = activeCategory) => {
    setLoading(true);
    const data = await fetchTopByCategory(cat);
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [activeCategory]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [activeCategory]);

  const onSearch = async (q: string) => {
    try {
      setLoading(true);
      const data = await searchNews(q);
      setArticles(data);
    } catch (e: any) {
      Alert.alert('Search failed', e?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (

              
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header onSearch={onSearch} />
      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
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

