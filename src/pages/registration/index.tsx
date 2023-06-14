import React, { FC, FormEvent, useEffect } from 'react';
import PageWrapper from '@components/PageWrapper';
import { validateEmail, validatePassword, validateRepeatPassword } from './validation';
import { CreateUser, UsersService } from '../../generated-api-client';
import { Input } from '@components/InputField';
import { Button } from '@components/Button';
import { useRouter } from 'next/router';
import FormWrapper from '../../components/FormWrapper';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

interface ErrorMessages {
	email: string | undefined;
	mainPassword: string | undefined;
	repeatPassword: string | undefined;
	general: string | undefined;
}

const initialerrorMessages: ErrorMessages = {
	email: undefined,
	mainPassword: undefined,
	repeatPassword: undefined,
	general: undefined,
};

const Registration: FC = () => {
	const router = useRouter();

	const [email, emailSet] = React.useState<string>('');
	const [mainPassword, mainPasswordSet] = React.useState<string>('');
	const [repeatPassword, repeatPasswordSet] = React.useState<string>('');
	const [emailPristine, emailPristineSet] = React.useState<boolean>(true);
	const [mainPasswordPristine, mainPasswordPristineSet] = React.useState<boolean>(true);
	const [repeatPasswordPristine, repeatPasswordPristineSet] = React.useState<boolean>(true);
	const [errorMessages, errorMessagesSet] = React.useState<ErrorMessages>(initialerrorMessages);

	const [formValid, formValidSet] = React.useState<boolean>(false);

	useEffect(() => {
		if (
			!emailPristine &&
			!mainPasswordPristine &&
			!repeatPasswordPristine &&
			Object.values(errorMessages)
				//exclude the general error from the check
				.filter((error) => error !== errorMessages.general)
				.reduce((acc, curr) => acc + curr, '').length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [errorMessages, emailPristine, mainPasswordPristine, repeatPasswordPristine]);

	const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValid) {
			const body: CreateUser = {
				email: email.toLowerCase(),
				password: mainPassword,
				firstName: 'Kommissar',
				lastName: 'Zufall',
			};

			try {
				const identifier = await UsersService.postUsers(body);
				console.log('User created successfully', identifier);
				errorMessagesSet(initialerrorMessages);
				router.push('/');
			} catch (error: any) {
				console.error('Error creating user:', error);
				// Uncomment for complete error report
				Object.keys(error).map((key) => {
					console.log(key, error[key]);
				});
				if (error.status) {
					console.log('server error', error.status);
					switch (error.status) {
						case 409:
							errorMessagesSet({
								...errorMessages,
								general: `Email bereits vergeben ${error.status}`,
							});
							break;
						default:
							errorMessagesSet({
								...errorMessages,
								general: `Unbekannter Fehler ${error.status}`,
							});
					}
				} else {
					errorMessagesSet({
						...errorMessages,
						general: `Verbindung fehlgeschlagen ${error.status}`,
					});
				}
			}
		} else if (emailPristine || mainPasswordPristine || repeatPasswordPristine) {
			errorMessagesSet({ ...errorMessages, general: 'Mindestens ein Feld ist noch leer' });
		} else {
			console.log('Eingabe fehlerhaft');
		}
	};

	const onChange = (value: string, id: string, e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		switch (id) {
			case 'email':
				const emailValid = validateEmail(value);
				errorMessagesSet({ ...errorMessages, email: emailValid, general: undefined });
				emailSet(value);
				break;
			case 'mainPassword':
				const mainPasswordValid = validatePassword(value);
				let repeatPasswordValid = validateRepeatPassword(value, mainPassword);
				errorMessagesSet({
					...errorMessages,
					mainPassword: mainPasswordValid,
					repeatPassword: repeatPasswordValid,
					general: undefined,
				});
				mainPasswordSet(value);
				break;
			case 'repeatPassword':
				repeatPasswordValid = validateRepeatPassword(value, mainPassword);
				errorMessagesSet({
					...errorMessages,
					repeatPassword: repeatPasswordValid,
					general: undefined,
				});
				repeatPasswordSet(value);
				break;
			default:
				console.log('no id', id);
		}
	};

	return (
		<PageWrapper>
			<FormWrapper>
				<h1>Registriere dich jetzt!</h1>
				<p className="mt-2 mb-8">
					kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!
				</p>
				<form onSubmit={(e) => handleRegistration(e)}>
					<Input
						type="email"
						id="email"
						label={'Email'}
						required
						placeholder={'Hier bitte Email eingeben … '}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={emailPristineSet}
						errorMessage={emailPristine ? undefined : errorMessages.email}
					/>
					<Input
						type="password"
						id="mainPassword"
						label={'Password'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={mainPasswordPristineSet}
						errorMessage={mainPasswordPristine ? undefined : errorMessages.mainPassword}
					/>
					<Input
						type="password"
						id="repeatPassword"
						label={'Passwort bestätigen'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value, id, e) => onChange(value, id, e)}
						setPristine={repeatPasswordPristineSet}
						errorMessage={repeatPasswordPristine ? undefined : errorMessages.repeatPassword}
					/>
					<Button label="Registrieren" type="submit" />
				</form>
				{errorMessages.general && <span aria-live="assertive">{errorMessages.general}</span>}
			</FormWrapper>
		</PageWrapper>
	);
};

export default Registration;
