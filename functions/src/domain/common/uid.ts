import { randomUUID } from "crypto";

export class Uid {
  public readonly value: string;

  private static readonly uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(value?: string) {
    if (value && value.trim().length > 0) {
      const trimmed = value.trim();
      if (!Uid.uuidV4Regex.test(trimmed))
        throw new Error("Invalid UID: must be a valid UUID v4.");
      this.value = trimmed;
    } else {
      this.value = randomUUID();
    }
  }
}
