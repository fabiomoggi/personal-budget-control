import { UserProfile } from "../../../domain/user/userProfile";
import { UserProfileRepository } from "../port/UserProfileRepository";
import { UserAccount } from "../../../domain/user/userAccount";
import { UserAccountService } from "../port/UserAccountService";

export interface CreateUserInput {
  uid: string;
  fullName: string;
  email: string;
  age: number;
  password: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepository,
    private readonly userAccountService: UserAccountService
  ) {}

  async execute(input: CreateUserInput): Promise<UserProfile> {
    const userProfile = UserProfile.create(input);
    const userAccount = UserAccount.create(input);

    await this.userProfileRepository.save(userProfile);
    await this.userAccountService.create(userAccount);

    return userProfile;
  }
}
