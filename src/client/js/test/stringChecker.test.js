import { isString } from "../stringChecker";

test('Name Checker', () => {
    expect(isString("Picard")).toBe("true");
  });