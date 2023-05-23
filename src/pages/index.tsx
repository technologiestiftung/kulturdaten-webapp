import React from 'react';
import PageWrapper from '../components/PageWrapper';
import withAuth from '../utils/withAuth';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';

const Index = () => {
	const router = useRouter();
	const logout = () => {
		localStorage.removeItem('authToken');
		router.push('login');
	};
	return (
		<div className="container mx-auto my-10 max-w-800px">
			<PageWrapper>
				DASHBOARD <h2>You are logged in</h2>
				<Button onClick={logout} label="Logout" />
			</PageWrapper>
		</div>
	);
};

export default withAuth(Index);
