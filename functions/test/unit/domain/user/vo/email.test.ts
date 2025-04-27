import { Email } from "../../../../../src/domain/user/vo/email";

describe("Email Value Object", () => {
  it("should create an Email for a valid email string and normalize it to lowercase", () => {
    const input = "Test.Email@Example.com";
    const email = new Email(input);
    expect(email.value).toBe("test.email@example.com");
  });

  it("should throw an error if the email is empty or only whitespace", () => {
    expect(() => new Email("")).toThrow("Email cannot be empty.");
    expect(() => new Email("    ")).toThrow("Email cannot be empty.");
  });

  it("should throw an error for invalid email formats", () => {
    const invalidEmails = [
      "plainaddress",
      "@missinglocal.org",
      "missingatsign.com",
      "missingdomain@.com",
      "missingTLD@example.",
      "user@example,com",
      "user@.example.com",
    ];

    invalidEmails.forEach((invalid) => {
      expect(() => new Email(invalid)).toThrow("Invalid email format.");
    });
  });

  it("should trim extraneous whitespace and convert the email to lowercase", () => {
    const input = "   User.Email@Example.COM   ";
    const email = new Email(input);
    expect(email.value).toBe("user.email@example.com");
  });
});
