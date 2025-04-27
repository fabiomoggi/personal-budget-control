// src/domain/user/valueObjects/Password.ts

export class Password {
  // Regexes for the various requirements
  private static readonly startsWithLetter = /^[A-Za-z]/;
  private static readonly hasNumber = /\d/;
  private static readonly hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

  constructor(public readonly value: string) {
    if (typeof value !== "string") {
      throw new Error("Password must be a string.");
    }
    const length = value.length;
    if (length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    if (length > 32) {
      throw new Error("Password cannot exceed 32 characters.");
    }
    if (!Password.startsWithLetter.test(value)) {
      throw new Error("Password must start with a letter.");
    }
    if (!Password.hasNumber.test(value)) {
      throw new Error("Password must contain at least one number.");
    }
    if (!Password.hasSpecial.test(value)) {
      throw new Error("Password must contain at least one special character.");
    }

    this.value = value;
  }
}
