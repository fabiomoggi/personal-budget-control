import { Password } from "../../../../../src/domain/user/vo/password";

describe("Password Value Object", () => {
  it("should create a Password for a valid value (min length 6)", () => {
    const pwd = new Password("A1!abc");
    expect(pwd.value).toBe("A1!abc");
  });

  it("should allow a password of exactly 32 characters", () => {
    const base = "A1!"; // starts with letter, has number & special
    const rest = "a".repeat(29); // total length = 3 + 29 = 32
    const longPwd = base + rest;
    expect(longPwd.length).toBe(32);
    const pwd = new Password(longPwd);
    expect(pwd.value).toBe(longPwd);
  });

  it("should throw if password is not a string", () => {
    // @ts-expect-error: testing invalid type
    expect(() => new Password(undefined)).toThrow("Password must be a string.");
  });

  it("should throw if password is shorter than 6 characters", () => {
    expect(() => new Password("A1!a")).toThrow(
      "Password must be at least 6 characters long."
    );
  });

  it("should throw if password exceeds 32 characters", () => {
    const base = "A1!";
    const rest = "b".repeat(30); // length = 3 + 30 = 33
    const tooLong = base + rest;
    expect(tooLong.length).toBe(33);
    expect(() => new Password(tooLong)).toThrow(
      "Password cannot exceed 32 characters."
    );
  });

  it("should throw if password does not start with a letter", () => {
    expect(() => new Password("1A!abcd")).toThrow(
      "Password must start with a letter."
    );
    expect(() => new Password("_A1!abc")).toThrow(
      "Password must start with a letter."
    );
  });

  it("should throw if password does not contain at least one number", () => {
    expect(() => new Password("A!abcdef")).toThrow(
      "Password must contain at least one number."
    );
  });

  it("should throw if password does not contain at least one special character", () => {
    expect(() => new Password("A1abcdef")).toThrow(
      "Password must contain at least one special character."
    );
  });
});
