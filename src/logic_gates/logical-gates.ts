import { Binary } from "./binary";

export class LogicGates {
  static NOT(a: Binary): Binary {
    return a === Binary.ONE ? Binary.ZERO : Binary.ONE;
  }

  static AND(a: Binary, b: Binary): Binary {
    return a === Binary.ONE && b === Binary.ONE ? Binary.ONE : Binary.ZERO;
  }

  static OR(a: Binary, b: Binary): Binary {
    return a === Binary.ONE || b === Binary.ONE ? Binary.ONE : Binary.ZERO;
  }

  static NAND(a: Binary, b: Binary): Binary {
    return this.NOT(this.AND(a, b));
  }

  static NOR(a: Binary, b: Binary): Binary {
    return this.NOT(this.OR(a, b));
  }

  static XOR(a: Binary, b: Binary): Binary {
    return a !== b ? Binary.ONE : Binary.ZERO;
  }

  static XNOR(a: Binary, b: Binary): Binary {
    return a === b ? Binary.ONE : Binary.ZERO;
  }
}
