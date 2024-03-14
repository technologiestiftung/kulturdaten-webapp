import ROUTES from "@common/routes";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: ROUTES.locations(),
			permanent: true,
		},
	};
};

export default function NoPage() {
	return null;
}
