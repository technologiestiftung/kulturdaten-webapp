import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '../../generated-api-client';

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
	// Extract email and password from request body
	try {
		const authToken = await AuthService.postAuthToken(req.body);
		// Login successful
		console.log('Login successful', authToken);
		res.status(200).json({ message: 'Login successful' });
	} catch (error) {
		// Login failed
		console.error('Error logging in:', error);
		res.status(error.status).json({ error });
	}
};

export default loginUser;
