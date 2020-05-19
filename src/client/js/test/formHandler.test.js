import { constructName } from "../formHandler";

test('Name Checker', () => {
  expect(constructName("Polarity", "0.999")).toBe("Polarity: 0.999");
});