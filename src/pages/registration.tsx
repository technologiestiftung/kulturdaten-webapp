import { KolButton, KolForm, KolInputCheckbox, KolInputPassword, KolInputText, KolLink } from '@public-ui/react';
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { UserContext } from '../contexts/userContext';
import { InputTypeOnDefault, KoliBriFormCallbacks } from '@public-ui/components';
import { UsersApi, UsersPostOperationRequest } from '../generated-api-client';

const usersApi = new UsersApi();

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const Registration = () => {
	const { registered, register } = React.useContext(UserContext);

	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [passwordRepeat, setPasswordRepeat] = React.useState<string>('');

	const createUser = async () => {
		const body: UsersPostOperationRequest = {
			usersPostRequest: {
				email,
				password,
				firstName: 'testgen', //TODO: to be replaced
				lastName: 'test', //TODO: to be replaced
			},
		};

		try {
			await usersApi.usersPost(body); // call the method with the request body
			console.log('User created successfully');
			register();
		} catch (error) {
			console.error('Error creating user:', error); // handle any errors
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
	};

	return (
		<PageWrapper>
			<div className="max-w-lg">
				<h1>Registriere dich jetzt!</h1>
				{registered ? <div>Registriert</div> : <div>Nicht registriert</div>}
				<p className="mt-2 mb-8">kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!</p>
				<KolForm _on={submit} _requiredText={false}>
					<div className="flex flex-col gap-6">
						<KolInputText _id="email" _on={on as InputTypeOnDefault} _required _placeholder="z.B. email@example.com">
							E-Mail
						</KolInputText>
						<KolInputPassword _id="main_passwort" _on={on as InputTypeOnDefault} _required _name="main_passwort" _placeholder="mind. 8 Zeichen">
							Passwort
						</KolInputPassword>
						<KolInputPassword _id="repeat_passwort" _on={on as InputTypeOnDefault} _required _name="repeat_passwort" _placeholder="mind. 8 Zeichen">
							Passwort bestätigen
						</KolInputPassword>
						<KolInputCheckbox _id="checkbox" _required>
							Ich habe die <KolLink _href="#" _label="Nutzungsbedingungen" _target="_blanc"></KolLink> und{' '}
							<KolLink _href="#" _label="Datenschutzerklärung" _target="_blanc"></KolLink> von kulturdaten.berlin gelesen und stimme ihnen ausdrücklich zu.
						</KolInputCheckbox>
						<KolButton _label="Registrieren" _variant="primary" _type="submit" />
					</div>
				</KolForm>
			</div>
		</PageWrapper>
	);
};

export default Registration;
