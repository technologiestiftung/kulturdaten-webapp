import { LoginResponse } from "@api/client/models/LoginResponse";
import { Organization } from "@api/client/models/Organization";
import { clearAccessToken, getAccessToken, storeAccessToken } from "@utils/auth";
import { FC, ReactNode, createContext, useEffect, useMemo, useState } from "react";

type LoginData = Required<LoginResponse>["data"];

const STORAGE_KEY = "login-response";

type UserContextType = {
	loginData: LoginData | null;
	activeOrganization: Organization | null;
	storeLoginResponse: (loginResponse: LoginResponse) => void;
	selectOrganization: (organization: Organization | null) => void;
	clearLoginData: () => void;
};

export const UserContext = createContext<UserContextType>({
	loginData: null,
	activeOrganization: null,
	storeLoginResponse: () => {},
	selectOrganization: () => {},
	clearLoginData: () => {},
});

type UserContextProviderProps = {
	children?: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
	const [loginData, setLoginData] = useState<LoginData | null>(null);
	const [activeOrganization, setActiveOrganization] = useState<Organization | null>(null);

	const initializeOrganizations = (loginData: LoginData | null) => {
		const initialOrganization = loginData?.organizations?.[0] || null;
		setActiveOrganization(initialOrganization);
		if (initialOrganization) {
			const matchingToken = loginData!.accessTokens.find(
				(token) => token.organizationID === initialOrganization.identifier,
			);
			storeAccessToken(matchingToken!.token);
		}
	};

	const restoreOrganizations = (loginData: LoginData) => {
		const existingAccessToken = getAccessToken();
		if (existingAccessToken) {
			const matchingAccessToken = loginData.accessTokens.find(
				(accessToken) => accessToken.token === existingAccessToken,
			);
			const organizationID = matchingAccessToken!.organizationID;
			const selectedOrganization = loginData.organizations!.find(
				(organization) => organization.identifier === organizationID,
			)!;
			setActiveOrganization(selectedOrganization);
		}
	};

	const value = useMemo<UserContextType>(() => {
		const storeLoginResponse = (loginResponse: LoginResponse) => {
			const loginData = loginResponse.data!;
			localStorage.setItem(STORAGE_KEY, JSON.stringify(loginData));
			setLoginData(loginData);
			initializeOrganizations(loginData);
		};

		const clearLoginData = () => {
			localStorage.removeItem(STORAGE_KEY);
			setLoginData(null);
			setActiveOrganization(null);
		};

		const selectOrganization = (organization: Organization | null) => {
			setActiveOrganization(organization);
			if (organization) {
				const matchingToken = loginData!.accessTokens.find((token) => token.organizationID === organization.identifier);
				storeAccessToken(matchingToken!.token);
			} else {
				clearAccessToken();
			}
		};

		return {
			loginData,
			activeOrganization,
			selectOrganization,
			storeLoginResponse,
			clearLoginData,
		};
	}, [activeOrganization, loginData]);

	useEffect(() => {
		const loginDataString = localStorage.getItem(STORAGE_KEY);
		const loginData = loginDataString ? (JSON.parse(loginDataString) as LoginData) : null;
		setLoginData(loginData);
		if (loginData) {
			restoreOrganizations(loginData);
		}
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
