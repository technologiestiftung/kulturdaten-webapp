import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
	const Wrapper = (props: any) => {
		const router = useRouter();
		const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

		useEffect(() => {
			if (!authToken) {
				router.push('/login');
			} else {
				console.log('TOKEN', JSON.parse(authToken).token);
			}
		}, [authToken, router]);

		return <WrappedComponent {...props} />;
	};

	return Wrapper;
};

export default withAuth;
