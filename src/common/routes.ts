const ROUTES = {
	user: {
		attractions: () => "/",
	},
	admin: {
		attractions: () => "/admin/attractions",
		attractionDetails: (identifier: string) => `/admin/attractions/${identifier}`,
		attractionCreate: () => `/admin/attractions/create`,
		locations: () => "/admin/locations",
		locationDetails: (identifier: string) => `/admin/locations/${identifier}`,
		locationCreate: () => `/admin/locations/create`,
		organizations: () => "/admin/organizations",
		organizationDetails: (identifier: string) => `/admin/organizations/${identifier}`,
		organizationCreate: () => `/admin/organizations/create`,
	},
};

export default ROUTES;
