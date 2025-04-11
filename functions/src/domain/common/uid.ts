import { randomUUID } from "crypto";

export class Uid {
  private static readonly uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(public readonly value?: string) {
    if (value && value.trim().length > 0) {
      if (!Uid.uuidV4Regex.test(value.trim()))
        throw new Error("Invalid UID: must be a valid UUID v4.");
    } else this.value = randomUUID();
  }
}
