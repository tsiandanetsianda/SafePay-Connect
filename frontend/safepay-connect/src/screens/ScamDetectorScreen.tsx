import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScamDetectorScreen = () => {
  const [message, setMessage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const scamPatterns = [
    { pattern: /click.*link|verify.*account/i, risk: 'high', type: 'Phishing' },
    { pattern: /congratulations.*won|claim.*prize/i, risk: 'high', type: 'Prize Scam' },
    { pattern: /urgent.*action|immediate.*response/i, risk: 'medium', type: 'Urgency Scam' },
    { pattern: /send.*money|transfer.*funds/i, risk: 'medium', type: 'Money Request' },
    { pattern: /otp|one.*time.*password/i, risk: 'high', type: 'OTP Scam' },
    { pattern: /suspended.*account|blocked.*card/i, risk: 'high', type: 'Account Scam' },
  ];

  const analyzeMessage = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message to analyze');
      return;
    }

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let detectedScams = [];
      let riskLevel = 'low';
      
      for (const scam of scamPatterns) {
        if (scam.pattern.test(message)) {
          detectedScams.push(scam);
          if (scam.risk === 'high') riskLevel = 'high';
          else if (scam.risk === 'medium' && riskLevel !== 'high') riskLevel = 'medium';
        }
      }

      setResult({
        riskLevel,
        scams: detectedScams,
        safe: detectedScams.length === 0,
        confidence: detectedScams.length > 0 ? 85 + Math.random() * 10 : 95,
      });
      setAnalyzing(false);
    }, 1500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFB84D';
      case 'low': return '#51CF66';
      default: return '#636E72';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="shield-checkmark" size={40} color="#FF6B6B" />
          <Text style={styles.title}>AI Scam Detector</Text>
          <Text style={styles.subtitle}>
            Paste suspicious messages to check for scams
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Paste WhatsApp, SMS, or email message here..."
            placeholderTextColor="#A0A0A0"
            multiline
            numberOfLines={6}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyzeMessage}
          disabled={analyzing}
        >
          {analyzing ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="scan" size={20} color="white" />
              <Text style={styles.buttonText}>Analyze Message</Text>
            </>
          )}
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(result.riskLevel) }]}>
              <Text style={styles.riskText}>
                {result.riskLevel.toUpperCase()} RISK
              </Text>
            </View>

            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <Text style={styles.confidenceValue}>{result.confidence.toFixed(1)}%</Text>
            </View>

            {result.safe ? (
              <View style={styles.safeMessage}>
                <Ionicons name="checkmark-circle" size={50} color="#51CF66" />
                <Text style={styles.safeText}>This message appears to be safe!</Text>
              </View>
            ) : (
              <View style={styles.warningContainer}>
                <Ionicons name="warning" size={30} color="#FF6B6B" />
                <Text style={styles.warningTitle}>Potential Scam Detected!</Text>
                
                {result.scams.map((scam: any, index: number) => (
                  <View key={index} style={styles.scamItem}>
                    <Text style={styles.scamType}>{scam.type}</Text>
                    <Text style={styles.scamRisk}>Risk: {scam.risk}</Text>
                  </View>
                ))}

                <View style={styles.tipsContainer}>
                  <Text style={styles.tipsTitle}>Safety Tips:</Text>
                  <Text style={styles.tip}>• Never share OTPs or passwords</Text>
                  <Text style={styles.tip}>• Verify sender through official channels</Text>
                  <Text style={styles.tip}>• Don't click suspicious links</Text>
                  <Text style={styles.tip}>• Report to your bank immediately if unsure</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Try these example scam messages:</Text>
          <TouchableOpacity
            style={styles.exampleButton}
            onPress={() => setMessage('Congratulations! You won R50,000. Click this link to claim your prize: bit.ly/fake')}
          >
            <Text style={styles.exampleText}>Prize Scam Example</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.exampleButton}
            onPress={() => setMessage('Your bank account has been suspended. Please verify your account immediately by entering your OTP')}
          >
            <Text style={styles.exampleText}>Banking Scam Example</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 5,
    textAlign: 'center',
  },
  inputContainer: {
    margin: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 150,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  analyzeButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  riskBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  riskText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  confidenceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  confidenceLabel: {
    fontSize: 16,
    color: '#636E72',
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  safeMessage: {
    alignItems: 'center',
    padding: 20,
  },
  safeText: {
    fontSize: 18,
    color: '#51CF66',
    fontWeight: '600',
    marginTop: 10,
  },
  warningContainer: {
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 18,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  scamItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    marginBottom: 8,
  },
  scamType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
  },
  scamRisk: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  tipsContainer: {
    width: '100%',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 5,
  },
  exampleContainer: {
    margin: 20,
  },
  exampleTitle: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 10,
  },
  exampleButton: {
    backgroundColor: '#E8F4F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleText: {
    color: '#45B7D1',
    fontSize: 14,
  },
});

export default ScamDetectorScreen;