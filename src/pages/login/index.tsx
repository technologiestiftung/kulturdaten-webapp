import React, { FC, useState } from 'react';
import PageWrapper from '@components/PageWrapper';
import { Input } from '@components/InputField';
import { Auth, AuthService } from '../../generated-api-client';
import { Button } from '@components/Button';
import { useRouter } from 'next/router';
import { validateEmail } from '../registration/validation';
import { UserContext } from '../../contexts/userContext';
import { setCookie } from 'typescript-cookie';

interface ErrorMessages {
	general: string | undefined;
	email: string | undefined;
}

const initialErrorMessages: ErrorMessages = {
	general: undefined,
	email: undefined,
};

const LoginPage: FC = () => {
	const [email, emailSet] = useState<string>('');
	const [password, passwordSet] = useState<string>('');
	const [errorMessages, errorMessagesSet] = useState<ErrorMessages>(initialErrorMessages);
	const [emailPristine, emailPristineSet] = useState<boolean>(true);

	const router = useRouter();
	const { saveAuthObject } = React.useContext(UserContext);

	const onEmailChange = (value: string) => {
		const emailValid = validateEmail(value);
		errorMessagesSet({ ...errorMessages, email: emailValid });
		emailSet(value);
	};

	const onPasswordChange = (value: string) => {
		errorMessagesSet(initialErrorMessages);
		passwordSet(value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailValid = validateEmail(email);
		errorMessagesSet({ ...initialErrorMessages, email: emailValid ? emailValid : undefined });
		try {
			const authObject: Auth = await AuthService.postAuthToken({
				email: email.toLowerCase(),
				password,
			});
			console.log('Login successful');
			if (authObject?.authToken) {
				setCookie('authToken', authObject.authToken, {
					expires: authObject.expiringDate ? new Date(authObject.expiringDate) : undefined,
					path: '/',
				});
				saveAuthObject(authObject);
				router.push('/');
			}
		} catch (error: any) {
			console.error('Error logging in:', error);
			// Object.keys(error).map((key) => {
			// 	console.log(key, error[key]);
			// });
			if (error.status) {
				console.log('server error', error.status);
				errorMessagesSet({
					...errorMessages,
					general: `Login fehlgeschlagen, ${error.status}`,
				});
			} else {
				errorMessagesSet({ ...errorMessages, general: 'Verbindung fehlgeschlagen' });
			}
		}
	};

	return (
		<PageWrapper>
			<div className="w-full max-w-110 desktop:max-w-130">
				<h1>Bei kulturdaten.berlin einloggen</h1>
				<p className="mt-2 mb-8">
					kulturdaten.berlin ist kostenlos - und macht deine Programminfos einfacher zugänglich!
				</p>
				<form onSubmit={handleLogin}>
					<Input
						type="email"
						id="email"
						label={'Email'}
						required
						placeholder={'Hier bitte Email eingeben … '}
						errorMessage={emailPristine ? undefined : errorMessages.email}
						onChange={(value) => onEmailChange(value)}
						setPristine={emailPristineSet}
					/>
					<Input
						type="password"
						id="password"
						label={'Password'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value) => onPasswordChange(value)}
					/>
					<Button type="submit" label="Login" />
				</form>
				{errorMessages.general && <p aria-live="assertive">{errorMessages.general}</p>}
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
