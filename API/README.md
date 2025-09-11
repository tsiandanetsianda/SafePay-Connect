# SafePay Connect API

## AI/NLP & Security Integration

### Features
- **AI Scam Detection**: NLP analysis of suspicious payment messages
- **Secure Transaction Verification**: Encrypted transaction confirmation system
- **Authentication & Security**: JWT-based authentication with encryption

### API Endpoints

#### Scam Detection
```
POST /api/scam/analyze
{
  "message": "URGENT: Your FNB account suspended. Click here: http://fakebank.co.za/verify"
}

Response:
{
  "isScam": true,
  "confidence": 0.85,
  "riskLevel": "HIGH",
  "detectedPatterns": [
    "Urgency keyword: URGENT",
    "Fake banking phrase: FNB ACCOUNT SUSPENDED",
    "Suspicious URL detected",
    "Non-HTTPS link detected"
  ],
  "recommendation": "HIGH RISK: This message shows strong indicators of being a scam. Do not click any links, share personal information, or make payments. Report to your bank and authorities if you've already engaged."
}
```

#### Batch Scam Analysis
```
POST /api/scam/analyze/batch
{
  "messages": [
    "You've won R5000! Claim now!",
    "Your account verification required"
  ]
}

Response:
{
  "You've won R5000! Claim now!": {
    "isScam": true,
    "confidence": 0.75,
    "riskLevel": "HIGH",
    "detectedPatterns": ["Money scam pattern: YOU'VE WON R"],
    "recommendation": "HIGH RISK: ..."
  },
  "Your account verification required": {
    "isScam": false,
    "confidence": 0.2,
    "riskLevel": "LOW",
    "detectedPatterns": ["Poor grammar/formality indicator: VERIFICATION REQUIRED"],
    "recommendation": "LOW RISK: ..."
  }
}
```

#### Transaction Verification
```
POST /api/transaction/verify
{
  "amount": "500.00",
  "recipient": "John Doe"
}

Response:
{
  "transactionId": "abc123xyz",
  "verificationCode": "123456",
  "status": "pending_verification",
  "expiresIn": 300
}
```

```
POST /api/transaction/confirm
{
  "transactionId": "abc123xyz",
  "verificationCode": "123456"
}

Response:
{
  "transactionId": "abc123xyz",
  "status": "confirmed",
  "timestamp": 1703123456789
}
```

### Running the Application
```bash
cd API
mvn spring-boot:run
```

Server runs on: http://localhost:8080