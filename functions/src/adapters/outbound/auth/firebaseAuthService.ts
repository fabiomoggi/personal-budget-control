import admin from "firebase-admin";
import { UserAuthService } from "../../../application/user/port/UserAuthService";
import { UserAccount } from "../../../domain/user/userAccount";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: "personal-budget-control-8dc91",
    //credential: admin.credential.applicationDefault(),
  });
}

export class FirebaseUserAuthService implements UserAuthService {
  /**
   * Creates a new user in Firebase Authentication using the provided UserAccount.
   * @param userAccount Domain object containing uid, email, password, and fullName.
   */
  async create(userAccount: UserAccount): Promise<void> {
    console.log("Creating user in Firebase Auth:");
    await admin.auth().createUser({
      uid: userAccount.uid.value,
      email: userAccount.email.value,
      password: userAccount.password.value,
      displayName: userAccount.fullName.value,
    });
  }
}
