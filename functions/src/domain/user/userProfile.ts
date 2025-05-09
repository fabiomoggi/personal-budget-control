import { Uid } from "../common/uid";
import { Age } from "./vo/age";
import { FullName } from "./vo/fullname";
import { Email } from "./vo/email";

export interface UserProfileData {
  uid: string;
  fullName: string;
  email: string;
  age: number;
}

export class UserProfile {
  constructor(
    public readonly uid: Uid,
    public readonly fullName: FullName,
    public readonly email: Email,
    public readonly age: Age
  ) {}

  static create({ uid, fullName, email, age }: UserProfileData): UserProfile {
    return new UserProfile(
      new Uid(uid),
      new FullName(fullName),
      new Email(email),
      new Age(age)
    );
  }
}
