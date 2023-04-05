import { KolButton, KolForm, KolInputPassword, KolInputText } from '@public-ui/react';
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { UserContext } from '../contexts/userContext';

// TODO: mobile screen hook -> https://github.com/technologiestiftung/energiekarte/blob/main/src/lib/hooks/useHasMobileSize/index.ts

const registration = () => {
	const { registered, register } = React.useContext(UserContext);

	const on = {
		onSubmit: () => {
			console.log('submit');
			//API POST REQUEST HAPPENS HERE
			register();
		},
	};

	return (
		<PageWrapper>
			<>
				<h1>Registrierung</h1>
				{registered ? <div>Registriert</div> : <div>Nicht registriert</div>}
				<KolForm _on={on} className="flex flex-col">
					<KolInputText _id="username">Username</KolInputText>
					<KolInputPassword _id="main_passwort" _name="main_passwort">
						Password
					</KolInputPassword>
					<KolButton _label="Submit" _variant="primary" _type="submit" />
				</KolForm>
			</>
		</PageWrapper>
	);
};

export default registration;
