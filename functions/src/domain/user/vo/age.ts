export class Age {
  constructor(public readonly value: number) {
    if (value < 18 || value > 90) {
      throw new Error("Invalid age: must be between 18 and 90.");
    }
  }
}
