import { getName, getAge, getSum } from "../src/index";

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

describe("getSum", () => {
  it("should return 2", async () => {
    expect(getSum(1, 1)).toBe(2);
  });
});
