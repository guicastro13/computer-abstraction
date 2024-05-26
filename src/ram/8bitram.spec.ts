import { Binary } from "../logic_gates/binary";
import { RAM8Bit } from "./8bitram";
import { BinaryHelper } from "../logic_gates/binary";

describe("RAM8Bit", () => {
  let ram: RAM8Bit;

  beforeEach(() => {
    ram = new RAM8Bit();
  });

  const printMemory = () => {
    const memoryState: { Address: string; Value: Binary }[] = [];
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      memoryState.push({
        Address: BinaryHelper.toString(binaryAddress),
        Value: ram.access(Binary.ZERO, binaryAddress, Binary.ZERO),
      });
    }
    console.table(memoryState);
  };

  test("should write and read correctly", () => {
    const dataToWrite = Array(256)
      .fill(null)
      .map((_, idx) => (idx % 2 === 0 ? Binary.ONE : Binary.ZERO));
    const enable = Binary.ONE;

    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      ram.access(dataToWrite[address], binaryAddress, enable);
    }
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      const readValue = ram.access(Binary.ZERO, binaryAddress, Binary.ZERO);
      expect(readValue).toBe(dataToWrite[address]);
    }
    printMemory();
  });

  test("should return ZERO for unread addresses", () => {
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      const readValue = ram.access(Binary.ZERO, binaryAddress, Binary.ZERO);
      expect(readValue).toBe(Binary.ZERO);
    }
    printMemory();
  });

  test("should not affect other addresses when writing", () => {
    const dataToWrite = Array(256)
      .fill(null)
      .map((_, idx) => (idx % 2 === 0 ? Binary.ONE : Binary.ZERO));
    const enable = Binary.ONE;
    for (let address = 0; address < 256; address += 2) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      ram.access(dataToWrite[address], binaryAddress, enable);
    }
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      const expectedValue =
        address % 2 === 0 ? dataToWrite[address] : Binary.ZERO;
      const readValue = ram.access(Binary.ZERO, binaryAddress, Binary.ZERO);
      expect(readValue).toBe(expectedValue);
    }
    printMemory();
  });

  test("should not write when enable is ZERO", () => {
    const dataToWrite = Array(256)
      .fill(null)
      .map((_, idx) => (idx % 2 === 0 ? Binary.ONE : Binary.ZERO));
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      ram.access(dataToWrite[address], binaryAddress, Binary.ZERO);
    }
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(8, "0")
      );
      const readValue = ram.access(Binary.ZERO, binaryAddress, Binary.ZERO);
      expect(readValue).toBe(Binary.ZERO);
    }
    printMemory();
  });

  test("should retain value after multiple writes and reads", () => {
    const enable = Binary.ONE;
    const binaryAddress3 = BinaryHelper.fromString("00000011");
    ram.access(Binary.ONE, binaryAddress3, enable);
    expect(ram.access(Binary.ZERO, binaryAddress3, Binary.ZERO)).toBe(
      Binary.ONE
    );
    ram.access(Binary.ZERO, binaryAddress3, enable);
    expect(ram.access(Binary.ZERO, binaryAddress3, Binary.ZERO)).toBe(
      Binary.ZERO
    );
    ram.access(Binary.ONE, binaryAddress3, enable);
    expect(ram.access(Binary.ZERO, binaryAddress3, Binary.ZERO)).toBe(
      Binary.ONE
    );
    printMemory();
  });
});
