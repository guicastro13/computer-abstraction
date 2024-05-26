import { Binary } from "../logic_gates/binary";
import { GatedLatch } from "../logic_gates/gated-latch";
import { BinaryHelper } from "../logic_gates/binary";

export class RAM8Bit {
  private memory: GatedLatch[];

  constructor() {
    this.memory = Array(256)
      .fill(null)
      .map(() => new GatedLatch());
  }

  private binaryToDecimal(binary: Binary[]): number {
    return parseInt(BinaryHelper.toString(binary), 2);
  }

  access(data: Binary, address: Binary[], writeEnable: Binary): Binary {
    if (address.length !== 8) {
      throw new Error("Address must be 8 bits long");
    }

    const decodedAddress = this.binaryToDecimal(address);
    if (decodedAddress < 0 || decodedAddress >= this.memory.length) {
      throw new Error("Invalid address");
    }

    return this.memory[decodedAddress].access(data, writeEnable);
  }
}
