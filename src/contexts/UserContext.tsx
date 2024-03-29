import { LoginResponse } from "@api/client/models/LoginResponse";
import { Organization } from "@api/client/models/Organization";
import ROUTES from "@common/routes";
import { Role } from "@common/types";
import { clearAccessToken, getAccessToken, storeAccessToken } from "@services/auth";
import { useRouter } from "next/router";
import { FC, ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

type LoginData = Required<LoginResponse>["data"];

const STORAGE_KEY = "login-response";

type UserContextType = {
	loginData: LoginData | null;
	activeOrganization: Organization | null;
	activeRole: Role | null;
	storeLoginResponse: (loginResponse: LoginResponse) => void;
	selectOrganization: (organization: Organization | null) => void;
	clearLoginData: () => void;
};

export const UserContext = createContext<UserContextType>({
	loginData: null,
	activeOrganization: null,
	activeRole: null,
	storeLoginResponse: () => {},
	selectOrganization: () => {},
	clearLoginData: () => {},
});

type UserContextProviderProps = {
	children?: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
	const router = useRouter();
	const [loginData, setLoginData] = useState<LoginData | null>(null);
	const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);
	const [activeRole, setActiveRole] = useState<Role | null>(null);

	const reloadFromToken = useCallback(
		(existingAccessToken: string, loginData: LoginData) => {
			const matchingAccessToken = loginData.accessTokens.find(
				(accessToken) => accessToken.token === existingAccessToken,
			);
			if (!matchingAccessToken) {
				// No matching access token found, clear data and return to login.
				clearLoginData();
				router.push(ROUTES.login());
				return;
			}
			const organizationIdentifier = matchingAccessToken.decodedToken!.organizationIdentifier;
			const selectedOrganization = loginData.organizations!.find(
				(organization) => organization.identifier === organizationIdentifier,
			)!;
			setActiveOrganization(selectedOrganization);
			setActiveRole(matchingAccessToken.decodedToken!.role!);
		},
		[router],
	);

	const clearLoginData = () => {
		localStorage.removeItem(STORAGE_KEY);
		setLoginData(null);
		setActiveOrganization(null);
		clearAccessToken();
	};

	const value = useMemo<UserContextType>(() => {
		const initializeOrganizations = (loginData: LoginData | null) => {
			const initialOrganization = loginData?.organizations?.[0] || null;
			setActiveOrganization(initialOrganization);
			if (initialOrganization) {
				const matchingToken = loginData!.accessTokens.find(
					(token) => token.decodedToken!.organizationIdentifier === initialOrganization.identifier,
				);
				storeAccessToken(matchingToken!.token);
				setActiveRole(matchingToken!.decodedToken!.role!);
			} else {
				const accessToken = loginData!.accessTokens[0].token;
				storeAccessToken(accessToken);
				setActiveRole(null);
			}
		};

		const storeLoginResponse = (loginResponse: LoginResponse) => {
			const loginData = loginResponse.data!;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(loginData));
			setLoginData(loginData);
			initializeOrganizations(loginData);
		};

		const selectOrganization = (organization: Organization | null) => {
			setActiveOrganization(organization);
			if (organization) {
				const matchingToken = loginData!.accessTokens.find(
					(token) => token.decodedToken!.organizationIdentifier! === organization.identifier,
				)!;
				storeAccessToken(matchingToken.token);
				setActiveRole(matchingToken.decodedToken!.role!);
			} else {
				clearAccessToken();
				setActiveRole(null);
			}
		};

		return {
			loginData,
			activeOrganization,
			activeRole,
			selectOrganization,
			storeLoginResponse,
			clearLoginData,
		};
	}, [loginData, activeOrganization, activeRole]);

	useEffect(() => {
		const loginDataString = localStorage.getItem(STORAGE_KEY);
		const loginData = loginDataString ? (JSON.parse(loginDataString) as LoginData) : null;
		setLoginData(loginData);
		const existingAccessToken = getAccessToken();
		if (existingAccessToken && loginData) {
			reloadFromToken(existingAccessToken, loginData);
		}
	}, [reloadFromToken]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
