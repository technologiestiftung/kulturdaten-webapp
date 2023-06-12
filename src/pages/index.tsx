import React, { useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import withAuth from '../utils/withAuth';
import { Button } from '../components/Button';
import { useRouter } from 'next/router';
import { UserContext } from '../contexts/userContext';
import { removeCookie } from 'typescript-cookie';

const Dashboard = () => {
	const router = useRouter();
	const { userObject, clearUser } = React.useContext(UserContext);
	const logout = () => {
		removeCookie('authToken');
		router.push('login').then(() => {
			clearUser();
		});
		console.log('logout');
	};

	console.log('USER', userObject);
	return (
		<div className="container mx-auto my-10 max-w-800px">
			<PageWrapper>
				DASHBOARD
				<h2>
					You are logged in as <span>{`${userObject?.firstName} ${userObject?.lastName}`}</span>
				</h2>
				<Button onClick={logout} label="Logout" />
			</PageWrapper>
		</div>
	);
};

export default withAuth(Dashboard);
