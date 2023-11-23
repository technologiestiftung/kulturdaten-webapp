import { Role } from "@contexts/UserContext";
import { jwtDecode } from "jwt-decode";
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
		return null;
	}
	const accessToken = cookieString
		.split("; ")
		.find((c) => c.startsWith(`${ACCESS_TOKEN_COOKIE_NAME}=`))
		?.split("=")[1];
	if (!accessToken) {
		return null;
	}
	return accessToken;
}

type DecodedAccessToken = {
	identifier: string;
	organizationIdentifier: string;
	role: Role;
	permissionFlags: number;
	iat: number;
	exp: number;
};

export function decodeAccessToken(accessToken: string) {
	return jwtDecode(accessToken) as DecodedAccessToken;
}
