export class Email {
  constructor(public readonly value: string) {
    const trimmedEmail = value.trim();
    if (trimmedEmail.length === 0) {
      throw new Error("Email cannot be empty.");
    }
    // Email regex pattern to validate the format
    //const emailRegex = /^(?=.{1,64}@)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

    if (!emailRegex.test(trimmedEmail))
      throw new Error("Invalid email format.");

    this.value = trimmedEmail.toLowerCase();
  }
}
