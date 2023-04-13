import { NextApiRequest, NextApiResponse } from 'next';

import Enforcer from 'openapi-enforcer';
import { OpenAPIV3 } from 'openapi-types';
import { UsersService, CreateUser } from '../../generated-api-client';

const apiSpec: OpenAPIV3.Document = require('/openAPI-specs.yml');

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Erstellen Sie einen Enforcer für Ihre OpenAPI-Spezifikation
	const enforcer = await Enforcer(apiSpec);
	// Verwenden Sie den Enforcer, um die Eingabedaten zu validieren

	const [response, error] = await enforcer.request({
		method: 'POST',
		path: '/users',
		// the body should be parsed by a JSON.parse() prior to passing in (if applicable).
		body: req.body,
	});

	// const errors = error.toString();
	const errors = error.children.nest.filter((child) => child.toString() !== '');

	if (response) {
		try {
			// Validation successful, call createUser method
			await UsersService.postUsers(req.body);
			console.log('User created successfully');
			res.status(200).json({ message: 'User created successfully' });
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(400).json({ error: 'Invalid request data' });
		}
	} else {
		res.statusMessage = error.header;
		res.status(error.statusCode).json({ errors });
		res.end();
	}
};
