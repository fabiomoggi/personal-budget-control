import { UserAccount } from "../../../domain/user/userAccount";

export interface UserAuthService {
  create(userAccount: UserAccount): Promise<void>;
}
