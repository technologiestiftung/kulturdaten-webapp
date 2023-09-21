import apiClient from "@api/client";
import { clearAccessToken, storeAccessToken } from "@utils/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function useUser() {
	const router = useRouter();
	const { userObject, clearUser, saveAuthObject } = useContext(UserContext);
	const logOut = async () => {
		clearAccessToken();
		await router.push("/login");
		clearUser();
	};
	const logIn = async (email: string, password: string) => {
		const loginResponse = await apiClient.authentication.postAuthenticationLogin({
			email: email.toLowerCase(),
			password,
		});
		const loginResponseData = loginResponse.data;
		if (loginResponseData?.accessToken) {
			storeAccessToken(loginResponseData.accessToken);
			saveAuthObject(loginResponseData);
			router.push("/");
		}
	};
	return {
		logIn,
		logOut,
		user: userObject,
	};
}
