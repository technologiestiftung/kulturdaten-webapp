import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';
import Cookies from 'universal-cookie';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
	const Wrapper = (props: any) => {
		const router = useRouter();
		const [loading, setLoading] = useState<boolean>(true);

		useEffect(() => {
			const authToken = getCookie('authToken');
			if (!authToken) {
				console.log('No authToken found, redirecting to login'); // debug statement
				router.push('/login');
			} else {
				console.log('authToken:', authToken); // debug statement
				setLoading(false);
			}
		}, [router]);

		if (loading) {
			return <div>Loading...</div>;
		}
		return <WrappedComponent {...props} />;
	};

	return Wrapper;
};

export default withAuth;
