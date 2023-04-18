import { NextApiRequest, NextApiResponse } from 'next';

import { UsersService } from '../../generated-api-client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await UsersService.postUsers(req.body);
		console.log('User created successfully');
		res.status(200).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Error creating user:', error);
		res.statusMessage = error.body.msg;
		res.status(error.status).json({ error });
	}
};
