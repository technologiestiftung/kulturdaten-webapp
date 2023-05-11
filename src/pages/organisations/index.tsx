import { Button, Table, TableProps } from '@nextui-org/react';
import { Spacer } from '@nextui-org/react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import React, { useState } from 'react';
import PageWrapper from '@components/PageWrapper';
import ContentWrapper from '@components/ContentWrapper';
import { OrganisationTable } from '../../components/Table/OrganisationTable';

export interface CulturalOrganization {
	id: number;
	name: {
		de: string;
	};
	description: {
		de: string;
	};
	address: {
		'@type': string;
		streetAddress: string;
		addressLocality: string;
		postalCode: string;
		description: string;
	};
	contactPoint: {
		'@type': string;
		name: {
			de: string;
		};
		telephone: string;
		email: string;
	}[];
	website: string;
	email: string;
	telephone: string;
	categories: {
		inDefinedTermSet: {
			label: string;
			targetType: string;
			identifier: string;
			url: string;
			additionalProp1?: {};
		};
		term: {
			de: string;
		};
	}[];
}

const culturalOrganizations: CulturalOrganization[] = [
	{
		id: 1,
		name: {
			de: 'Staatliche Museen zu Berlin',
		},
		description: {
			de: 'Die Staatlichen Museen zu Berlin bilden ein Universalmuseum zur Bewahrung, Erforschung und Vermittlung von Kunst- und Kulturschätzen. ',
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Bodestraße 1-3',
			addressLocality: 'Berlin',
			postalCode: '10178',
			description: 'Altes Museum',
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				name: {
					de: 'Besucherservice',
				},
				telephone: '+49 30 266 424 242',
				email: 'service@smb.museum',
			},
		],
		website: 'https://www.smb.museum',
		email: 'service@smb.museum',
		telephone: '+49 30 266 424 242',
		categories: [
			{
				inDefinedTermSet: {
					label: 'Kultur',
					targetType: 'https://schema.org/DefinedTermSet',
					identifier: 'http://d-nb.info/standards/elementset/gnd#concepts-classes-topics',
					url: 'https://www.dnb.de/DE/Professionell/Standardisierung/GND/gnd_node.html',
					additionalProp1: {},
				},
				term: {
					de: 'Museum',
				},
			},
		],
	},
	{
		id: 2,
		name: {
			de: 'Deutsches Theater Berlin',
		},
		description: {
			de: 'Das Deutsche Theater Berlin ist ein Schauspielhaus in der Schumannstraße im Ortsteil Mitte in Berlin.',
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Schumannstraße 13a',
			addressLocality: 'Berlin',
			postalCode: '10117',
			description: 'Deutsches Theater',
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				name: {
					de: 'Theaterkasse',
				},
				telephone: '+49 30 285 99 444',
				email: 'kasse@deutschestheater.de',
			},
		],
		website: 'https://www.deutschestheater.de',
		email: 'kasse@deutschestheater.de',
		telephone: '+49 30 285 99 444',
		categories: [
			{
				inDefinedTermSet: {
					label: 'Kultur',
					targetType: 'https://schema.org/DefinedTermSet',
					identifier: 'http://d-nb.info/standards/elementset/gnd#concepts-classes-topics',
					url: 'https://www.dnb.de/DE/Professionell/Standardisierung/GND/gnd_node.html',
					additionalProp1: {},
				},
				term: {
					de: 'Theater',
				},
			},
		],
	},
	{
		id: 3,
		name: {
			de: 'Stadttheater Berlin',
		},
		description: {
			de: 'Ein renommiertes Theater in Berlin.',
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Musterstraße 1',
			addressLocality: 'Berlin',
			postalCode: '10117',
			description: 'Die Adresse des Theaters',
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				name: {
					de: 'Kartenreservierung',
				},
				telephone: '+49 30 123456',
				email: 'karten@stadttheater-berlin.de',
			},
			{
				'@type': 'ContactPoint',
				name: {
					de: 'Theaterleitung',
				},
				telephone: '+49 30 123456',
				email: 'info@stadttheater-berlin.de',
			},
		],
		website: 'https://www.stadttheater-berlin.de',
		email: 'info@stadttheater-berlin.de',
		telephone: '+49 30 123456',
		categories: [
			{
				inDefinedTermSet: {
					label: 'Theater',
					targetType: 'string',
					identifier: '1',
					url: 'https://www.stadttheater-berlin.de/category/theater',
				},
				term: {
					de: 'Theater',
				},
			},
		],
	},
	{
		id: 4,
		name: {
			de: 'Technologiestiftung Berlin',
		},
		description: {
			de: 'Die Technologiestiftung Berlin ist eine unabhängige gemeinnützige Organisation, die innovative Ideen und Projekte fördert und so das Wachstum von Wissenschaft und Wirtschaft in Berlin unterstützt.',
		},
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Grunewaldstraße 61-62',
			addressLocality: 'Berlin',
			postalCode: '10825',
			description: 'Hauptsitz der Technologiestiftung Berlin',
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				name: {
					de: 'Kontaktstelle',
				},
				telephone: '+49 30 46302-500',
				email: 'info@technologiestiftung-berlin.de',
			},
		],
		website: 'https://www.technologiestiftung-berlin.de/',
		email: 'info@technologiestiftung-berlin.de',
		telephone: '+49 30 46302-500',
		categories: [
			{
				inDefinedTermSet: {
					label: 'Kategorie',
					targetType: 'DefinedTermSet',
					identifier: 'category',
					url: 'https://www.technologiestiftung-berlin.de/',
					additionalProp1: {},
				},
				term: {
					de: 'Technologie',
				},
			},
		],
	},
];

const destructuredCulturalOrganizations = culturalOrganizations.map((culturalOrganization) => {
	const { id, name, description, address, contactPoint, website, email, telephone, categories } =
		culturalOrganization;

	return {
		id,
		name: name.de,
		address: address.streetAddress + ', ' + address.postalCode + ' ' + address.addressLocality,
		contactPoint,
		website,
		email,
		phone: telephone,
		categories,
	};
});

const columns = [
	{ field: 'name', headerName: 'NAME', flex: 2 },
	{ field: 'website', headerName: 'WEBSITE', flex: 1 },
	{ field: 'address', headerName: 'ADDRESS', width: 350 },
	{ field: 'phone', headerName: 'PHONE', minWidth: 200 },
];

const Organisations = () => {
	const [organisations, organisationsSet] = useState(destructuredCulturalOrganizations);
	const [selectedMUI, selctedMUISet] = useState(null);
	const [selectedNextUI, selectedNextUISet] = useState(null);

	const sortAlphabetically = (
		arr: typeof destructuredCulturalOrganizations,
		key: string,
		reverse: boolean = false
	) => {
		const copiedArr = [...arr];
		const sorted = copiedArr.sort((a, b) => {
			let nameA = a[key].toUpperCase();
			let nameB = b[key].toUpperCase();
			if (nameA < nameB) {
				return -1;
			} else {
				return 1;
			}
		});
		organisationsSet(reverse ? sorted.reverse() : sorted);
	};

	return (
		<PageWrapper>
			<ContentWrapper>
				<h1>TailwindUI</h1>
				<OrganisationTable
					headers={columns.map((column) => column.headerName)}
					organisations={destructuredCulturalOrganizations}
				/>
				<Spacer y={5} />
				<h1>NextUI</h1>
				<Table
					aria-label="Example table with static content"
					selectionMode="single"
					css={{
						height: 'auto',
						minWidth: '100%',
					}}
				>
					<Table.Header>
						{columns.map((column) => (
							<Table.Column key={column.field}>{column.headerName}</Table.Column>
						))}
					</Table.Header>
					<Table.Body>
						{organisations.map((organisation) => (
							<Table.Row key={organisation.name}>
								<Table.Cell>{organisation.name}</Table.Cell>
								<Table.Cell>{organisation.website}</Table.Cell>
								<Table.Cell>{`${organisation.address}`}</Table.Cell>
								<Table.Cell>{organisation.phone}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Spacer y={5} />
				<h1>MaterialUI-DataGrid</h1>
				<button
					className="text-black border"
					onClick={() => sortAlphabetically(organisations, 'name')}
				>
					Sort Alphabetically
				</button>
				<Spacer y={1} />
				<button
					className="text-black border"
					onClick={() => sortAlphabetically(organisations, 'name', true)}
				>
					Sort Alphabetically Reverse
				</button>
				<Spacer y={2} />
				<DataGrid
					rows={organisations}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					checkboxSelection
				/>
			</ContentWrapper>
		</PageWrapper>
	);
};

export default Organisations;
