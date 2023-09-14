import withAuth from "@utils/withAuth";
import { useRouter } from "next/router";
import React from "react";
import { removeCookie } from "typescript-cookie";
import { Button } from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import { UserContext } from "../contexts/userContext";

const Dashboard = () => {
	const router = useRouter();
	const { userObject, clearUser } = React.useContext(UserContext);
	const logout = () => {
		removeCookie("accessToken");
		router.push("login").then(() => {
			clearUser();
		});
	};
	return (
		<div className="container mx-auto my-10 max-w-800px">
			<PageWrapper>
				DASHBOARD
				<h2>You are logged in{userObject ? ` as ${userObject.firstName} ${userObject.lastName}` : ""}</h2>
				<Button onClick={logout} label="Logout" />
			</PageWrapper>
		</div>
	);
};

export default withAuth(Dashboard);
