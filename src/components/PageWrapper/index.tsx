import React from 'react';
import { FC, ReactNode } from 'react';

interface PageWrapperProps {
	children?: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }: PageWrapperProps) => {
	return (
		<>
			<header className="text-center w-full px-6">
				<strong className="text-2xl">Kulturdatenbank APP</strong>
			</header>
			<main className="w-full max-w-desktop m-auto">{children}</main>
		</>
	);
};

export default PageWrapper;
