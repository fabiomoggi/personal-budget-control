import { Uid } from "../common/uid";
import { Age } from "./vo/age";

export class UserProfile {
  constructor(public readonly uid: Uid, public readonly age: Age) {}

  static create(uid: string, age: number): UserProfile {
    return new UserProfile(new Uid(uid), new Age(age));
  }
}
