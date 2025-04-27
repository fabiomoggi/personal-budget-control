// test/unit/application/user/useCases/CreateUserUseCase.test.ts

import {
  CreateUserUseCase,
  CreateUserInput,
} from "../../../../../src/application/user/useCases/CreateUserUseCase";
import { UserProfile } from "../../../../../src/domain/user/userProfile";
import { UserAccount } from "../../../../../src/domain/user/userAccount";
import { UserProfileRepository } from "../../../../../src/application/user/port/UserProfileRepository";
import { UserAccountService } from "../../../../../src/application/user/port/UserAccountService";

describe("CreateUserUseCase", () => {
  const validInput: CreateUserInput = {
    uid: "3f0e3c91-9f7f-4d8b-a570-1f2b39f0e78e",
    fullName: "John Doe",
    email: "john.doe@test.com",
    age: 25,
    password: "A1!secure",
  };

  let fakeRepository: jest.Mocked<UserProfileRepository>;
  let fakeAccountService: jest.Mocked<UserAccountService>;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    fakeRepository = {
      save: jest.fn().mockResolvedValue(undefined),
      findById: jest.fn(), // not used here
    };
    fakeAccountService = {
      create: jest.fn().mockResolvedValue(undefined),
    };
    useCase = new CreateUserUseCase(fakeRepository, fakeAccountService);
  });

  it("should create a valid user profile, save it, and create an account", async () => {
    const profile = await useCase.execute(validInput);

    // Domain object checks
    expect(profile).toBeInstanceOf(UserProfile);
    expect(profile.uid.value).toBe(validInput.uid);
    expect(profile.fullName.value).toBe(validInput.fullName);
    expect(profile.email.value).toBe(validInput.email);
    expect(profile.age.value).toBe(validInput.age);

    // Repository called with the created profile
    expect(fakeRepository.save).toHaveBeenCalledWith(profile);

    // Account service called with a UserAccount
    expect(fakeAccountService.create).toHaveBeenCalledTimes(1);
    const accountArg = fakeAccountService.create.mock.calls[0][0];
    expect(accountArg).toBeInstanceOf(UserAccount);
    expect(accountArg.uid.value).toBe(validInput.uid);
    expect(accountArg.fullName.value).toBe(validInput.fullName);
    expect(accountArg.email.value).toBe(validInput.email);
    expect(accountArg.password.value).toBe(validInput.password);
  });

  it("should propagate validation errors and not call adapters", async () => {
    const badInput = { ...validInput, fullName: "John" }; // invalid fullName

    await expect(useCase.execute(badInput)).rejects.toThrow();
    expect(fakeRepository.save).not.toHaveBeenCalled();
    expect(fakeAccountService.create).not.toHaveBeenCalled();
  });

  it("should propagate repository errors and not call account service", async () => {
    fakeRepository.save.mockRejectedValue(new Error("Repo error"));

    await expect(useCase.execute(validInput)).rejects.toThrow("Repo error");
    expect(fakeRepository.save).toHaveBeenCalled();
    expect(fakeAccountService.create).not.toHaveBeenCalled();
  });

  it("should propagate account service errors after saving profile", async () => {
    fakeAccountService.create.mockRejectedValue(new Error("Auth error"));

    await expect(useCase.execute(validInput)).rejects.toThrow("Auth error");
    expect(fakeRepository.save).toHaveBeenCalledWith(expect.any(UserProfile));
    expect(fakeAccountService.create).toHaveBeenCalledWith(
      expect.any(UserAccount)
    );
  });
});
