import { UserProfile } from "../../../domain/user/userProfile";

export interface UserProfileRepository {
  /**
   * Persists a UserProfile and returns the saved instance.
   * @param userProfile The UserProfile entity to save.
   * @returns A promise that resolves with the persisted UserProfile.
   */
  save(userProfile: UserProfile): Promise<UserProfile>;

  /**
   * Retrieves a UserProfile by its UID.
   * @param uid The unique identifier of the user profile.
   * @returns A promise that resolves with the UserProfile if found, or null otherwise.
   */
  findById(uid: string): Promise<UserProfile | null>;
}
