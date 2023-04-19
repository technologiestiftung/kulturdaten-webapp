import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Input } from '../../components/input';
import { validateEmail, validatePassword } from '../registration/validation';
import { AuthService } from '../../generated-api-client';

const LoginPage = () => {
	const [email, emailSet] = useState('');
	const [password, passwordSet] = useState('');
	const [error, errorSet] = useState<string>('');

	const onEmailChange = (value: string, pristine: boolean, error: string | null) => {
		emailSet(value);
	};

	const onPasswordChange = (value: string) => {
		passwordSet(value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const authToken = await AuthService.postAuthToken({ email, password });
			console.log('Login successful', authToken);
		} catch (error) {
			console.error('Error logging in:', error);
			Object.keys(error).map((key) => {
				console.log(key, error[key]);
			});
			errorSet(error.statusText);
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
						label={'Email'}
						required
						placeholder={'Hier bitte Email eingeben … '}
						onChange={(value, pristine, error) => onEmailChange(value, pristine, error)}
						validate={(value) => validateEmail(value)}
					/>
					<Input
						type="password"
						label={'Password'}
						required
						placeholder={'Hier bitte Passwort eingeben … '}
						onChange={(value) => onPasswordChange(value)}
						validate={(value) => validatePassword(value)}
					/>
					<button data-type="submit" className="btn">
						Login
					</button>
				</form>
				{error && <p>{error}</p>}
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
