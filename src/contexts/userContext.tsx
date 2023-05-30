import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { Auth } from '../generated-api-client';

type AuthCredentials = {
	[K in keyof Pick<Auth, 'authToken' | 'expiringDate' | 'expiresIn'>]: Auth[K];
};

type UserContextType = {
	authToken?: AuthCredentials | null;
	userObject?: any;
	saveAuthObject: (authToken: Auth) => void;
	clearUser: () => void;
};

export const UserContext = createContext<UserContextType>({
	authToken: null,
	userObject: null,
	saveAuthObject: (authObject: Auth) => {},
	clearUser: () => {},
});

type UserContextProviderProps = {
	children?: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({
	children,
}: UserContextProviderProps) => {
	const [userObject, userObjectSet] = useState<any>(null);

	const userContextValue = useMemo(() => {
		const saveAuthObject = (authObject: Auth) => {
			localStorage.setItem('userObject', JSON.stringify(authObject.user));
			userObjectSet(authObject.user);
		};

		const clearUser = () => {
			localStorage.removeItem('userObject');
			userObjectSet(null);
		};
		return { saveAuthObject, userObject, clearUser };
	}, [userObject]);

	useEffect(() => {
		const user = localStorage.getItem('userObject');
		if (user) {
			userObjectSet(JSON.parse(user));
		}
	}, []);

	return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
