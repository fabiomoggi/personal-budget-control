export class FullName {
  constructor(public readonly value: string) {
    // Normalize the input: trim and collapse multiple spaces to one.
    const normalized = value.trim().replace(/\s+/g, " ");

    if (normalized.length === 0) {
      throw new Error("Full name cannot be empty.");
    }
    if (normalized.length > 250) {
      throw new Error("Total full name cannot be longer than 250 characters.");
    }

    const parts = normalized.split(" ");
    if (parts.length < 2) {
      throw new Error("Full name must include at least a first and last name.");
    }

    // Validate first name (first part)
    if (parts[0].length < 2 || parts[0].length > 30) {
      throw new Error("First name must be between 2 and 30 characters.");
    }

    // Validate last name (last part)
    const lastIndex = parts.length - 1;
    if (parts[lastIndex].length < 2 || parts[lastIndex].length > 30) {
      throw new Error("Last name must be between 2 and 30 characters.");
    }

    // Validate each middle name (if any)
    for (let i = 1; i < lastIndex; i++) {
      if (parts[i].length < 2 || parts[i].length > 30) {
        throw new Error(
          "Each middle name must be between 2 and 30 characters."
        );
      }
    }

    this.value = normalized;
  }
}
