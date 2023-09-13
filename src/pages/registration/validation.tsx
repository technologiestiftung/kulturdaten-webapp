export const validateEmail = (email: string): string => {
	return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		? ""
		: "Bitte gib eine gültige E-Mail Adresse ein";
};

export const validatePassword = (password: string): string => {
	return password.length >= 12 ? "" : "Bitte gib ein Passwort mit mindestens 8 Zeichen ein";
};

export const validateRepeatPassword = (password: string, passwordRepeat: string): string => {
	return password === passwordRepeat ? "" : "Passwörter stimmen nicht überein";
};
