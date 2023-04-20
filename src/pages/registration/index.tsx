import React, { useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { UserContext } from '../../contexts/userContext';
import { validateEmail, validatePassword, validateRepeatPassword } from './validation';
import { UsersService } from '../../generated-api-client';
import { Input } from '../../components/InputField';
import { Button } from '../../components/Button';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const Registration = () => {
	const { registered, register } = React.useContext(UserContext);

	interface ErrorState {
		email: string;
		mainPassword: string;
		repeatPassword: string;
	}

	const initialErrorState: ErrorState = {
		email: '',
		mainPassword: '',
		repeatPassword: '',
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
			Object.values(errorState).reduce((acc, curr) => acc + curr, '').length === 0
		) {
			formValidSet(true);
		} else {
			formValidSet(false);
		}
	}, [pristineState, errorState]);

	const handleRegistration = async (e) => {
		e.preventDefault();
		if (formValid) {
			const body = {
				email,
				password: mainPassword,
				firstName: 'testname', // TODO: to be replaced
				lastName: 'testlastname', // TODO: to be replaced
			};

			try {
				const identifier = await UsersService.postUsers(body);
				console.log('User created successfully', identifier);
				register();
			} catch (error) {
				console.error('Error creating user:', error);
				Object.keys(error).map((key) => {
					console.log(key, error[key]);
				});
				switch (error.status) {
					case 409:
						errorStateSet({ ...errorState, email: 'Email bereits vergeben' });
						break;
					default:
						errorStateSet({ ...errorState, email: 'Unbekannter Fehler' });
				}
			}
		} else {
			console.log('client errors');
		}
	};

	const onChange = (value: string, pristine: boolean, error: string, id: string) => {
		pristineState[id] !== pristine && pristineStateSet({ ...pristineState, [id]: pristine });
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
					{/* TODO: disabled is bad practice.. error message instead */}
					<Button label="Registrieren" type="submit" disabled={!formValid} />
				</form>
			</div>
		</PageWrapper>
	);
};

export default Registration;
