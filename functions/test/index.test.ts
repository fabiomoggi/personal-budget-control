import { getName } from "../src/index";

describe("getName", () => {
  it("should return Firebase", async () => {
    expect(getName()).toBe("Firebase");
  });
});
