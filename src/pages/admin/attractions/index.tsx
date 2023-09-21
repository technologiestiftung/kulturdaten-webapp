import { createAuthorizedClient } from "@api/client";
import { AdminAttraction } from "@api/client/models/AdminAttraction";
import AdminAttractionsPage from "@components/AdminAttractionsPage";
import { PaginationType } from "@components/Pagination";
import { getAccessTokenFromContext } from "@utils/auth";
import { getPagination } from "@utils/pagination";
import withAuth from "@utils/withAuth";
import { GetServerSideProps } from "next";

interface Props {
	attractions: AdminAttraction[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const accessToken = getAccessTokenFromContext(context);
	const apiClient = createAuthorizedClient(accessToken);
	const { page, pageSize } = getPagination(context.query);
	const response = await apiClient.admin.getAdminAttractions(page, pageSize);
	const data = response.data!;
	const attractions = data.attractions || [];
	const pagination: PaginationType = {
		page: data.page!,
		pageSize: data.pageSize!,
		totalCount: data.totalCount!,
	};
	return {
		props: {
			attractions,
			pagination,
			messages: (await import(`../../../../i18n/${context.locale}.json`)).default,
		},
	};
};

export default withAuth(AdminAttractionsPage);
