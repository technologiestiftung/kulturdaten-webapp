const ROUTES = {
	login: () => "/login",
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
