// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Realtime Database
import { getDatabase, ref, onValue, update } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChJRfr9lB6UY6VlGXVzfxum5hcjHTHaok",
  authDomain: "software-a64ed.firebaseapp.com",
  databaseURL: "https://software-a64ed-default-rtdb.firebaseio.com",
  projectId: "software-a64ed",
  storageBucket: "software-a64ed.firebasestorage.app",
  messagingSenderId: "263017567281",
  appId: "1:263017567281:web:246c71dfcd15f521c5f110",
  measurementId: "G-Q80WVVGFMT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Realtime Database - Listen to repair status updates (real-time)
const listenToRepairStatusRealtime = (repairId) => {
  const repairRef = ref(db, 'repairs/' + repairId);
  
  onValue(repairRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      console.log('Repair status (Realtime Database):', data.status);
      // Update your UI with the new status here
    } else {
      console.log('No such repair found!');
    }
  });
};

// Realtime Database - Update repair status
const updateRepairStatusRealtime = (repairId, status) => {
  const repairRef = ref(db, 'repairs/' + repairId);
  update(repairRef, {
    status: status,
  })
  .then(() => {
    console.log('Repair status updated in Realtime Database!');
  })
  .catch((error) => {
    console.error('Error updating repair status in Realtime Database:', error);
  });
};

// Example usage (Listen to repair status in real-time):
// Replace 'repairId123' with your actual repair ID
listenToRepairStatusRealtime('repairId123');

// Example usage (Update repair status):
// Replace 'repairId123' with your actual repair ID and 'Completed' with the status you want
updateRepairStatusRealtime('repairId123', 'Completed');
