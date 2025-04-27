import { UserAccount } from "../../../domain/user/userAccount";

export interface UserAccountService {
  create(userAccount: UserAccount): Promise<void>;
}
