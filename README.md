# SafePay Connect Backend

This is the backend API for SafePay Connect, a secure wallet and transaction platform with AI-powered scam detection. Built with Node.js, Express, Firebase Firestore, and integrates with an external AI service for scam analysis.

## Features

- **User Registration & Login** (JWT authentication, bcrypt password hashing)
- **Wallet Management** (create/view wallets)
- **Transaction Management** (create/view/update transactions)
- **Message Storage** (analyzed messages per user)
- **AI Scam Detection** (integrates with local AI service)
- **Firebase Firestore** as the database

## Prerequisites

- Node.js (v16+ recommended)
- Firebase service account JSON (`safepay-connect-firebase-adminsdk-fbsvc-8175ce9093.json` in this folder)
- [AI backend](../AI_model/SafePay-Connect-api-dev/SafePay-Connect-api-dev/API/README.md) running at `http://localhost:8080`

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Environment variables:**
   - Optionally create a `.env` file for custom configuration.

3. **Start the server:**
   ```sh
   node index.js
   ```
   The server runs at [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### User

- `POST /register`  
  Register a new user.  
  **Body:**  
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "username": "johndoe",
    "phoneNumber": "1234567890",
    "password": "yourpassword",
    "email": "john@example.com"
  }
  ```

- `POST /login`  
  Login and receive a JWT token.  
  **Body:**  
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

### Wallet

- `POST /createWallet`  
  Create a wallet for the authenticated user.  
  **Body:**  
  ```json
  {
    "provider": "FNB",
    "type": "savings",
    "walletNumber": "123456789"
  }
  ```
  **Auth:** Bearer token

- `GET /viewWallet`  
  View wallet and transaction history.  
  **Auth:** Bearer token

### Transactions

- `POST /createTransaction`  
  Create a transaction to another user.  
  **Body:**  
  ```json
  {
    "username": "recipientUsername",
    "amount": 100,
    "reference": "Payment for lunch"
  }
  ```
  **Auth:** Bearer token

- `GET /getTransaction/:id`  
  Get transaction details by ID.  
  **Auth:** Bearer token

- `PATCH /updateTransaction/:id`  
  Update the status of a transaction (only receiver can update).  
  **Body:**  
  ```json
  {
    "status": "completed"
  }
  ```
  **Auth:** Bearer token

### Messages

- `GET /getMessages`  
  Get all analyzed messages for the authenticated user.  
  **Auth:** Bearer token

### AI Scam Detection

- `POST /Analyze`  
  Analyze a message for scam risk using AI.  
  **Body:**  
  ```json
  {
    "message": "Your account needs verification"
  }
  ```
  **Auth:** Bearer token

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## AI Integration

- The `/Analyze` endpoint sends messages to the AI backend at `http://localhost:8080/api/ai-scam/analyze`.
- See [HowToUseAPI.md](../AI_model/SafePay-Connect-api-dev/SafePay-Connect-api-dev/API/HowToUseAPI.md) for details on the AI backend.

## License

ISC

---

**Project structure:**
- [`index.js`](index.js) — main Express server and API logic
- [`package.json`](package.json) — dependencies and scripts
- [`safepay-connect-firebase-adminsdk-fbsvc-8175ce9093.json`](safepay-connect-firebase-adminsdk-fbsvc-8175ce9093.json) — Firebase
