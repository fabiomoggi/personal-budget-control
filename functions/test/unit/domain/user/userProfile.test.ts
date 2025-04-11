import { UserProfile } from "../../../../src/domain/user/userProfile";

// A valid UUID v4 string for testing.
const validUuid = "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e";
// An invalid UID string that does not conform to UUID v4.
const invalidUuid = "invalid-uid";

describe("UserProfile", () => {
  it("should create a valid UserProfile given valid uid and age", () => {
    const validAge = 25;
    const userProfile = UserProfile.create(validUuid, validAge);

    // Verify that the resulting UserProfile contains the expected values.
    expect(userProfile.uid.value).toBe(validUuid);
    expect(userProfile.age.value).toBe(validAge);
  });

  it("should generate a new UID if an empty string is provided", () => {
    const validAge = 30;
    const userProfile = UserProfile.create("", validAge);
    // Since an empty string is not valid, Uid should generate a new one.
    // We expect the generated UID to be different from the empty string and match UUID v4.
    expect(userProfile.uid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(userProfile.age.value).toBe(validAge);
  });

  it("should throw an error if an invalid age is provided", () => {
    // Assuming Age enforces that age must be between 18 and 90.
    expect(() => UserProfile.create(validUuid, 10)).toThrow();
    expect(() => UserProfile.create(validUuid, 100)).toThrow();
  });

  it("should throw an error if an invalid UID string is provided", () => {
    expect(() => UserProfile.create(invalidUuid, 25)).toThrow();
  });
});
