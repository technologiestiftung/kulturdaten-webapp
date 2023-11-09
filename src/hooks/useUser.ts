import apiClient from "@api/client";
import { Organization } from "@api/client/models/Organization";
import ROUTES from "@common/routes";
import { UserContext } from "@contexts/userContext";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function useUser() {
	const router = useRouter();
	const { loginData, activeOrganization, activeRole, selectOrganization, storeLoginResponse, clearLoginData } =
		useContext(UserContext);
	const logOut = async () => {
		await router.push(ROUTES.login());
		clearLoginData();
	};
	const logIn = async (email: string, password: string) => {
		const loginResponse = await apiClient.authentication.postAuthenticationLogin({
			email: email.toLowerCase(),
			password,
		});
		storeLoginResponse(loginResponse);
		router.push("/");
	};
	const handleSelectOrganization = (organization: Organization | null) => {
		selectOrganization(organization);
		router.push("/");
	};
	return {
		logIn,
		logOut,
		user: loginData?.user || null,
		organizations: loginData?.organizations || [],
		activeRole,
		activeOrganization,
		selectOrganization: handleSelectOrganization,
	};
}
