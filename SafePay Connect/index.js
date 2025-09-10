import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto'


// Load environment variables
dotenv.config();
const app = express();
app.use(express.json());

const privateKey = "fhf7fjJjdhfjvnG1123"

// Initialize Firestore with service account
admin.initializeApp({
  credential: admin.credential.cert("./safepay-connect-firebase-adminsdk-fbsvc-8175ce9093.json"),
});

const db = admin.firestore();

// Routes
app.get("/", (req, res) => {
  res.send("Express + Firestore API running 🚀");
});

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, surname, username, phoneNumber, password, email } = req.body;

    //  Check if email already exists
    const userQuery = await db.collection("users").where("email", "==", email).get();
    if (!userQuery.empty) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate unique user ID
    const userId = uuidv4();

    // Create user document
    await db.collection("users").doc(userId).set({
      userId, // optional, since it's also the doc ID
      name,
      surname,
      username,
      phoneNumber,
      email
    });

    // Generate auth token
    const token = authTokenGenerator(userId, name, surname);

    // Store security info separately
    await db.collection("keys").doc(userId).set({
      userId,
      password: hashedPassword, // hashed password
      authToken: token
    });

    // Send response to client
    res.status(201).json({
      userId,
      name,
      surname,
      username,
      phoneNumber,
      email,
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const{email, password} = req.body;
    // retrieves the user corresponding to the email
    const userQuery = await db.collection("users").where("email", "==", email).get();
    if (userQuery.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // retrieves the userID from that user
    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;
    const keyDoc = await db.collection("keys").doc(userId).get();
    if (!keyDoc.exists) {
      return res.status(500).json({ message: "Security info missing" });
    }

    // finds the password and checks if the password matched the password in the database
    const { password: hashedPassword } = keyDoc.data();
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generates and updates the AUthToken after every login
    const token = authTokenGenerator(userId, userData.name, userData.surname);
    await db.collection("keys").doc(userId).update({authToken: token});
    res.status(200).json({
      userId,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      token
    });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});









// Create a documents i.e , WALLET, TRANSACTION, KEY, MESSAGES, 
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const userRef = await db.collection("users").add({ name, email });
    res.status(201).send({ id: userRef.id, name, email });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all documents
app.get("/users", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


// Functions section
// Authtoken function

function authTokenGenerator(id, name, surname){
    const payload = {
        userID : id,
        name : name,
        surname: surname
    };

    const authToken = jwt.sign(payload, privateKey, {expiresIn: '24h'});
    return authToken;
}

