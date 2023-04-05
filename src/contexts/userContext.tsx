import React, { createContext, FC, ReactNode, useState } from 'react';

type UserContextType = {
	registered: boolean;
	register: () => void;
};

export const UserContext = createContext<UserContextType>({
	registered: false,
	register: () => undefined,
});

type UserContextProviderProps = {
	children?: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }: UserContextProviderProps) => {
	const [registered, setRegistered] = useState<boolean>(false);
	// useEffect to fetch userdata from API

	const register = () => {
		console.log('register');
		setRegistered(true);
	};
	return <UserContext.Provider value={{ registered, register }}>{children}</UserContext.Provider>;
};
