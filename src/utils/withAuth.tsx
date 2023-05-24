import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from 'typescript-cookie';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
	const Wrapper = (props: any) => {
		const router = useRouter();
		const authToken = getCookie('authToken');
		console.log('cookies', authToken);

		//Can I prevent the dashboard from rendering before reroute
		useEffect(() => {
			if (!authToken) {
				router.push('/login');
			}
		}, [authToken, router]);

		return <WrappedComponent {...props} />;
	};

	return Wrapper;
};

export default withAuth;
