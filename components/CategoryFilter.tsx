import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface Props { activeCategory: string; setActiveCategory: (c: string) => void; }
const CATEGORIES = ['Top', 'World', 'Business', 'Tech', 'Sports'];

export default function CategoryFilter({ activeCategory, setActiveCategory }: Props) {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity key={c} onPress={() => setActiveCategory(c)} style={[styles.categoryButton, activeCategory === c && styles.activeCategoryButton]}>
            <Text style={[styles.categoryText, activeCategory === c && styles.activeCategoryText]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  categoryScrollView: { paddingVertical: 12, paddingHorizontal: 12 },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 16, marginHorizontal: 4, borderRadius: 20, backgroundColor: '#E5E7EB' },
  activeCategoryButton: { backgroundColor: '#4F46E5' },
  categoryText: { color: '#374151', fontWeight: '600' },
  activeCategoryText: { color: '#FFFFFF' },
});