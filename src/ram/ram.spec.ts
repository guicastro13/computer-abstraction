import { Ram } from "./ram";
import { Binary } from "../logic_gates/binary";
import { BinaryHelper } from "../logic_gates/binary";

describe("Ram", () => {
  let ram: Ram;

  beforeEach(() => {
    ram = new Ram(16, 8); // Criar uma RAM com 16 bits de endereço e 8 bits de dados
  });

  test("should write and read correctly", () => {
    const dataToWrite = Array(256)
      .fill(null)
      .map((_, idx) => {
        const binaryData = idx % 2 === 0 ? "00000001" : "00000000"; // Alternando entre 1 e 0
        return BinaryHelper.fromString(binaryData);
      });
    const enable = Binary.ONE;

    // Escrever valores nos endereços
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(16, "0")
      );
      ram.access(dataToWrite[address], binaryAddress, enable);
    }

    // Ler valores dos endereços e verificar se estão corretos
    for (let address = 0; address < 256; address++) {
      const binaryAddress = BinaryHelper.fromString(
        address.toString(2).padStart(16, "0")
      );
      const readData = ram.access(new Array(8), binaryAddress, Binary.ZERO);
      expect(readData.slice(0, 8)).toEqual(dataToWrite[address]);
    }
  });

  test("should throw error on invalid address", () => {
    const invalidAddress = BinaryHelper.fromString("10000000000000000"); // Endereço maior do que a RAM
    expect(() => ram.access([], invalidAddress, Binary.ZERO)).toThrow(
      "Data width mismatch. Expected 8 bits, got 0 bits."
    );
  });

  test("should throw error on data width mismatch", () => {
    const dataWidthMismatch = BinaryHelper.fromString("00000000000000000"); // Dados com largura incorreta
    expect(() => ram.access(dataWidthMismatch, [], Binary.ZERO)).toThrow(
      "Data width mismatch"
    );
  });
});
