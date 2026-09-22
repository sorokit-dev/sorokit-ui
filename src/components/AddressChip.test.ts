import { describe, expect, it } from "vitest";
import { truncateAddress } from "./AddressChip";

describe("truncateAddress", () => {
  it("leaves short addresses unchanged", () => {
    expect(truncateAddress("GABC1234")).toBe("GABC1234");
  });

  it("leaves a twelve-character address unchanged", () => {
    expect(truncateAddress("GABC12345678")).toBe("GABC12345678");
  });

  it("keeps the first and last four characters for long addresses", () => {
    expect(truncateAddress("GABC1234567890XYZ")).toBe("GABC...0XYZ");
  });
});