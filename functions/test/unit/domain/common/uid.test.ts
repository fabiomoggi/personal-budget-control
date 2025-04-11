import { Uid } from "../../../../src/domain/common/uid";

describe("Uid Value Object", () => {
  // Regular expression to match a UUID v4.
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  it("should use the provided uuid string when given", () => {
    const customUid = "0128295b-3fff-45e3-b414-522bdca1d42e";
    const uid = new Uid(customUid);
    expect(uid.value).toBe("0128295b-3fff-45e3-b414-522bdca1d42e");
  });

  it("should generate a new UID when an empty string is provided", () => {
    const uid = new Uid("");
    expect(uid.value).toMatch(uuidV4Regex);
  });

  it("should generate a new UID when whitespace is provided", () => {
    const uid = new Uid("    ");
    expect(uid.value).toMatch(uuidV4Regex);
  });

  it("should generate a new UID when no value is provided", () => {
    const uid = new Uid();
    expect(uid.value).toMatch(uuidV4Regex);
  });

  it("should throw an error when the provided string is a valid uuid v4 format", () => {
    const customUid = "  custom-uid-123  ";
    expect(() => new Uid(customUid)).toThrow(
      "Invalid UID: must be a valid UUID v4."
    );
  });
});
