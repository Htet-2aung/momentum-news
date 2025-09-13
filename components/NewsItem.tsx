import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import type { Article } from '../services/newsApi';
import { Ionicons } from '@expo/vector-icons';
import { isFavorite, addFavorite } from '../store/favourites';

export default function NewsItem({ article }: { article: Article }) {
  const [fav, setFav] = useState(false);
  useEffect(() => {
    isFavorite(article.url).then(setFav);
  }, [article.url]);

  const handlePress = () => { if (article.url && article.url !== '#') Linking.openURL(article.url); };
  const handleFav = async () => { const next = await toggleFavorite(article); setFav(next.some(a => a.url === article.url)); };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: article.urlToImage! }} style={styles.cardImage} />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardSource}>{article.source?.name?.toUpperCase?.() || 'SOURCE'}</Text>
        <Text style={styles.cardTitle}>{article.title}</Text>
        {!!article.description && (
          <Text style={styles.cardDescription} numberOfLines={3}>{article.description}</Text>
        )}
        <View style={styles.row}>
          <TouchableOpacity onPress={handlePress} style={styles.readBtn}>
            <Text style={styles.readBtnText}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFav} style={styles.iconBtn}>
            <Ionicons name={fav ? 'bookmark' : 'bookmark-outline'} size={22} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 3, overflow: 'hidden' },
  cardImage: { height: 200, width: '100%', backgroundColor: '#E5E7EB' },
  cardContent: { padding: 16 },
  cardSource: { color: '#4F46E5', fontSize: 12, fontWeight: '700', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' },
  readBtn: { backgroundColor: '#4F46E5', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  readBtnText: { color: '#FFF', fontWeight: '600' },
  iconBtn: { padding: 8 },
});