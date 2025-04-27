// test/unit/domain/user/UserAccount.test.ts

import {
  UserAccount,
  UserAccountData,
} from "../../../../src/domain/user/userAccount";
import { Uid } from "../../../../src/domain/common/uid";
import { FullName } from "../../../../src/domain/user/vo/fullname";
import { Email } from "../../../../src/domain/user/vo/email";
import { Password } from "../../../../src/domain/user/vo/password";

describe("UserAccount", () => {
  const validData: UserAccountData = {
    uid: "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e",
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "A1!abcde",
  };

  it("should create a UserAccount for valid data", () => {
    const account = UserAccount.create(validData);
    expect(account).toBeInstanceOf(UserAccount);

    // Verify each value object
    expect(account.uid).toBeInstanceOf(Uid);
    expect(account.uid.value).toBe(validData.uid);

    expect(account.fullName).toBeInstanceOf(FullName);
    expect(account.fullName.value).toBe(validData.fullName);

    expect(account.email).toBeInstanceOf(Email);
    expect(account.email.value).toBe(validData.email);

    expect(account.password).toBeInstanceOf(Password);
    expect(account.password.value).toBe(validData.password);
  });

  it("should throw if uid is invalid", () => {
    expect(() =>
      UserAccount.create({ ...validData, uid: "invalid-uid" })
    ).toThrow(/Invalid UID/);
  });

  it("should throw if fullName is invalid", () => {
    // Only one part
    expect(() =>
      UserAccount.create({ ...validData, fullName: "John" })
    ).toThrow(/Full name must include at least a first and last name/);

    // Name too short
    expect(() => UserAccount.create({ ...validData, fullName: "J D" })).toThrow(
      /First name must be between 2 and 30 characters/
    );
  });

  it("should throw if email is invalid", () => {
    expect(() =>
      UserAccount.create({ ...validData, email: "not-an-email" })
    ).toThrow(/Invalid email format/);
  });

  describe("password validation", () => {
    it("should throw if password is too short", () => {
      expect(() =>
        UserAccount.create({ ...validData, password: "A1!a" })
      ).toThrow(/at least 6 characters/);
    });

    it("should throw if password is too long", () => {
      const long = "A1!" + "a".repeat(30); // length 33
      expect(long.length).toBeGreaterThan(32);
      expect(() =>
        UserAccount.create({ ...validData, password: long })
      ).toThrow(/cannot exceed 32 characters/);
    });

    it("should throw if password does not start with a letter", () => {
      expect(() =>
        UserAccount.create({ ...validData, password: "1A!abcd" })
      ).toThrow(/must start with a letter/);
    });

    it("should throw if password lacks a number", () => {
      expect(() =>
        UserAccount.create({ ...validData, password: "A!abcdef" })
      ).toThrow(/must contain at least one number/);
    });

    it("should throw if password lacks a special character", () => {
      expect(() =>
        UserAccount.create({ ...validData, password: "A1abcdef" })
      ).toThrow(/must contain at least one special character/);
    });
  });
});
