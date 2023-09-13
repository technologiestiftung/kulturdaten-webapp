export const validatePostalCode = (value: string): string => {
	const isValid = /^\d{5}$/.test(value);
	return isValid ? "" : "PLZ muss aus fünf Zahlen bestehen";
};
