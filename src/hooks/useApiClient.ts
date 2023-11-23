import { createAuthorizedClient } from "@api/client";
import { getAccessToken } from "@services/auth";
import { useMemo } from "react";

export default function useApiClient() {
	const accessToken = useMemo(() => getAccessToken(), []);
	if (!accessToken) {
		// TODO: Handle error (e.g. redirect to login page).
		throw new Error("No access token found");
	}
	const apiClient = useMemo(() => createAuthorizedClient(accessToken), [accessToken]);
	return apiClient;
}
