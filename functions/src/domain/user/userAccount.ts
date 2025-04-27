import { Uid } from "../common/uid";
import { FullName } from "./vo/fullname";
import { Email } from "./vo/email";
import { Password } from "./vo/password";

export interface UserAccountData {
  uid: string;
  fullName: string;
  email: string;
  password: string;
}

export class UserAccount {
  constructor(
    public readonly uid: Uid,
    public readonly fullName: FullName,
    public readonly email: Email,
    public readonly password: Password
  ) {}

  static create({
    uid,
    fullName,
    email,
    password,
  }: UserAccountData): UserAccount {
    return new UserAccount(
      new Uid(uid),
      new FullName(fullName),
      new Email(email),
      new Password(password)
    );
  }
}
