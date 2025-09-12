import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TrendingScamsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Financial', 'Social Media', 'Shopping', 'Investment'];

  const scamTrends = [
    {
      id: 1,
      title: 'WhatsApp Job Offers',
      category: 'Social Media',
      description: 'Scammers posing as recruiters offering work-from-home jobs with unrealistic salaries',
      reportCount: 1234,
      increase: '+45%',
      severity: 'high',
      tactics: ['Fake job postings', 'Request for upfront payment', 'Personal data harvesting'],
      targetGroup: 'Job seekers, Students',
      lastUpdated: '2 hours ago',
    },
    {
      id: 2,
      title: 'Bank Account Suspension SMS',
      category: 'Financial',
      description: 'Fraudulent messages claiming your bank account is suspended, with malicious links',
      reportCount: 987,
      increase: '+32%',
      severity: 'high',
      tactics: ['Phishing links', 'Urgency tactics', 'Bank impersonation'],
      targetGroup: 'All bank customers',
      lastUpdated: '5 hours ago',
    },
    {
      id: 3,
      title: 'Fake Online Stores',
      category: 'Shopping',
      description: 'Websites mimicking legitimate retailers selling non-existent products',
      reportCount: 756,
      increase: '+28%',
      severity: 'medium',
      tactics: ['Too-good-to-be-true prices', 'Fake reviews', 'No secure payment'],
      targetGroup: 'Online shoppers',
      lastUpdated: '1 day ago',
    },
    {
      id: 4,
      title: 'Cryptocurrency Investment Schemes',
      category: 'Investment',
      description: 'Ponzi schemes promising guaranteed returns on crypto investments',
      reportCount: 623,
      increase: '+67%',
      severity: 'high',
      tactics: ['Guaranteed returns', 'Pyramid structure', 'Fake testimonials'],
      targetGroup: 'New investors',
      lastUpdated: '3 hours ago',
    },
    {
      id: 5,
      title: 'Romance Scams',
      category: 'Social Media',
      description: 'Fake profiles on dating apps building relationships to request money',
      reportCount: 445,
      increase: '+21%',
      severity: 'medium',
      tactics: ['Emotional manipulation', 'Fake emergencies', 'Money requests'],
      targetGroup: 'Dating app users',
      lastUpdated: '6 hours ago',
    },
    {
      id: 6,
      title: 'SARS Tax Refund Scam',
      category: 'Financial',
      description: 'Emails claiming you have a tax refund, requesting banking details',
      reportCount: 389,
      increase: '+15%',
      severity: 'high',
      tactics: ['Government impersonation', 'Phishing forms', 'Identity theft'],
      targetGroup: 'Taxpayers',
      lastUpdated: '1 day ago',
    },
  ];

  const filteredScams = selectedCategory === 'All' 
    ? scamTrends 
    : scamTrends.filter(scam => scam.category === selectedCategory);

  const totalReports = scamTrends.reduce((sum, scam) => sum + scam.reportCount, 0);
  const highRiskCount = scamTrends.filter(scam => scam.severity === 'high').length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="trending-up" size={60} color="#FF6B6B" />
          <Text style={styles.title}>Trending Scams</Text>
          <Text style={styles.subtitle}>Real-time fraud alerts and prevention</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalReports.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Reports This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#FF6B6B' }]}>{highRiskCount}</Text>
            <Text style={styles.statLabel}>High Risk Scams</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#FFA94D' }]}>+38%</Text>
            <Text style={styles.statLabel}>Weekly Increase</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Scam Alerts</Text>
            <Text style={styles.resultCount}>{filteredScams.length} threats</Text>
          </View>

          {filteredScams.map((scam) => (
            <View key={scam.id} style={styles.scamCard}>
              <View style={styles.scamHeader}>
                <View style={styles.scamTitleRow}>
                  <View style={[
                    styles.severityIndicator,
                    { backgroundColor: scam.severity === 'high' ? '#FF6B6B' : '#FFA94D' }
                  ]} />
                  <Text style={styles.scamTitle}>{scam.title}</Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{scam.category}</Text>
                </View>
              </View>

              <Text style={styles.scamDescription}>{scam.description}</Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="people" size={16} color="#636E72" />
                  <Text style={styles.statText}>{scam.reportCount} reports</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="trending-up" size={16} color={scam.increase.startsWith('+') ? '#FF6B6B' : '#4ECDC4'} />
                  <Text style={[styles.statText, { color: scam.increase.startsWith('+') ? '#FF6B6B' : '#4ECDC4' }]}>
                    {scam.increase}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time" size={16} color="#636E72" />
                  <Text style={styles.statText}>{scam.lastUpdated}</Text>
                </View>
              </View>

              <View style={styles.tacticsSection}>
                <Text style={styles.tacticsTitle}>Common Tactics:</Text>
                <View style={styles.tacticsList}>
                  {scam.tactics.map((tactic, index) => (
                    <View key={index} style={styles.tacticChip}>
                      <Text style={styles.tacticText}>{tactic}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.targetGroup}>
                <Ionicons name="person-circle-outline" size={16} color="#636E72" />
                <Text style={styles.targetText}>Target: {scam.targetGroup}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>How to Stay Safe</Text>
          <View style={styles.tipCard}>
            <Ionicons name="shield-checkmark" size={24} color="#4ECDC4" />
            <View style={styles.tipContent}>
              <Text style={styles.tipHeading}>Verify Before Trust</Text>
              <Text style={styles.tipDescription}>Always verify sender identity through official channels</Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="link" size={24} color="#6C5CE7" />
            <View style={styles.tipContent}>
              <Text style={styles.tipHeading}>Check URLs Carefully</Text>
              <Text style={styles.tipDescription}>Look for secure HTTPS and correct domain names</Text>
            </View>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="lock-closed" size={24} color="#FFA94D" />
            <View style={styles.tipContent}>
              <Text style={styles.tipHeading}>Never Share OTPs</Text>
              <Text style={styles.tipDescription}>Banks never ask for passwords or OTPs via SMS/email</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.reportButton}>
          <Ionicons name="megaphone" size={24} color="white" />
          <Text style={styles.reportButtonText}>Report a New Scam</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 25,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#636E72',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryChipActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  categoryText: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  resultCount: {
    fontSize: 14,
    color: '#636E72',
  },
  scamCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },
  scamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  scamTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  severityIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    marginRight: 10,
  },
  scamTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 10,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: '#636E72',
    fontWeight: '500',
  },
  scamDescription: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#636E72',
    marginLeft: 4,
    fontWeight: '500',
  },
  tacticsSection: {
    marginBottom: 10,
  },
  tacticsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  tacticsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tacticChip: {
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 6,
  },
  tacticText: {
    fontSize: 11,
    color: '#FF6B6B',
  },
  targetGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetText: {
    fontSize: 12,
    color: '#636E72',
    marginLeft: 6,
    fontStyle: 'italic',
  },
  tipsSection: {
    padding: 20,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 15,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 2,
  },
  tipDescription: {
    fontSize: 12,
    color: '#636E72',
  },
  reportButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});