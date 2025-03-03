import { getName, getAge, getOneHundred } from "../src/index";

describe("getName", () => {
  it("should return Firebase value", async () => {
    expect(getName()).toBe("Firebase");
  });
});

describe("getAge", () => {
  it("should return 38", async () => {
    expect(getAge()).toBe(38);
  });
});

describe("getOneHundred", () => {
  it("should return 100", async () => {
    expect(getOneHundred()).toBe(100);
  });
});
