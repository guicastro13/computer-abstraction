import { Binary } from "./binary";
import { BinaryHelper } from "./binary";

export class BinaryDecoder {
  static decode(address: Binary[], size: number): Binary[][] {
    const output: Binary[][] = Array(size)
      .fill(null)
      .map(() => Array(address.length).fill(Binary.ZERO));
    const decimalAddress = parseInt(BinaryHelper.toString(address), 2);
    if (decimalAddress >= 0 && decimalAddress < size) {
      output[decimalAddress] = address.map((bit) => bit);
    }

    return output;
  }
}
