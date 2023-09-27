import { APIClient } from "./client/APIClient";
import { OpenAPI } from "./client/core/OpenAPI";

const basePath = process.env.NEXT_PUBLIC_API_BASE_URL || OpenAPI.BASE;

/**
 * Use this client for all API requests.
 */
const apiClient = new APIClient({
	BASE: basePath,
});

export function createAuthorizedClient(accessToken: string) {
	return new APIClient({
		BASE: basePath,
		TOKEN: accessToken,
	});
}

export default apiClient;
