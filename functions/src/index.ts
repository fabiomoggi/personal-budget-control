/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(async (request, response) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      // No credentials needed for emulator
    });
    console.log("Firebase Admin initialized in index.js for emulator.");
  }

  const db = admin.firestore();
  await db.collection("userProfile").doc("testUser").set({ name: "Test User" });

  response.send("Hello from Firebase!");
});
