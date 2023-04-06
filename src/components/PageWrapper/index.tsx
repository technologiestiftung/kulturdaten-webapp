import { FC, ReactNode } from 'react';

interface PageWrapperProps {
	children?: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }: PageWrapperProps) => {
	return (
		<>
			<header className="text-center w-full">
				<strong className="text-2xl">Kulturdatenbank APP</strong>
			</header>
			<main className="w-full flex w-xl max-w-7xl text-center mx-auto justify-center">
				<div>{children}</div>
			</main>
		</>
	);
};

export default PageWrapper;
