export const ERROR_URL_PARAMETER = "error";

const ROUTES = {
	login: (errorMessage?: string) => {
		const route = "/login";
		if (errorMessage) {
			return `${route}?${ERROR_URL_PARAMETER}=${encodeURI(errorMessage)}`;
		}
		return route;
	},
	registration: () => "/registration",
	attractions: () => "/attractions",
	attractionDetails: (identifier: string) => `/attractions/${identifier}`,
	attractionCreate: () => `/attractions/create`,
	locations: () => "/locations",
	locationDetails: (identifier: string) => `/locations/${identifier}`,
	locationCreate: () => `/locations/create`,
	organizations: () => "/organizations",
	organizationDetails: (identifier: string) => `/organizations/${identifier}`,
	organizationCreate: () => `/organizations/create`,
	users: () => "/users",
};

export default ROUTES;
