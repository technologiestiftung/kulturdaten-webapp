import { GetServerSidePropsContext } from "next";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export function storeAccessToken(accessToken: string) {
	setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
		// TODO: Calculate expiry date via loginResponseData.expiresIn.
		// expires: loginResponseData.expiresIn ? new Date(loginResponseData.expiresIn) : undefined,
		path: "/",
	});
}

export function getAccessToken() {
	return getCookie(ACCESS_TOKEN_COOKIE_NAME);
}

export function clearAccessToken() {
	removeCookie(ACCESS_TOKEN_COOKIE_NAME);
}

export function getAccessTokenFromContext(context: GetServerSidePropsContext) {
	const cookieString = context.req.headers.cookie;
	if (!cookieString) {
		throw new Error("No cookie string found");
	}
	const accessToken = cookieString
		.split("; ")
		.find((c) => c.startsWith(`${ACCESS_TOKEN_COOKIE_NAME}=`))
		?.split("=")[1];
	if (!accessToken) {
		throw new Error("No access token found");
	}
	return accessToken;
}
