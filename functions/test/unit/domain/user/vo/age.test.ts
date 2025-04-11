import { Age } from "../../../../../src/domain/user/vo/age";

describe("Age Value Object", () => {
  it("should create an Age instance for valid age values", () => {
    const validAges = [18, 50, 90];
    validAges.forEach((ageValue) => {
      const age = new Age(ageValue);
      expect(age.value).toBe(ageValue);
    });
  });

  it("should throw an error when the age is below 18", () => {
    expect(() => new Age(17)).toThrow(
      "Invalid age: must be between 18 and 90."
    );
    expect(() => new Age(0)).toThrow("Invalid age: must be between 18 and 90.");
  });

  it("should throw an error when the age is above 90", () => {
    expect(() => new Age(91)).toThrow(
      "Invalid age: must be between 18 and 90."
    );
    expect(() => new Age(100)).toThrow(
      "Invalid age: must be between 18 and 90."
    );
  });
});
