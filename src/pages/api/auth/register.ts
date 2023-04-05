//Here comes the regiter API-call

import { NextApiRequest, NextApiResponse } from 'next';

export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { email, password } = req.body;

	try {
		const resp = await fetch('someURL', {
			method: 'POST',
			//headers: req.headers,
			body: JSON.stringify(req.body, null, 2),
		}).catch((e: ErrorEvent) => {
			throw e;
		});
	} catch (e) {
		throw e;
	}

	res.json(req.body);
};
