import {
	KolAlert,
	KolButton,
	KolForm,
	KolInputCheckbox,
	KolInputPassword,
	KolInputText,
	KolLink,
} from '@public-ui/react';
import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import { UserContext } from '../../contexts/userContext';
import { InputTypeOnDefault, KoliBriFormCallbacks } from '@public-ui/components';
import { validateEmail, validatePassword, validatePasswordRepeat } from './validation';
import { UsersService } from '../../generated-api-client';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const Registration = () => {
	const { registered, register } = React.useContext(UserContext);

	interface ErrorState {
		email: string | undefined;
		mainPasswort: string | undefined;
		repeatPasswort: string | undefined;
	}

	const initialErrorState: ErrorState = {
		email: '',
		mainPasswort: '',
		repeatPasswort: '',
	};

	interface PristineState {
		email: boolean;
		mainPasswort: boolean;
		repeatPasswort: boolean;
	}

	const initialPristineState: PristineState = {
		email: true,
		mainPasswort: true,
		repeatPasswort: true,
	};

	const [email, emailSet] = React.useState<string>('');
	const [mainPassword, mainPasswordSet] = React.useState<string>('');
	const [passwordRepeat, passwordRepeatSet] = React.useState<string>('');
	const [errorState, errorStateSet] = React.useState<ErrorState>(initialErrorState);
	const [pristine, pristineSet] = React.useState<PristineState>(initialPristineState);

	const createUser = async () => {
		if (
			!Object.values(pristine).includes(true) &&
			Object.values(errorState).reduce((acc, curr) => acc + curr, '').length === 0
		) {
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
			console.log('errors');
		}
	};

	const submit: KoliBriFormCallbacks = {
		onSubmit: (event: Event) => {
			createUser();
		},
	};

	const on = {
		onChange: (event: Event, value: string) => {
			const target = event.target as HTMLInputElement;
			console.log(target);
			switch (target.id) {
				case 'email':
					emailSet(value);
					if (errorState.email !== '') {
						errorStateSet({ ...errorState, email: validateEmail(email) });
					}
					break;
				// case 'mainPasswort':
				// 	mainPasswordSet(value);
				// 	if (errorState.mainPasswort !== '') {
				// 		errorStateSet({ ...errorState, mainPasswort: validatePassword(mainPassword) });
				// 	}
				// 	break;
				// case 'repeatPasswort':
				// 	passwordRepeatSet(value);
				// 	if (errorState.repeatPasswort !== '') {
				// 		errorStateSet({
				// 			...errorState,
				// 			repeatPasswort: validatePasswordRepeat(mainPassword, passwordRepeat),
				// 		});
				// 	}
				// 	break;
				default:
					break;
			}
		},
		onBlur: (event: Event) => {
			const target = event.target as HTMLInputElement;
			pristineSet({ ...pristine, [target.id]: false });
			switch (target.id) {
				case 'email':
					errorStateSet({ ...errorState, email: validateEmail(email) });
					validateEmail(email);
					break;
				case 'mainPasswort':
					errorStateSet({ ...errorState, mainPasswort: validatePassword(mainPassword) });
					break;
				case 'repeatPasswort':
					errorStateSet({
						...errorState,
						repeatPasswort: validatePasswordRepeat(mainPassword, passwordRepeat),
					});
					break;
				default:
			}
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
							_error={errorState.email}
							_touched={!pristine.email}
						>
							E-Mail
							<KolAlert slot="export">Hello</KolAlert>
						</KolInputText>
						<KolInputPassword
							_id="mainPasswort"
							_on={on as InputTypeOnDefault}
							_required
							_name="mainPasswort"
							_error={errorState.mainPasswort}
							_placeholder="mind. 8 Zeichen"
							_touched={!pristine.mainPasswort}
						>
							Passwort
						</KolInputPassword>
						<KolInputPassword
							_id="repeatPasswort"
							_on={on as InputTypeOnDefault}
							_required
							_name="repeatPasswort"
							_error={errorState.repeatPasswort}
							_placeholder="mind. 8 Zeichen"
							_touched={!pristine.repeatPasswort}
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
