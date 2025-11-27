//process.env.FIRESTORE_EMULATOR_HOST ??= "127.0.0.1:8080";
//process.env.FIREBASE_AUTH_EMULATOR_HOST ??= "127.0.0.1:9099";

import admin from "firebase-admin";

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
}
if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}
if (!process.env.GOOGLE_CLOUD_PROJECT) {
  process.env.GOOGLE_CLOUD_PROJECT = "personal-budget-control-8dc91";
}

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "personal-budget-control-8dc91", // usa o mesmo projeto dos functions
  });
  console.log("TEST: Firebase Admin was initialized for emulator.", {
    FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST,
    FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST,
  });
} else {
  console.log("TEST: Firebase Admin already initialized.");
}