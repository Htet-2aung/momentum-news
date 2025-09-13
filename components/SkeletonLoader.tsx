import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function SkeletonLoader() {
  return (
    <View>
      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonLineShort} />
            <View style={styles.skeletonLineLong} />
            <View style={styles.skeletonLineMedium} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  skeletonCard: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 16 },
  skeletonImage: { height: 200, backgroundColor: '#E5E7EB', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  skeletonTextContainer: { padding: 16 },
  skeletonLineShort: { height: 20, backgroundColor: '#E5E7EB', borderRadius: 4, width: '40%', marginBottom: 12 },
  skeletonLineLong: { height: 14, backgroundColor: '#E5E7EB', borderRadius: 4, marginBottom: 8 },
  skeletonLineMedium: { height: 14, backgroundColor: '#E5E7EB', borderRadius: 4, width: '90%' },
});
