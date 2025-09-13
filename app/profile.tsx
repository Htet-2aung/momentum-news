import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NewsItem from '../components/NewsItem';
import type { Article } from '../services/newsApi';
import { getFavorites } from '../store/favourites';
export default function ProfileScreen() {
  const [favorites, setFavorites] = useState<Article[]>([]);

  useEffect(() => { (async () => setFavorites(await getFavorites()))(); }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://i.pravatar.cc/160?img=12' }} style={styles.avatar} />
        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.email}>you@example.com</Text>
       
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Edit Profile</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}><Text style={styles.buttonSecondaryText}>Settings</Text></TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>No favorites yet. Tap the bookmark on an article to save it.</Text>
      ) : (
        <FlatList data={favorites} keyExtractor={(it, i) => `${it.url}-${i}`} renderItem={({ item }) => <NewsItem article={item} />} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { alignItems: 'center', paddingVertical: 24, backgroundColor: '#FFF', marginBottom: 12 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#111827' },
  email: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  button: { backgroundColor: '#4F46E5', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  buttonText: { color: '#FFF', fontWeight: '600' },
  buttonSecondary: { backgroundColor: '#E5E7EB', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  buttonSecondaryText: { color: '#111827', fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '700', paddingHorizontal: 16, marginTop: 12, marginBottom: 8, color: '#111827' },
  empty: { paddingHorizontal: 16, color: '#6B7280' },
});
