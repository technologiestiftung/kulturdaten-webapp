import React, { FC, useState } from 'react';
import PageWrapper from '@components/PageWrapper';
import { Input } from '@components/InputField';
import { AuthService } from '../../generated-api-client';
import { Button } from '@components/Button';
import { useRouter } from 'next/router';

const LoginPage: FC = () => {
	const [email, emailSet] = useState('');
	const [password, passwordSet] = useState('');
	const [error, errorSet] = useState<string>('');

	const router = useRouter();

	const onEmailChange = (value: string, pristine: boolean, error: string | null) => {
		errorSet('');
		emailSet(value);
	};

	const onPasswordChange = (value: string) => {
		errorSet('');
		passwordSet(value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		errorSet('');
		try {
			const authToken = await AuthService.postAuthToken({ email, password });
			console.log('Login successful', authToken);
			router.push('/');
		} catch (error: any) {
			console.error('Error logging in:', error);

			Object.keys(error).map((key) => {
				console.log(key, error[key]);
			});
			if (error.status) {
				console.log('server error', error.status);
				switch (error.status) {
					case 401:
						errorSet('Login fehlgeschlagen');
						break;
					default:
						errorSet('Unbekannter Fehler');
				}
			} else {
				errorSet('Verbindung fehlgeschlagen');
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
						onChange={(value, pristine, error) => onEmailChange(value, pristine, error)}
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
				{error && <p aria-live="assertive">{error}</p>}
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
