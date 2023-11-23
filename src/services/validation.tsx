export const validatePostalCode = (value: string): string => {
	const isValid = /^\d{5}$/.test(value);
	return isValid ? "" : "PLZ muss aus fünf Zahlen bestehen";
};

export const validateEmail = (email: string): string => {
	return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		? ""
		: "Bitte gib eine gültige E-Mail Adresse ein";
};

export const validatePassword = (password: string): string => {
	const minimumLength = 12;
	return password.length >= minimumLength ? "" : `Bitte gib ein Passwort mit mindestens ${minimumLength} Zeichen ein`;
};

export const validateRepeatPassword = (password: string, passwordRepeat: string): string => {
	return password === passwordRepeat ? "" : "Passwörter stimmen nicht überein";
};
