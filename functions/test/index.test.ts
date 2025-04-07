import * as myFunctions from "../src/index";
import functionsTest from "firebase-functions-test";

// Initialize the testing environment
const testEnv = functionsTest();

describe("helloWorld Cloud Function", () => {
  // Clean up the testing environment after all tests have run.
  afterAll(() => {
    testEnv.cleanup();
  });

  it('should return "Hello from Firebase!"', async () => {
    // Create mock request and response objects.
    const req: any = {}; // You can expand this if your function expects data.
    const res: any = {
      send: jest.fn(),
    };

    // Invoke the function.
    await myFunctions.helloWorld(req, res);

    // Verify that res.send was called with the correct message.
    expect(res.send).toHaveBeenCalledWith("Hello from Firebase!");
  });
});
