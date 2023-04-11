import { KolButton, KolForm, KolInputCheckbox, KolInputPassword, KolInputText, KolLink } from '@public-ui/react';
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { UserContext } from '../contexts/userContext';
import { InputTypeOnDefault, KoliBriFormCallbacks } from '@public-ui/components';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const registration = () => {
	const { registered, register } = React.useContext(UserContext);

	const submit: KoliBriFormCallbacks = {
		onSubmit: (event: Event) => {
			console.log('submit');
			console.log('event: ', event);
			//API POST REQUEST HAPPENS HERE
			register();
		},
	};

	const on = {
		onChange: (event: Event, value: string) => {
			const inputField = event;
			console.log('input: ', inputField);
			console.log('value: ', value);
			console.log('event: ', event);
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
						<KolInputPassword _id="main_passwort" _required _name="main_passwort" _placeholder="mind. 8 Zeichen">
							Passwort
						</KolInputPassword>
						<KolInputPassword _id="repeat_passwort" _required _name="repeat_passwort" _placeholder="mind. 8 Zeichen">
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

export default registration;
