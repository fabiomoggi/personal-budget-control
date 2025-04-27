import { UserProfile } from "../../../../src/domain/user/userProfile";

// Sample valid values
const validUuid = "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e";
const invalidUuid = "invalid-uid";
const validAge = 25;
const validFullName = "John Doe";
const validEmail = "john.doe@test.com";

describe("UserProfile", () => {
  it("should create a valid UserProfile given valid uid, age, fullName, and email", () => {
    const userProfile = UserProfile.create({
      fullName: validFullName,
      email: validEmail,
      uid: validUuid,
      age: validAge,
    });
    // Verify that the resulting UserProfile contains the expected values.
    expect(userProfile.uid.value).toBe(validUuid);
    expect(userProfile.age.value).toBe(validAge);
    expect(userProfile.fullName.value).toBe(validFullName);
    expect(userProfile.email.value).toBe(validEmail);
  });

  it("should generate a new UID if an empty string is provided", () => {
    const userProfile = UserProfile.create({
      fullName: validFullName,
      email: validEmail,
      uid: "",
      age: validAge,
    });
    // Since an empty string is not valid, Uid should generate a new one.
    expect(userProfile.uid.value).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(userProfile.age.value).toBe(validAge);
  });

  it("should throw an error if an invalid age is provided", () => {
    expect(() =>
      UserProfile.create({
        fullName: validFullName,
        email: validEmail,
        uid: validUuid,
        age: 10,
      })
    ).toThrow();
    expect(() =>
      UserProfile.create({
        fullName: validFullName,
        email: validEmail,
        uid: validUuid,
        age: 100,
      })
    ).toThrow();
  });

  it("should throw an error if an invalid UID string is provided", () => {
    expect(() =>
      UserProfile.create({
        fullName: validFullName,
        email: validEmail,
        uid: invalidUuid,
        age: validAge,
      })
    ).toThrow();
  });

  // --- Additional tests for fullName ---
  it("should throw an error if the full name does not have at least two parts", () => {
    expect(() =>
      UserProfile.create({
        fullName: "John", // Only one part
        email: validEmail,
        uid: validUuid,
        age: validAge,
      })
    ).toThrow("Full name must include at least a first and last name.");
  });

  it("should throw an error if the full name parts do not meet individual length requirements", () => {
    // First name too short
    expect(() =>
      UserProfile.create({
        fullName: "J Doe",
        email: validEmail,
        uid: validUuid,
        age: validAge,
      })
    ).toThrow("First name must be between 2 and 30 characters.");

    // Last name too short
    expect(() =>
      UserProfile.create({
        fullName: "John D",
        email: validEmail,
        uid: validUuid,
        age: validAge,
      })
    ).toThrow("Last name must be between 2 and 30 characters.");
  });

  // --- Additional tests for email ---
  it("should throw an error for an invalid email format", () => {
    expect(() =>
      UserProfile.create({
        fullName: validFullName,
        email: "invalid-email",
        uid: validUuid,
        age: validAge,
      })
    ).toThrow("Invalid email format.");
  });

  it("should normalize email by trimming extra spaces and converting to lowercase", () => {
    const mixedCaseEmail = "   John.DOE@Test.COM  ";
    const userProfile = UserProfile.create({
      fullName: validFullName,
      email: mixedCaseEmail,
      uid: validUuid,
      age: validAge,
    });
    expect(userProfile.email.value).toBe("john.doe@test.com");
  });
});
