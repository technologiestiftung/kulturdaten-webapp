import { NextPage } from "next";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function withAuth<Props>(wrappedComponent: ComponentType<Props>) {
	const WrappedComponent = wrappedComponent;
	const Wrapper: NextPage<Props & JSX.IntrinsicAttributes> = (props) => {
		const router = useRouter();
		const [loading, setLoading] = useState<boolean>(true);

		useEffect(() => {
			const accessToken = getCookie("accessToken");
			if (!accessToken) {
				router.push("/login");
			} else {
				setLoading(false);
			}
		}, [router]);

		if (loading) {
			return <div>Loading...</div>;
		}
		return <WrappedComponent {...props} />;
	};

	return Wrapper;
}
