import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props { onSearch: (q: string) => void; }
export default function Header({ onSearch }: Props) {
  const [q, setQ] = useState('');
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Momentum News</Text>
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search articles..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={q}
          onChangeText={setQ}
          onSubmitEditing={() => onSearch(q)}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111827' },
  searchSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 999, marginTop: 12 },
  searchIcon: { padding: 10 },
  searchInput: { flex: 1, paddingVertical: 10, paddingRight: 10, color: '#111827', fontSize: 16 },
});