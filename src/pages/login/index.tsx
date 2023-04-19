import { useRouter } from 'next/router';
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
			<form onSubmit={handleLogin}>
				<Input
					type="email"
					label={'email'}
					required
					placeholder={'some@mail.com'}
					onChange={(value, pristine, error) => onEmailChange(value, pristine, error)}
					validate={(value) => validateEmail(value)}
				/>
				<Input
					type="password"
					label={'password'}
					required
					placeholder={'this-super-secret-password'}
					onChange={(value) => onPasswordChange(value)}
					validate={(value) => validatePassword(value)}
				/>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
			{error && <p>{error}</p>}
		</PageWrapper>
	);
};

export default LoginPage;
