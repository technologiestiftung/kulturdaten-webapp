import React, { FC, ReactNode } from 'react';

interface ContentWrapperProps {
	children?: ReactNode;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children }: ContentWrapperProps) => {
	return <div className="flex justify-center flex-col px-6">{children}</div>;
};

export default ContentWrapper;
