import { FC, ReactNode } from 'react';

interface PageWrapperProps {
	children?: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }: PageWrapperProps) => {
	return (
		<>
			<header className="text-center">
				<strong className="text-2xl">Kulturdatenbank APP</strong>
			</header>
			<main className="flex w-xl max-w-7xl text-center">
				<div>{children}</div>
			</main>
		</>
	);
};

export default PageWrapper;
