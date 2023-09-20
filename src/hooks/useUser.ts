import apiClient from "@api/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import { removeCookie, setCookie } from "typescript-cookie";
import { UserContext } from "../contexts/userContext";

export default function useUser() {
	const router = useRouter();
	const { userObject, clearUser, saveAuthObject } = useContext(UserContext);
	const logOut = async () => {
		removeCookie("accessToken");
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
			setCookie("accessToken", loginResponseData.accessToken, {
				// TODO: Calculate expiry date via loginResponseData.expiresIn.
				// expires: loginResponseData.expiresIn ? new Date(loginResponseData.expiresIn) : undefined,
				path: "/",
			});
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
