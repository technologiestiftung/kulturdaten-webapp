import React, { createContext, FC, ReactNode, useState } from 'react';
import { Auth, User } from '../generated-api-client';

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
	const [authToken, authTokenSet] = useState<AuthCredentials | null>(null);
	const [userObject, userObjectSet] = useState<any>(null);

	const saveAuthObject = (authObject: Auth) => {
		authTokenSet({
			authToken: authObject.authToken,
			expiresIn: authObject.expiresIn,
			expiringDate: authObject.expiringDate,
		});
		userObjectSet(authObject.user);
	};

	const clearUser = () => {
		authTokenSet(null);
		userObjectSet(null);
	};

	return (
		<UserContext.Provider value={{ authToken, saveAuthObject, userObject, clearUser }}>
			{children}
		</UserContext.Provider>
	);
};
