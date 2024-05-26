import { Binary } from "./binaries";
import { GatedLatch } from "./gated-latch";

describe("GatedLatch", () => {
  let latch: GatedLatch;

  beforeEach(() => {
    latch = new GatedLatch();
  });

  test("should initialize with output ZERO and negatedOutput ONE", () => {
    expect(latch.access()).toBe(Binary.ZERO);
  });

  test("should write ONE when enable is ONE", () => {
    latch.access(Binary.ONE, Binary.ONE);
    expect(latch.access()).toBe(Binary.ONE);
  });

  test("should write ZERO when enable is ONE", () => {
    latch.access(Binary.ZERO, Binary.ONE);
    expect(latch.access()).toBe(Binary.ZERO);
  });

  test("should retain previous value when enable is ZERO", () => {
    latch.access(Binary.ONE, Binary.ONE);
    latch.access(Binary.ZERO, Binary.ZERO);
    expect(latch.access()).toBe(Binary.ONE);
  });

  test("should toggle output and negatedOutput correctly", () => {
    latch.access(Binary.ONE, Binary.ONE);
    expect(latch.access()).toBe(Binary.ONE);
    latch.access(Binary.ZERO, Binary.ONE);
    expect(latch.access()).toBe(Binary.ZERO);
  });
});
