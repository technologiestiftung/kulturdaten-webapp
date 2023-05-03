import React, { FC, FormEvent, useEffect } from 'react';
import PageWrapper from '@components/PageWrapper';
import { UserContext } from '@contexts/userContext';
import { validateEmail, validatePassword, validateRepeatPassword } from './validation';
import { UsersService } from '../../generated-api-client';
import { Input } from '@components/InputField';
import { Button } from '@components/Button';
import { useRouter } from 'next/router';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const Registration: FC = () => {
	const { registered, register } = React.useContext(UserContext);
	const router = useRouter();

	interface ErrorState {
		email: string;
		mainPassword: string;
		repeatPassword: string;
		general: string;
	}

	const initialErrorState: ErrorState = {
		email: '',
		mainPassword: '',
		repeatPassword: '',
		general: '',
	};

	interface PristineState {
		email: boolean;
		mainPassword: boolean;
		repeatPassword: boolean;
	}

	const initialPristineState: PristineState = {
		email: true,
		mainPassword: true,
		repeatPassword: true,
	};

	const [email, emailSet] = React.useState<string>('');
	const [mainPassword, mainPasswordSet] = React.useState<string>('');
	const [repeatPassword, repeatPasswordSet] = React.useState<string>('');
	const [errorState, errorStateSet] = React.useState<ErrorState>(initialErrorState);
	const [pristineState, pristineStateSet] = React.useState<PristineState>(initialPristineState);
	const [formValid, formValidSet] = React.useState<boolean>(false);

	useEffect(() => {
		if (
			!Object.values(pristineState).includes(true) &&
			Object.values(errorState)
				.filter((error) => error !== errorState.general)
				.reduce((acc, curr) => acc + curr, '').length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [pristineState, errorState]);

	const handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValid) {
			const body = {
				email: email.toLowerCase(),
				password: mainPassword,
			};

			try {
				const identifier = await UsersService.postUsers(body);
				console.log('User created successfully', identifier);
				errorStateSet(initialErrorState);
				register();
				router.push('/');
			} catch (error: any) {
				console.error('Error creating user:', error);
				// Uncomment for complete error report
				// Object.keys(error).map((key) => {
				// 	console.log(key, error[key]);
				// });
				if (error.status) {
					console.log('server error', error.status);
					switch (error.status) {
						case 409:
							errorStateSet({ ...errorState, general: `Email bereits vergeben ${error.status}` });
							break;
						default:
							errorStateSet({ ...errorState, general: `Unbekannter Fehler ${error.status}` });
					}
				} else {
					errorStateSet({ ...errorState, general: `Verbindung fehlgeschlagen ${error.status}` });
				}
			}
		} else if (Object.values(pristineState).includes(true)) {
			errorStateSet({ ...errorState, general: 'Mindestens ein Feld ist noch leer' });
		} else {
			console.log('Eingabe fehlerhaft');
		}
	};

	const onChange = (value: string, pristine: boolean, error: string, id: string) => {
		errorStateSet({ ...errorState, general: '' });
		//@ts-ignore
		pristineState[id] !== pristine && pristineStateSet({ ...pristineState, [id]: pristine });
		//@ts-ignore
		errorState[id] !== error && errorStateSet({ ...errorState, [id]: error });
		switch (id) {
			case 'email':
				emailSet(value);
				break;
			case 'mainPassword':
				mainPasswordSet(value);
				break;
			case 'repeatPassword':
				repeatPasswordSet(value);
				break;
			default:
				console.log('no id', id);
		}
	};

	return (
		<PageWrapper>
			<div className="max-w-lg">
				<h1>Registriere dich jetzt!</h1>
				{registered ? <div>Registriert</div> : <div>Nicht registriert</div>}
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
						onChange={(value, pristine, error, id) => onChange(value, pristine, error, id)}
						validate={(value) => validateEmail(value)}
						errorMessage={errorState.email}
					/>
					<Input
						type="password"
						id="mainPassword"
						label={'Password'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value, pristine, error, id) => onChange(value, pristine, error, id)}
						validate={(value) => validatePassword(value)}
					/>
					<Input
						type="password"
						id="repeatPassword"
						label={'Passwort bestätigen'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value, pristine, error, id) => onChange(value, pristine, error, id)}
						validate={(value) => validateRepeatPassword(value, mainPassword)}
					/>
					<Button label="Registrieren" type="submit" />
				</form>
			</div>
			{errorState.general && <span aria-live="assertive">{errorState.general}</span>}
		</PageWrapper>
	);
};

export default Registration;
