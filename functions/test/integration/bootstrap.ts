// test/integration/bootstrap.ts
import admin from "firebase-admin";

// These env vars are set by the npm script
// FIRESTORE_EMULATOR_HOST=localhost:8080
// FIREBASE_AUTH_EMULATOR_HOST=localhost:9099

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "personal-budget-control-8dc91",
    //credential: admin.credential.applicationDefault(),
    // No credentials needed for emulator
  });
  console.log("Firebase Admin initialized for emulator.");
}
