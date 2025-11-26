import { UserProfile } from "../../../domain/user/userProfile";
import { UserProfileRepository } from "../port/UserProfileRepository";
import { UserAccount } from "../../../domain/user/userAccount";
import { UserAuthService } from "../port/UserAuthService";

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
    private readonly userAuthService: UserAuthService
  ) {}

  async execute(input: CreateUserInput): Promise<UserProfile> {
    const userProfile = UserProfile.create(input);
    const userAccount = UserAccount.create(input);

    await this.userProfileRepository.save(userProfile);
    await this.userAuthService.create(userAccount);

    return userProfile;
  }
}
