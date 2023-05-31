import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from 'typescript-cookie';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
	const Wrapper = (props: any) => {
		const router = useRouter();
		const [loading, setLoading] = useState<boolean>(true);

		//Can I prevent the dashboard from rendering before reroute
		useEffect(() => {
			const authToken = getCookie('authToken');
			if (!authToken) {
				router.push('/login');
			} else {
				setLoading(false);
			}
		}, [router]);

		if (loading) {
			// Render a loading indicator while waiting for authentication check to complete
			return <div>Loading...</div>;
		}
		return <WrappedComponent {...props} />;
	};

	return Wrapper;
};

export default withAuth;
