// test/unit/adapters/outbound/FirebaseUserAuthService.test.ts

import admin from "firebase-admin";
import { FirebaseUserAuthService } from "../../../../../src/adapters/outbound/auth/firebaseAuthService";
import { UserAccount } from "../../../../../src/domain/user/userAccount";

jest.mock("firebase-admin", () => {
  const createUserMock = jest.fn();
  const authMock = jest.fn(() => ({ createUser: createUserMock }));
  return {
    apps: [],
    initializeApp: jest.fn(),
    credential: { applicationDefault: jest.fn() },
    auth: authMock,
    __mocks: { createUserMock, authMock },
  };
});

describe("FirebaseUserAuthService", () => {
  const {
    __mocks: { createUserMock, authMock },
  } = admin as any;

  let service: FirebaseUserAuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new FirebaseUserAuthService();
  });

  it("should call admin.auth().createUser with correct parameters", async () => {
    const data = {
      uid: "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e",
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "A1!secure",
    };
    const account = UserAccount.create(data);

    await service.create(account);

    expect(authMock).toHaveBeenCalledTimes(1);
    expect(createUserMock).toHaveBeenCalledWith({
      uid: data.uid,
      email: data.email,
      password: data.password,
      displayName: data.fullName,
    });
  });

  it("should propagate errors from admin.auth().createUser", async () => {
    createUserMock.mockRejectedValue(new Error("Auth failure"));

    const account = UserAccount.create({
      uid: "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e",
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "A1!secure",
    });

    await expect(service.create(account)).rejects.toThrow("Auth failure");
    expect(authMock).toHaveBeenCalled();
    expect(createUserMock).toHaveBeenCalled();
  });
});
