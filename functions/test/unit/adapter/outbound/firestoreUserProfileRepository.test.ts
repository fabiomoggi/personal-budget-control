import admin from "firebase-admin";
import { FirestoreUserProfileRepository } from "../../../../src/adapters/outbound/firestore/firestoreUserRepository";
import { UserProfile } from "../../../../src/domain/user/userProfile";

// Mock firebase-admin
jest.mock("firebase-admin", () => {
  // Create jest.fn mocks for the Firestore methods
  const setMock = jest.fn();
  const getMock = jest.fn();
  const docMock = jest.fn(() => ({ set: setMock, get: getMock }));
  const collectionMock = jest.fn(() => ({ doc: docMock }));
  const firestoreMock = jest.fn(() => ({ collection: collectionMock }));

  return {
    apps: [], // so initializeApp will be called
    initializeApp: jest.fn(),
    credential: { applicationDefault: jest.fn() },
    firestore: firestoreMock,
    __mocks: { setMock, getMock, docMock, collectionMock },
  };
});

describe("FirestoreUserProfileRepository", () => {
  const {
    __mocks: { setMock, getMock, docMock, collectionMock },
  } = admin as any;

  let repo: FirestoreUserProfileRepository;

  const sampleData = {
    uid: "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e",
    fullName: "John Doe",
    email: "john.doe@test.com",
    age: 25,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new FirestoreUserProfileRepository();
  });

  it("save(): should call set() with correct data and return the profile", async () => {
    const profile = UserProfile.create(sampleData);

    const result = await repo.save(profile);

    // ensure correct collection and doc calls
    expect(collectionMock).toHaveBeenCalledWith("userProfile");
    expect(docMock).toHaveBeenCalledWith(sampleData.uid);

    // ensure set called with plain object
    expect(setMock).toHaveBeenCalledWith({
      uid: sampleData.uid,
      fullName: sampleData.fullName,
      email: sampleData.email,
      age: sampleData.age,
    });

    // result should be the same instance
    expect(result).toBe(profile);
  });

  it("save(): should propagate errors from set()", async () => {
    const profile = UserProfile.create(sampleData);
    setMock.mockRejectedValue(new Error("Firestore set error"));

    await expect(repo.save(profile)).rejects.toThrow("Firestore set error");
  });

  it("findById(): should return null if document does not exist", async () => {
    getMock.mockResolvedValue({ exists: false });

    const result = await repo.findById(sampleData.uid);
    expect(collectionMock).toHaveBeenCalledWith("userProfile");
    expect(docMock).toHaveBeenCalledWith(sampleData.uid);
    expect(getMock).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("findById(): should reconstruct and return UserProfile when document exists", async () => {
    getMock.mockResolvedValue({
      exists: true,
      data: () => ({
        uid: sampleData.uid,
        fullName: sampleData.fullName,
        email: sampleData.email,
        age: sampleData.age,
      }),
    });

    const result = await repo.findById(sampleData.uid);

    expect(collectionMock).toHaveBeenCalledWith("userProfile");
    expect(docMock).toHaveBeenCalledWith(sampleData.uid);
    expect(getMock).toHaveBeenCalled();

    expect(result).toBeInstanceOf(UserProfile);
    if (result) {
      expect(result.uid.value).toBe(sampleData.uid);
      expect(result.fullName.value).toBe(sampleData.fullName);
      expect(result.email.value).toBe(sampleData.email);
      expect(result.age.value).toBe(sampleData.age);
    }
  });

  it("findById(): should propagate errors from get()", async () => {
    getMock.mockRejectedValue(new Error("Firestore get error"));
    await expect(repo.findById(sampleData.uid)).rejects.toThrow(
      "Firestore get error"
    );
  });

  it("findById(): should return null if data() returns undefined", async () => {
    getMock.mockResolvedValue({ exists: true, data: () => undefined });

    const result = await repo.findById(sampleData.uid);
    expect(result).toBeNull();
  });
});
