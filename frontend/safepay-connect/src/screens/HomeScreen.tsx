import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: any) => {
  const features = [
    {
      id: 'scam-detector',
      title: 'AI Scam Detector',
      icon: 'shield-checkmark',
      color: '#FF6B6B',
      description: 'Scan messages for fraud',
      screen: 'ScamDetector'
    },
    {
      id: 'transaction-verifier',
      title: 'Transaction Verifier',
      icon: 'lock-closed',
      color: '#4ECDC4',
      description: 'Verify payments securely',
      screen: 'TransactionVerifier'
    },
    {
      id: 'voice-support',
      title: 'Voice Support',
      icon: 'mic',
      color: '#45B7D1',
      description: 'Multi-language assistance',
      screen: 'VoiceSupport'
    },
    {
      id: 'safe-route',
      title: 'SafeRoute Finance',
      icon: 'map',
      color: '#96CEB4',
      description: 'Find safe ATMs nearby',
      screen: 'SafeRoute'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SafePay Connect</Text>
        <Text style={styles.subtitle}>Your Financial Safety Partner</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.card, { backgroundColor: feature.color + '20' }]}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
                <Ionicons name={feature.icon as any} size={28} color="white" />
              </View>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Safety Stats</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Scams Blocked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>R 5,400</Text>
              <Text style={styles.statLabel}>Money Saved</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 10,
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#636E72',
  },
  statsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
});

export default HomeScreen;