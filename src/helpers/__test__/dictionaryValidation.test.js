import {
  hasDuplicationInconsistency,
  hasChainInconsistency
} from "../dictionaryValidation";

// D U P L I C A T I O N
describe("Duplication", () => {
  describe("No Duplication inconsistency", () => {
    it("Dictionary does not have same keys", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Stonegre", "Dark Grey"],
          ["Caribbean Sea", "Turqoise"]
        ]
      };
      expect(hasDuplicationInconsistency(dico)).toBe(false);
    });
  });

  describe("Duplication inconsistency", () => {
    it("Dictionary has same keys", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Stonegrey", "Dark Grey"],
          ["Caribbean Sea", "Turqoise"]
        ]
      };
      expect(hasDuplicationInconsistency(dico)).toBe(true);
    });
  });
});

// F O R K
describe("Fork", () => {
  describe("No Fork inconsistency", () => {
    it("Dictionary does not have key mapping to different value", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Stonegry", "Dark Grey"],
          ["Midnight Blue", "Dark Blue"]
        ]
      };
      expect(hasDuplicationInconsistency(dico)).toBe(false);
    });
  });
  describe("Fork inconsistency", () => {
    it("Dictionary has key mapping to different value", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Stonegrey", "Anthracite"],
          ["Midnight Blue", "Dark Blue"]
        ]
      };
      expect(hasDuplicationInconsistency(dico)).toBe(true);
    });
  });
});

// C Y C L E
describe("Cycle", () => {
  describe("No cycle inconsistency", () => {
    it("Dictionary does not have cycle (key is also a value)", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Stonegre", "Dark Grey"],
          ["Caribbean Sea", "Turqoise"]
        ]
      };
      expect(hasChainInconsistency(dico)).toBe(false);
    });
  });
  describe("Cycle inconsistency", () => {
    it("Dictionary has cycle", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Dark Grey", "Stonegrey"],
          ["Midnight Blue", "Dark Blue"]
        ]
      };
      expect(hasChainInconsistency(dico)).toBe(true);
    });
  });
});

// C H A I N
describe("Chain", () => {
  describe("No chain inconsistency", () => {
    it("Dictionary does not have a chain (value also a key)", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Gry"],
          ["Dark Grey", "Dark Gry"],
          ["Midnight Blue", "Dark Blue"]
        ]
      };
      expect(hasChainInconsistency(dico)).toBe(false);
    });
  });

  describe("Chain inconsistency", () => {
    it("Dictionary does have a chain (value also a key)", () => {
      const dico = {
        name: "color",
        terms: [
          ["Stonegrey", "Dark Grey"],
          ["Dark Grey", "Anthracite"],
          ["Midnight Blue", "Dark Blue"]
        ]
      };
      expect(hasChainInconsistency(dico)).toBe(true);
    });
  });
});
