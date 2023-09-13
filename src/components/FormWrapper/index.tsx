import React from "react";
import { FC, ReactNode } from "react";

interface FormWrapperProps {
	children?: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ children }: FormWrapperProps) => {
	return <div className="w-full max-w-tablet mx-auto px-6">{children}</div>;
};

export default FormWrapper;
