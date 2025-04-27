import admin from "firebase-admin";
import { UserProfileRepository } from "../../../application/user/port/UserProfileRepository";
import { UserProfile } from "../../../domain/user/userProfile";

// Ensure Firebase Admin is initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export class FirestoreUserProfileRepository implements UserProfileRepository {
  private readonly db = admin.firestore();
  private readonly collection = this.db.collection("userProfile");

  async save(userProfile: UserProfile): Promise<UserProfile> {
    // Convert the domain object to a plain object suitable for Firestore.
    await this.collection.doc(userProfile.uid.value).set({
      uid: userProfile.uid.value,
      fullName: userProfile.fullName.value,
      email: userProfile.email.value,
      age: userProfile.age.value,
    });
    return userProfile;
  }

  async findById(uid: string): Promise<UserProfile | null> {
    const doc = await this.collection.doc(uid).get();
    if (!doc.exists) return null;
    const data = doc.data();
    if (!data) return null;

    // Re-create the domain object using the factory method.
    return UserProfile.create({
      uid: uid, // alternatively, use uid from parameter if you prefer
      fullName: data.fullName,
      email: data.email,
      age: data.age,
    });
  }
}
