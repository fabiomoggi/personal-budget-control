import "./bootstrap"; // must come first
import admin from "firebase-admin";
import { randomUUID } from "crypto";
import { FirestoreUserProfileRepository } from "../../src/adapters/outbound/firestore/firestoreUserRepository";
import { FirebaseUserAuthService } from "../../src/adapters/outbound/auth/firebaseAuthService";
import {
  CreateUserUseCase,
  CreateUserInput,
} from "../../src/application/user/useCases/CreateUserUseCase";

jest.setTimeout(30000);

describe("CreateUserUseCase Integration", () => {
  const profileRepo = new FirestoreUserProfileRepository();
  const authService = new FirebaseUserAuthService();
  const useCase = new CreateUserUseCase(profileRepo, authService);

  // Generate a unique email each run to avoid collisions
  const testInput: CreateUserInput = {
    uid: randomUUID(),
    fullName: "Integration Test",
    email: `int+${Date.now()}@example.com`,
    password: "A1!secure",
    age: 30,
  };

  afterAll(async () => {
    // Clean up Firestore connections
    await admin.firestore().terminate();
    console.log("AFTERALL: Firestore connection terminated.");
  });

  it("should create a Firebase Auth user and Firestore profile", async () => {
    console.log("Begin CreateUserUseCase Integration Test");
    // 1. Execute the use case
    const profile = await useCase.execute(testInput);
    console.log("End CreateUserUseCase Integration Test");

    // 2. Verify Auth user exists
    const userRecord = await admin.auth().getUser(testInput.uid);
    expect(userRecord.uid).toBe(testInput.uid);
    expect(userRecord.email).toBe(testInput.email);
    expect(userRecord.displayName).toBe(testInput.fullName);

    // 3. Verify Firestore profile exists
    const doc = await admin
      .firestore()
      .collection("userProfile")
      .doc(testInput.uid)
      .get();
    expect(doc.exists).toBe(true);
    const data = doc.data()!;
    expect(data.fullName).toBe(testInput.fullName);
    expect(data.email).toBe(testInput.email);
    expect(data.age).toBe(testInput.age);

    // 4. And the returned domain object matches
    expect(profile.uid.value).toBe(testInput.uid);
    expect(profile.fullName.value).toBe(testInput.fullName);
    expect(profile.email.value).toBe(testInput.email);
    expect(profile.age.value).toBe(testInput.age);
  });
});
