import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PageWrapper from '../../components/PageWrapper';
import { Input } from '../../components/input';
import { validateEmail, validatePassword } from '../registration/validation';

const LoginPage = () => {
	const [email, emailSet] = useState('');
	const [password, passwordSet] = useState('');
	const [error, errorSet] = useState<string | null>('');

	const router = useRouter();

	const onEmailChange = (value: string, pristine: boolean, error: string | null) => {
		emailSet(value);
	};

	const onPasswordChange = (value: string) => {
		passwordSet(value);
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('LOGIN');
		e.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (response.status === 200) {
				// Login successful
				console.log('Login successful', data);
				router.push('/');
			} else {
				// Login failed
				console.error('Error logging in:', data.error.statusText);
				errorSet(data.error.statusText);
			}
		} catch (error) {
			console.error('Error logging in:', error);
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
