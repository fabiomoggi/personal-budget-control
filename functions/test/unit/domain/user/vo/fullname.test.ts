import { FullName } from "../../../../../src/domain/user/vo/fullname";

describe("FullName Value Object", () => {
  it("should create a valid full name with first and last names", () => {
    const name = "John Doe";
    const fullName = new FullName(name);
    expect(fullName.value).toBe("John Doe");
  });

  it("should normalize input by trimming and collapsing extra whitespace", () => {
    const name = "   Jane    Marie    Smith   ";
    const fullName = new FullName(name);
    expect(fullName.value).toBe("Jane Marie Smith");
  });

  it("should throw an error if the full name is empty", () => {
    expect(() => new FullName("    ")).toThrow("Full name cannot be empty.");
  });

  it("should throw an error if there is less than two parts", () => {
    expect(() => new FullName("John")).toThrow(
      "Full name must include at least a first and last name."
    );
  });

  it("should throw an error if the first name is too short", () => {
    expect(() => new FullName("J Doe")).toThrow(
      "First name must be between 2 and 30 characters."
    );
  });

  it("should throw an error if the first name is too long", () => {
    const longFirstName = "A".repeat(31);
    expect(() => new FullName(`${longFirstName} Doe`)).toThrow(
      "First name must be between 2 and 30 characters."
    );
  });

  it("should throw an error if the last name is too short", () => {
    expect(() => new FullName("John D")).toThrow(
      "Last name must be between 2 and 30 characters."
    );
  });

  it("should throw an error if the last name is too long", () => {
    const longLastName = "B".repeat(31);
    expect(() => new FullName(`John ${longLastName}`)).toThrow(
      "Last name must be between 2 and 30 characters."
    );
  });

  it("should throw an error if any middle name is too short", () => {
    expect(() => new FullName("John A Doe")).toThrow(
      "Each middle name must be between 2 and 30 characters."
    );
  });

  it("should throw an error if any middle name is too long", () => {
    const longMiddle = "C".repeat(31);
    expect(() => new FullName(`John ${longMiddle} Doe`)).toThrow(
      "Each middle name must be between 2 and 30 characters."
    );
  });

  it("should allow multiple middle names if they are all valid", () => {
    // Here, first name, each middle, and last are within valid range.
    const fullName = new FullName("John Michael Andrew Doe");
    expect(fullName.value).toBe("John Michael Andrew Doe");
  });

  it("should throw an error if total normalized full name exceeds 250 characters", () => {
    // Create parts that are valid individually but when concatenated exceed 250 characters.
    // For example, use a valid first and last name and many middle names.
    const firstName = "John"; // 4 chars
    const lastName = "Doe"; // 3 chars
    // We fill the middle with many valid parts, each 30 characters long.
    const validMiddle = "M".repeat(30);
    // We need enough middle names so that total length > 250.
    // The total length = firstName.length + lastName.length + sum(each middle length) + spaces.
    // For example, if we use 8 middle names: 4 + 3 + (8 * 30) + 9 spaces (for 10 parts, 9 spaces) = 4+3+240+9 = 256.
    const middleParts = Array(8).fill(validMiddle).join(" ");
    const longFullName = `${firstName} ${middleParts} ${lastName}`;
    expect(() => new FullName(longFullName)).toThrow(
      "Total full name cannot be longer than 250 characters."
    );
  });
});
