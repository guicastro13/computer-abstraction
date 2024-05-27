import { Binary } from "../logic_gates/binary";
import { GatedLatch } from "../logic_gates/gated-latch";
import { BinaryHelper } from "../logic_gates/binary";

export class Ram {
  private readonly addressWidth: number;
  private readonly dataWidth: number;
  private readonly memory: GatedLatch[];

  constructor(addressWidth: number, dataWidth: number) {
    this.addressWidth = addressWidth;
    this.dataWidth = dataWidth;
    this.memory = Array(2 ** addressWidth)
      .fill(null)
      .map(() => new GatedLatch());
  }

  private binaryToDecimal(binary: Binary[]): number {
    return parseInt(BinaryHelper.toString(binary), 2);
  }

  private checkWidth(data: Binary[]): void {
    if (data.length !== this.dataWidth) {
      throw new Error(
        `Data width mismatch. Expected ${this.dataWidth} bits, got ${data.length} bits.`
      );
    }
  }

  access(data: Binary[], address: Binary[], writeEnable: Binary): Binary[] {
    this.checkWidth(data);

    const decodedAddress = this.binaryToDecimal(address);
    if (decodedAddress < 0 || decodedAddress >= this.memory.length) {
      throw new Error("Invalid address");
    }

    const latch = this.memory[decodedAddress];
    if (writeEnable === Binary.ONE) {
      for (let i = 0; i < this.dataWidth; i++) {
        latch.access(data[i], writeEnable);
      }
    }

    const result: Binary[] = [];
    for (let i = 0; i < this.dataWidth; i++) {
      result.push(latch.access(Binary.ZERO, Binary.ZERO));
    }

    return result;
  }
}
