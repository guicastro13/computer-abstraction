export enum Binary {
  ZERO = 0,
  ONE = 1,
}

export class BinaryHelper {
  static fromString(binaryString: string): Binary[] {
    return Array.from(binaryString).map((char) =>
      char === "1" ? Binary.ONE : Binary.ZERO
    );
  }

  static toString(binaryArray: Binary[]): string {
    return binaryArray.map((bit) => (bit === Binary.ONE ? "1" : "0")).join("");
  }
}
