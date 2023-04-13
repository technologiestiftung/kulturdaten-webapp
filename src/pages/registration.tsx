import {
	KolButton,
	KolForm,
	KolInputCheckbox,
	KolInputPassword,
	KolInputText,
	KolLink,
} from '@public-ui/react';
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { UserContext } from '../contexts/userContext';
import { InputTypeOnDefault, KoliBriFormCallbacks } from '@public-ui/components';
import { UsersService, CreateUser } from '../generated-api-client';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const Registration = () => {
	const { registered, register } = React.useContext(UserContext);

	const initialErrorState = {
		email: '',
		main_passwort: '',
		repeat_passwort: '',
	};

	const initialPristineState = {
		email: true,
		main_passwort: true,
		repeat_passwort: true,
	};

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = React.useState<string>('');
	const [errors, setErrors] = React.useState(initialErrorState);
	const [pristine, setPristine] = React.useState(initialPristineState);

	const createUser = async () => {
		const body = {
			email,
			password,
			firstName: 'testname', // TODO: to be replaced
			lastName: 'testlastname', // TODO: to be replaced
		};

		try {
			const response = await fetch('/api/registration', {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				console.log('User created successfully');
				register();
			} else {
				const { errors } = await response.json();
				const invalidInputFields = errors.map((error) =>
					error.children.nest.map((child) => child.children.nest.map((child) => child.children.at))
				)[0][0][0];
				console.log('INVALIDS', invalidInputFields);

				//DISPLAY ERRORS AT EQUIVALENT INPUT
				console.error('Failed to create user:', response);
				// Handle error response from server
			}
		} catch (error) {
			console.error('Error creating user:', error);
			// Handle network error
		}
	};

	const submit: KoliBriFormCallbacks = {
		onSubmit: (event: Event) => {
			//TODO: Validation & Error Display
			createUser();
		},
	};

	const on = {
		onChange: (event: Event, value: string) => {
			event.preventDefault();
			const target = event.target as HTMLInputElement;
			switch (target.id) {
				case 'email':
					setEmail(value);
					break;
				case 'main_passwort':
					setPassword(value);
					break;
				case 'repeat_passwort':
					setPasswordRepeat(value);
					break;
				default:
					break;
			}
		},
		onBlur: (event: Event) => {
			event.preventDefault();
			const target = event.target as HTMLInputElement;
			setPristine({ ...pristine, [target.id]: false });
		},
	};

	return (
		<PageWrapper>
			<div className="max-w-lg">
				<h1>Registriere dich jetzt!</h1>
				{registered ? <div>Registriert</div> : <div>Nicht registriert</div>}
				<p className="mt-2 mb-8">
					kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!
				</p>
				<KolForm _on={submit} _requiredText={false}>
					<div className="flex flex-col gap-6">
						<KolInputText
							_id="email"
							_on={on as InputTypeOnDefault}
							_required
							_placeholder="z.B. email@example.com"
							_error="Passwort muss mind. 8 Zeichen lang sein"
							_touched={!pristine.email}
						>
							E-Mail
						</KolInputText>
						<KolInputPassword
							_id="main_passwort"
							_on={on as InputTypeOnDefault}
							_required
							_name="main_passwort"
							_error="Passwort muss mind. 8 Zeichen lang sein"
							_placeholder="mind. 8 Zeichen"
							_touched={!pristine.main_passwort}
						>
							Passwort
						</KolInputPassword>
						<KolInputPassword
							_id="repeat_passwort"
							_on={on as InputTypeOnDefault}
							_required
							_name="repeat_passwort"
							_placeholder="mind. 8 Zeichen"
							_touched={!pristine.repeat_passwort}
						>
							Passwort bestätigen
						</KolInputPassword>
						<KolInputCheckbox _id="checkbox" _required>
							Ich habe die{' '}
							<KolLink _href="#" _label="Nutzungsbedingungen" _target="_blanc"></KolLink> und{' '}
							<KolLink _href="#" _label="Datenschutzerklärung" _target="_blanc"></KolLink> von
							kulturdaten.berlin gelesen und stimme ihnen ausdrücklich zu.
						</KolInputCheckbox>
						<KolButton _label="Registrieren" _variant="primary" _type="submit" />
					</div>
				</KolForm>
			</div>
		</PageWrapper>
	);
};

export default Registration;
