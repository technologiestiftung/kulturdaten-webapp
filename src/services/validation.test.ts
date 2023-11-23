import { validatePostalCode } from "./validation";

describe(validatePostalCode.name, () => {
	test("returns empty string for a valid postal code", async () => {
		const actual = validatePostalCode("12049");
		expect(actual).toBe("");
	});
	test("returns error message when postal is too long", async () => {
		const actual = validatePostalCode("120496");
		expect(actual).toBe("PLZ muss aus fünf Zahlen bestehen");
	});
	test("returns error message when postal is too short", async () => {
		const actual = validatePostalCode("1204");
		expect(actual).toBe("PLZ muss aus fünf Zahlen bestehen");
	});
	test("returns error message when postal is not purely numerical", async () => {
		const actual = validatePostalCode("B1204");
		expect(actual).toBe("PLZ muss aus fünf Zahlen bestehen");
	});
});
