import { Binary } from "./binaries";
import { LogicGates } from "./logical-gates";

export class GatedLatch {
  private output: Binary = Binary.ZERO;
  private negatedOutput: Binary = Binary.ONE;

  public access(data?: Binary, enable?: Binary): Binary {
    if (enable === Binary.ONE && data !== undefined) {
      this.output = data;
      this.negatedOutput = LogicGates.NOT(data);
    }
    return this.output;
  }
}
