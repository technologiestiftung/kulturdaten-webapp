import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { LoginResponse } from '../api/client/models/LoginResponse';

type Auth = Required<Required<LoginResponse>['data']>;
type User = Auth['user'];

type UserContextType = {
	userObject: User | null;
	saveAuthObject: (authObject: LoginResponse['data']) => void;
	clearUser: () => void;
};

export const UserContext = createContext<UserContextType>({
	userObject: null,
	saveAuthObject: () => {},
	clearUser: () => {},
});

type UserContextProviderProps = {
	children?: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({
	children,
}: UserContextProviderProps) => {
	const [userObject, userObjectSet] = useState<User | null>(null);

	const userContextValue = useMemo(() => {
		const saveAuthObject = (loginResponse: LoginResponse['data']) => {
			if (loginResponse?.user) {
				localStorage.setItem('userObject', JSON.stringify(loginResponse.user));
				userObjectSet(loginResponse.user || null);
			}
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
